'use strict';
var request = require('request');

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
    const startdate = slots.StartDate;
    const days = slots.Days;
    const people = slots.People;
    const categories = slots.Category;
    
    const tokenId = ""; 
    var opts;
    if(categories == "NO" || categories == "no"){
        opts = { 'location': locations,
            'term': 'attraction',
            'limit': 3*days,
            'sort_by': 'rating'
        }
    }
    else{
        opts = { 'location': locations,
            'term': 'attraction',
            'limit': 3*days,
            'sort_by': 'rating',
            'categories': categories
        }
    }
    var options = { 
      method: 'GET',
      url: 'https://api.yelp.com/v3/businesses/search',
      qs: opts,
      headers: 
        { 
        'authorization':  'Bearer ' + tokenId
        }
    };
    console.log(JSON.stringify(options));
    request(options, function (error, response, body) {
        if (error) {
            console.log('fail');
            callback(error, null);
        };
        console.log(body);
        var suggestions = JSON.parse(body).businesses;
        var response = new Array();
        response.push({"name": name, "startDate":startdate, "days":days, "people":people, "location": locations});
        var i;
        for(i = 0; i < suggestions.length; i++){
            var attract = suggestions[i].name;
            var image_url = suggestions[i].image_url;
            var url = suggestions[i].url;
            var title = suggestions[i]["categories"][0]["title"];
            var rating = suggestions[i].rating;
            var location =  suggestions[i]["location"].address1;
            var place = {"name":attract, "image_url":image_url, "url":url, "title":title, "rating": rating, "location": location
            }
            response.push(place);
        }
        console.log(response);
        var newresponse = close(sessionAttributes, 'Fulfilled',{'contentType': 'PlainText', 'content': JSON.stringify(response)});
        callback(null, newresponse);
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

