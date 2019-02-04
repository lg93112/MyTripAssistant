const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:"us-east-1"});
exports.handler = function(event, context, callback){
    console.log("event = " + JSON.stringify(event));
    var name = event.queryStringParameters.name;
    var params = {
      TableName: 'TravelIDTimeLocation',
      Key:  {
          uid: name
      }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data));
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
