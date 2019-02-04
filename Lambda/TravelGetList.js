const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:"us-east-1"});
exports.handler = function(event, context, callback){
    var name = event.queryStringParameters.name;
    var timestamp = event.queryStringParameters.timestamp;

    var params = {
      TableName: 'TravelRecords',
      Key:  {
          id_time: name+"_"+timestamp
          
      }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            let response = {
                        statusCode: 200,
                        headers: {
                            "x-custom-header" : "my custom header value",
                            "Access-Control-Allow-Origin" : "*",
                            "Access-Control-Allow-Methods" : "POST,GET",
                            "Access-Control-Allow-Headers" : "x-api-key"
                            },
                        body: JSON.stringify(data)
                    };
            callback(null,response);
        }
    });
};
