const aws =  require("aws-sdk");
const sns = new aws.SNS({
   region:'us-east-1'
});
exports.handler = function(event, context, callback) {
   console.log("AWS lambda and SNS trigger ");
   console.log(event);
   var body = JSON.parse(event.body);
   const snsmessage = body.message;
   const phone = event.queryStringParameters.phone;
   console.log(snsmessage);
   sns.publish({
      Message: snsmessage,
      PhoneNumber: phone
   }, function (err, data) {
      if (err) {
         console.log(err);
         callback(err, null);
      } else {
         console.log(data);
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
		  callback(null, response);
      }	
   });
};
