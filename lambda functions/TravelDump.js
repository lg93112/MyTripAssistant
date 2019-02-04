const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region:"us-east-1"});
exports.handler = function(event, context, callback){
    console.log(event.body);
    var body = JSON.parse(event.body);
    var name = body.name;
    var timestamp = body.timestamp;
    var local = body.location;
    var list = body.list;
    console.log("name =" + name);
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
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            if(data.Item != undefined)
                var travelRecods = data.Item.Records;
            else travelRecods = new Array();
            travelRecods.push({
                time:timestamp,
                location: local
            });
            var paramsPutID = {
              TableName: 'TravelIDTimeLocation',
              Item:  {
                  uid: name,
                  Records: travelRecods
              }
            };
            docClient.put(paramsPutID,function(err,data){
                console.log("in the put function");
                if(err){
                    console.log("error occur!");
                    callback(err,null);
                }
                else{
                    console.log("succeed for update the records");
                    var travelList = new Array();
                    for(let i = 0; i < 10; i ++){
                        var obj = new Object();
                        obj['place'] = "place" + i;
                        obj['time'] = "time" + i;
                        travelList.push(obj);
                    }
                    var paramsList = {
                      TableName: 'TravelRecords',
                      Item:  {
                          id_time: name+"_"+timestamp,
                          travel_records: list
                      }
                    };
                    
                    
                    docClient.put(paramsList,function(err,data){
                        console.log("in the put function");
                        if(err){
                            console.log("error occur!");
                            callback(err,null);
                        }
                        else{
                            console.log("succeed final");
                            let response = {
                                statusCode: 200,
                                headers: {
                                    "x-custom-header" : "my custom header value",
                                    "Access-Control-Allow-Origin" : "*",
                                    "Access-Control-Allow-Methods" : "POST,GET",
                                    "Access-Control-Allow-Headers" : "x-api-key"
                                    },
                                body: JSON.stringify({
                                    "message":"DB successed"
                                })
                            };
                            callback(null,response);
                        }
                    });
                }
            });
            //callback(null,data);
        }
    });
    
    
};
