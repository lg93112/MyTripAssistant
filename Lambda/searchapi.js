'use strict';
console.log('Loading  function');

var AWS = require('aws-sdk');

exports.handler = function(event, context, callback) {
    let text = event.queryStringParameters.q;
    let session_attrs;
    console.log('show body' + JSON.stringify(event));
    // if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
    //     let body = JSON.parse(event.queryStringParameters)
    //     if (body.query !== undefined && body.query !== null && body.query !== "") {
    //         console.log("Received question: " + body.question);
    //         text = body.query;
    //     }
    //     session_attrs = body.session;
    
    
	var lexruntime = new AWS.LexRuntime({region: 'us-east-1'});
	var lexUserId = 'photosearch-demo';
	// send it to the Lex runtime
	var params = {
		botAlias: '$LATEST',
		botName: 'PhotoSearch',
		inputText: text,
		userId: lexUserId,
		sessionAttributes: session_attrs
	};
	
	// send it to the Lex runtime
	lexruntime.postText(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
			let response = {
                statusCode: 200,
                headers: {
                    "x-custom-header" : "my custom header value",
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods" : "POST,GET",
                    "Access-Control-Allow-Headers" : "x-api-key"
                },
                body: JSON.stringify({
                    message : err,
                    sessionAttributes : null
                })
            };
			callback(err, response);
		}
		if (data) {
		    let response = {
                statusCode: 200,
                headers: {
                    "x-custom-header" : "my custom header value",
                    "Access-Control-Allow-Origin" : "*",
                    "Access-Control-Allow-Methods" : "POST,GET",
                    "Access-Control-Allow-Headers" : "x-api-key"
                },
                body: JSON.stringify({
                    message : data,
                    sessionAttributes : data.sessionAttributes
                })
            };
			callback(null, response);
		}
	})
	
};
