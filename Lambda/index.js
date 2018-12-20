'use strict';
     
// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks, your pizza will arrive in 20 minutes")
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
 
// --------------- Events -----------------------
 
function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    if(intentRequest.currentIntent.name == "TripSearchIntent"){dispatch_search(intentRequest, callback);}
    else if(intentRequest.currentIntent.name == "TripGreetingIntent"){dispatch_greets(intentRequest, callback);}
    else if(intentRequest.currentIntent.name == "TripThankIntent"){dispatch_thanks(intentRequest, callback);}
}

function dispatch_search(intentRequest, callback) {
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const name = slots.Name;
    const locations = slots.Location;
    const date = slots.StartDate;
    const time = slots.Time;
    const people = slots.People;
    
    const request = require("request");
    const tokenId = "CMRyLRonKGva6JT4Bw2XpP6o06puY00H0c0Hs1_YKXxaTG-bZvGu1AcXGREfGOLDEtgdyjUOV8XNBlMRmVljGEpUl5VwinEySC0u12r-x8q8g78yCUjpQMVF4hPnW3Yx"; 
    var options = { method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs: { location: locations,
            term: 'attraction',
            limit: time,
            sort_by: 'rating'
      },
      headers: 
        { 'cache-control': 'no-cache',
        'authorization':  'Bearer ' + tokenId
        }
    };
  
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var suggestions = JSON.parse(body).businesses;
            var newresponse = close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': JSON.stringify(suggestions)});
            callback(null, newresponse);
        }
        else{
            callback(error,null);
        }
    });
    
}

function dispatch_greets(intentRequest, callback){
    const sessionAttributes = intentRequest.sessionAttributes;
    var response = close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': 'Nice to meet you! How can I help?'});
    callback(null, response);
}

function dispatch_thanks(intentRequest, callback){
    const sessionAttributes = intentRequest.sessionAttributes;
    var response = close(sessionAttributes, 'Fulfilled',
    {'contentType': 'PlainText', 'content': 'You are welcome!'});
    callback(null, response);
}
 
// --------------- Main handler -----------------------
 
// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    dispatch(event,callback);
};

