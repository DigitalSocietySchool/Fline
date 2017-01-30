# Fline

Fline

*Fline, the only 
line you should be in.*

**Fline** is the ChatBot family of Schiphol Airport. From the landing to the arrival hall, the family Belt provides you a personalised assistance every step of your way. Stay connected with your bag thanks to real-time notifications, find the fastest way to reach the city center and discover the stories of Anna, Oddie, Chris & Henk Belt. 

Welcome to Schiphol, welcome to the family !

“Get to know the Belt family!”

Reclaim hall 1 Belt family members:
* Anna Belt (belt number 4)
* Chris Belt (belt number 2)
* Henk Belt (belt number 6)
* Oddy Belt (Odd sized baggage-belt, belt number 7)

With this app the bag worries of the passengers are being relieved by offering them a
service that provides personal information and answers to their worries. It enables the
passenger to do something else other than sticking to the belt. 

This app is specifically designed and implemented for smartphone and tablet use. 

Features: 
* Uploading & decoding printed boarding passes & e-tickets (libraries)
* Chat bots as personal assistants for passengers based on belt personalities (API)
* Embedded links to guide passengers to right website (train, tourism, public transport)
* Family screen with activities of family members

The pilot version of the app is powered by API.ai and uses two JavaScript libraries. 

Libraries used for this app:
* js-zxing-pdf417 (decoding barcode on printed boarding passes)
* jsqrcode (decoding QR-code from boarding passes)

Requirements: 
* max 68MB server storage space
* API.ai account

Installation: 

Using existing API.ai account:

Skip to step 3, if you are using an already existing API.ai account.

Using API.ai:
1. Sign up for an API.ai account.
2. Create API.ai agent.
3. Copy Client accestoken and replace the "accessToken" string in js/app.js.  
4. Select intents on the api, click on the "3 dot" button next to create intent and upload the intents in the "json/intents-en/"  or "json/intents-nl/" folder.

5a. In case using the app as it is, upload the files to your server and run. 
5b. In case of using the app as a part of an existing website upload files on the server & rename the index.html file or modify the app.js file to execute the relevant parts.
