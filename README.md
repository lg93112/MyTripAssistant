# MyTripAssistant

“My Trip Assistant” is a web application which can help people plan for their trips in advance. 
The users can input information like their destination, vacation period and preferences for a particular trip, and thereby get an auto-generated plan, including time schedule and tourist attractions for this specific site, from this app. 
Also, the app has an assistant which can help users customize their preference, schedule their trips, and visualize users’ schedules. 
Users can see all their scheduled trips with details and they can also send the trip schedules via phone message. 
In addition, users can also upload their trip photos here and search photos intelligently.

The web application url is:

https://gary448.auth.us-east-2.amazoncognito.com/login?response_type=code&client_id=4ph66i11f26md66oipd7ge7nhm&redirect_uri=https://s3.amazonaws.com/tripproject/files/index.html

And the login page is shown below which uses AWS Cognito to authenticate users:
<p align="center">
  <img height="250" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/login.png">
</p>

This repository contains all the files related to this application. The front end code consists of multiple html files building the front end using HTML, CSS, Javascript and Bootstrap hosted in S3 bucket. The back end code is stored in lambda functions folder which are lambda functions implementing AWS services and/or integrated with API methods in API Gateway.


index.html: home page of our application. It contains the introduction about our website and a function to send user schedule to specified phone number as trip notifications.
<p align="center">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/home.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/userschedule.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/phonemes.png">
</p>


recommendation.html: chatbot interface to recommend trip for user, show attractions and let user add their desired attractions for their trips.
<p align="center">
  <img width="250" height="250" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/recommend1.png">
  <img width="250" height="250" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/recommend2.png">
</p>
<p align="center">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/recommend3.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/recommend4.png">
</p>


shedule.html and schedule2.html: interface to show all schedules of user and each schedule detail.
<p align="center">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/schedule1.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/schedule2.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/shedule3.png">
</p>


photo.html: interface to add trip photos to "album" named after city name, search photos in the album and search photo intelligently with photo tags.
<p align="center">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/photo1.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/photo2.png">
</p>
<p align="center">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/photo3.png">
  <img width="250" height="150" src="https://github.com/lg93112/MyTripAssistant/blob/master/demo%20photo/photo4.png">
</p>
