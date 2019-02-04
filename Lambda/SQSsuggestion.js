const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:"us-east-1"});

function sendSMS(msg,phonenumber){
   var sns = new AWS.SNS();
    
    var snsparams = {
      Message: msg,
      MessageStructure: 'string',
      PhoneNumber: phonenumber
    };
    
    sns.publish(snsparams, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
}

exports.handler = function(event, context,callback) {
  event.Records.forEach(record => {
    const { body } = record;
    console.log("LOG:: body = " + body);
    var nowDate = new Date();
    var nowDateUnix = nowDate.getTime().toString();
    
    var dynamoparams = {
      TableName: 'RequesRecords',
      Item: {
          timestamp: nowDateUnix,
          message: body
      }
    };
    
    
    docClient.put(dynamoparams,function(err,data){
        console.log("in the put function");
        if(err){
            console.log("DYNAMO:: error occur!");
            callback(err,null);
        }
        else{
            console.log("DYNAMO:: succeed");
            callback(null,data);
        }
        return {};
    });
    
    
    
    var request = require("request");
    const tokenId = "" 
    // var testJson = {
    //       "Cuisine":"Chinese",  
    //       "People":"3",
    //       "Dates":"2018-11-20",
    //       "Time":"19:00:00",
    //       "Location":"New York",
    //       "Phone":"6464686948"
    // };
    
    
    var testJson = JSON.parse(body);
    var Time = new Date(testJson.Dates + " "+testJson.Time);
    // console.log(Time.getTime());
    // console.log(Time.toLocaleString());
    var options = { method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs: { location: testJson.Location,
          term: testJson.Cuisine,
        limit: 4},
      headers: 
       { 'cache-control': 'no-cache',
         'authorization':  'Bearer ' + tokenId
      }
     };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      var suggestions = JSON.parse(body).businesses[0];
      console.log("response is : \n" + JSON.stringify(suggestions));
      
      var loc = "";
      for(let i = 0; i < suggestions.location.display_address.length; i ++){
        loc += suggestions.location.display_address[i];
      }
      var msgTosend = "You have booked the " + testJson.Cuisine +  " Cuisine: " 
      + suggestions.name + ", at " + loc + " for " 
      + testJson.People + " people. Enjoy your meal!";
      
      sendSMS(msgTosend,"+1" + testJson.Phone);
    });
    
  });
}
