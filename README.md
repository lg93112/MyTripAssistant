# MyTripAssistant

“My Trip Assistant” is a web application which can help people plan for their trips in advance. 
The users can input information like their destination, vacation period and preferences for a particular trip, and thereby get an auto-generated plan, including time schedule and tourist attractions for this specific site, from this app. 
Also, the app has an assistant which can help users customize their preference, schedule their trips, and visualize users’ schedules. 
Users can see all their scheduled trips with details and they can also send the trip schedules via phone message. 
In addition, users can also upload their trip photos here and search photos intelligently.

The web application url is:

https://gary448.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=4ph66i11f26md66oipd7ge7nhm&redirect_uri=https://s3.amazonaws.com/tripproject/files/index.html

And the login page is as follows which uses AWS Cognito to authenticate users:
<p align="center">
  <img height="300" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/login.png">
</p>

This repository contains all the files related to this application. The front end code consists of multiple html files building the front end using HTML, CSS, Javascript and Bootstrap hosted in S3 bucket. The back end code is stored in lambda functions folder which are lambda functions implementing AWS services and/or integrated with API methods in API Gateway.

index.html: home page of our application. It contains the introduction about our website and a function to send user schedule to specified phone number as trip notifications.
<p align="left">
  <img height="300" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/home.png">
  <img height="300" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/userschedule.png">
  <img height="300" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/phonemes.png">
</p>
