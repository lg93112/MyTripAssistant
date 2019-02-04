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


function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}


function queryElasticsearch(event,callback){
    const sessionAttributes = event.sessionAttributes;
    const slots = event.currentIntent.slots;
    var key1 = slots.Key;
    var key2 = slots.Label;
    var keys = new Array();
    if(key2 == null){keys.push(key1);}
    else{keys.push(key1); keys.push(key2);}
    var queryStr = "";
    if(keys.length == 1)
        queryStr = keys[0];
    else
        queryStr = keys[0] + " AND " + keys[1];
        
    var url="";
    var para = {
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body:{
            "query": {
            "query_string" : {
            "query" :  queryStr
            }
        }
    }
    };
    request(para,(error,response,body)=>{
        if (!error && response.statusCode == 200) {
            console.log(body);
            var response = {
            statusCode: 200,
            body: JSON.stringify(body)
            };
        var newresponse = close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': JSON.stringify(body)});
        callback(null, newresponse);
        }
        else{
            callback(error,null);
        }
    });
}

 
exports.handler = function(event, context, callback) {
    queryElasticsearch(event,callback);
};
