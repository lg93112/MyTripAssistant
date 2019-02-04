// dependencies
var async = require('async');
var AWS = require('aws-sdk');
var gm = require('gm')
            .subClass({ imageMagick: true }); // Enable ImageMagick integration.
var util = require('util');
var rekognition = new AWS.Rekognition();
var request = require('request');
// constants
var MAX_WIDTH  = 100;
var MAX_HEIGHT = 100;

// get reference to S3 client 
var s3 = new AWS.S3();

function rekognizeLabels(bucket, key) {
  let params = {
    Image: {
      S3Object: {
        Bucket: bucket,
        Name: key
      }
    },
    MaxLabels: 3,
    MinConfidence: 80
  };

  return rekognition.detectLabels(params).promise()
};

function toElasticsearch(bucket,key,tagObj,callback){
    request('', 
    function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log("HIT total = " + JSON.parse(body).hits.total);
    var url="" +JSON.parse(body).hits.total+1;
    var requestDat = new Object();
    var d = new Date();
    
    requestDat.tags = new Array();
    requestDat.key = key;
    requestDat.bucket = bucket;
    // requestDat.timestamp = d.toDateString();
    for(var i = 0; i < tagObj.length; i ++){
        requestDat.tags.push(tagObj[i].Name);
    }

    console.log("saving obj to elastic search:")
    console.log(requestDat)
    var para = {
        url: url,
        method: "PUT",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: requestDat
    };
    request(para,(error,response,body)=>{
        console.log("in the request callback");
        if (!error) {
            console.log(body) 
        }
        else{
            console.log("error occur")
            console.log(error);
            callback(error,null);
        }
    });
  }
});
}

 
exports.handler = function(event, context, callback) {
    // Read options from the event.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    var srcBucket = event.Records[0].s3.bucket.name;
    // Object key may have spaces or unicode non-ASCII characters.
    var srcKey    =
    decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));  
    var dstBucket = srcBucket + "resized";
    var dstKey    = "resized-" + srcKey;


    rekognizeLabels(srcBucket, srcKey)
        .then(function(data) {
          console.log(data["Labels"]);
          toElasticsearch(srcBucket,srcKey,data["Labels"],callback);
        })
        .catch(function(err) {
            callback(err, null);
        });
    // Sanity check: validate that source and destination are different buckets.
    if (srcBucket == dstBucket) {
        callback("Source and destination buckets are the same.");
        return;
    }
    
};
