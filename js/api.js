//Script to access API.ai  to send questions, retrieve responses & post responses to chat 

/*
Author: Quinnard Stewart
Company: MediaLAB Amsterdam
Dates: August 31st 2016 - January 31st 2017
*/

/* 
accesstoken, sessionID's,beltnumber, bot properties are defined in index.js
This Script handles the family member bot chat.
*/

//new global variables 
var user,
text,
startTimestamp, 
endTimeStamp;

//div ids
var postBtn = "#post-btn", 
chat = "#chat", 
inputField="#message-input", 
chatBTNS = '#chat-btns'; 


//chat links 
var trainLink = "http://ns.nl/en", 
pTLink = "http://9292.nl/en", 
tourismLink = "http://www.holland.com/global/tourism.htm", 
mapLink = "https://www.schiphol.nl/en/page/airport-maps/";

//time variables
var now,
hours, 
minutes, 
daytime, 
daytimeGreeting; 

$(document).on('click', '.options-btn', function(e) {
					if (e){
							e.preventDefault();
                    		var temp = $(e.target).val();
							
						if (temp= "yes"){						
								$(mainMenuContainer).hide();
								$(welcomeContainer).hide();
				
								$(chatbotContainer).show(); 
								
								setTimeStamp(startTimestamp);
								text = "intro welcome"; 
								send(text); 													
						}
					}
					
					
 });
 
 //function posting user messages to chat & sending to api
function setSendQuery (val, user){
	 setResponse(val, user);
	 send(val);
	}
			// sets time string from current date
			function setTimeStamp(t) {
					now  = new Date();
					minutes = now.getMinutes(); 
					hours = now.getHours();
					if (minutes <10){ minutes = "0"+ minutes;}
					
					if (hours >12) { 
					daytime = "PM";
					} 
					else{ 
					daytime = "AM";}
						hours = hours %12 ||12;
					date = now.getDate() +"-"+ now.getMonth() +"-"+ now.getFullYear();
					t = date + " "+ hours + ":" + minutes + daytime;
					
					setDaytimeGreeting(hours,daytime);
	
				}
				
			    // generates right daytime greeting from time of day
				function setDaytimeGreeting (hours, daytime){
									
									if ( daytime=="AM" && hours < 6 || hours ==12 ){
															daytimeGreeting = "Goodevening";
													}
									else if (daytime =="PM" && hours >=6  && hours != 12){
															daytimeGreeting = "Goodevening";
													} 
									else if ( daytime== "AM" && hours>=6 && hours !=12 ){
															daytimeGreeting = "Goodmorning";
													}
									else if (daytime == "PM" && hours<=5  ){
															daytimeGreeting = "Goodafternoon";
													} 
									else if (daytime == "PM" && hours == 12){
															daytimeGreeting = "Goodafternoon";
													}
					}

//click event for confirm button
$("#next-div" ).on('click', function(){
	
	$(PUContainer).hide();
	$("#main-menu").hide();
	$("#tp_One").hide();
	
 	$("#chatbot").show();
	
	
    text = "intro";
    send(text);
    
  	clickListener();
   	listeners();
	

});

//function to pan to the wha
function panToBottom () {
					
					$(chat).scrollTop($("#chat").height());
	};

//listeners for posting messages
function listeners(){
			 $(chat).off('click'); 
	  	   
		   //keypress function for post-btn
           $(postBtn).keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();

                    var question = $(inputField).val();
                    user = "user";
                    setSendQuery(question, user);
                   
					panToBottom();
					
					$(inputField).val('');
					 
                }
            });
			
			//click event post-btn
			 $("#chatbot").on('click', "#post-btn", function(e) {
					 
					 if (e){
                               
                    var question = $(inputField).val();
                    user = "user";
                  	setSendQuery(question, user);
                    
					panToBottom(); 
                    
					
					$(inputField).val(''); 
				
                } 
			

           
            }); 
			//keypress function on enter/return keypress/tap
           $(inputField).keypress(function(event) {
                if (event.which == 13) {
                    event.preventDefault();
                  
				    var question = $(inputField).val();
                    user = "user";
                    setSendQuery(question, user);
					
					
					panToBottom(); 
                   
				   
                    
					
                   $(inputField).val('');


                }
            
            });
          };


            function setInput(text) {
                $(inputField).val(text);

                send();
            }

            function send(text) {
				// api request ajax statement with header, accesstoken & message
                $.ajax({
                    type: "POST",
                    url: baseUrl + "query?v=20161208",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    },
                    data: JSON.stringify({
                        query: text,
                        lang: "en",
                        sessionId: sessionID
                    }),
                    success: function(data) {
						//get response from json file located in speech
                        var response = data.result.fulfillment.speech;
                       	user = "bot";
						
						//sends reponse & user= bot to setResponse function
                        setResponse(response, user);
                    },
                    error: function() {
                        console.log("Internet connection or server error");
                    }
                });
                
            };

            function setResponse(val, user) {
				// sends message based on the user
				
				if (val != ''){
						switch (user){
					
							case "user": 
							    var html = "<div class='message-container'><div class='"+user+"-message-container'><div class='"+ user+ " bubble "+ user+ "-bubble'><p class='" + user + "-message'>" + val + "</p></div></div></div>";
								$(chat).append(html); 
								
								panToBottom(); 
								break;
										
							case "bot": 
								// sends unedited response value to responseFilter
							    responseFilter(val);
								
								// replaces specific string value with appropriate string value
								val = val.replace("botName", bName); val = val.replace("botName", bName);								
								
								val = val.replace("daytimegreeting", daytimeGreeting); 
								
								// adds links to certain keywords
								val = val.replace("train", "<a href='"+trainLink+"' target='_blank'>train</a>");
								val = val.replace("bus", "<a href='"+pTLink+"' target='_blank'>bus</a>");
								val = val.replace("Dutch tourism", "<a href='"+pTLink+"' target='_blank'>Dutch tourism</a>");
								
								//sends  bot response and user value to function to post message and timestamp														
								chatMessage(val, user);
								panToBottom(); 
																
								break;
					
								default: console.log("unknown user"); 
								}
						}				
               
			 };
			
		 //response listener
         function responseFilter(response) {
               
		 
			   switch(response){
					
                    case "To get personalised information, please upload your plane ticket.": 
									setTimeout( function sendPersonal(){								       
												showTP();								
								 			}, 2010); 
									break;
					
                    case "Hello I am botName. botName-Belt. I will keep you updated about your baggage progress.": 
					                
									renderButton("Where is my bag now?");						
									break; 
									
					case "daytimegreeting , Welcome to the Belt family. One of our family members will help you get in touch with your baggage.": 
									 
									sendAutoMessage("personalised info");
									break; 
									
					case "Your baggage is being unloaded from the plane. This means it can take a while before it gets here.":  					
									sendAutoMessage("notify when on belt");									
									break;
									
					default: 		listeners();    
					}
            };

			
            function renderButtons(list) {
				
						if (list.length>1){
							$(cbContainer).empty();  
								for (i = 0; i < list.length; i++) {
									var value = '' + list[i];
									var html = "<label class='chat-btnss' for='chat-btn'><div>" +value+"</div></label><input type='button' id='chat-button' 'style='display:none'/>"
									$(chatBTNS).show();
									$(chatBTNS).append(html);
								}
						}				
				panToBottom();				
            };
			
			//render buttons in form
			function renderButton(str){
			
					setTimeout( function(){
					$(cbContainer).empty();  
					user = 'bot';
					var html =  "<div class='chat-btnss-container'><label class='chat-btnss' for='chat-btn'><div><p>" +str+"</p></div></label><input type='button' id='chat-btn' 'style='display:none;' /><div>"           
					$(cbContainer).append(html);
					showTP();}, 2000);
					
						
					
			}

			// click event listener for the dynamic buttons
            function clickListener() {
                $(document).on('click', '.option-button', function(e) {
					if (e){
						e.preventDefault();
                    var temp = $(e.target).val();
					
					if (temp != "keep chatting"){
						send(temp);					
					}else { 
						send(temp);
						showInput();
					 }
					 panToBottom();
                   }
					
                });
				
			$(document).on('click', '.chat-btnss', function(e) {
								if (e){
									e.preventDefault();
								var temp = $(e.target).text();
								 
								 setSendQuery(temp, 'user');
								
								 $(cbContainer).hide();	
								}
								 panToBottom();							 
							});							
						};
			
			
			
			 $(document).on('click', '#option-button', function(e) {                    
                        var temp = $(e.target).attr("value");
                        send(temp);                   
                });
				
				function chatButtonClicked(val) {					
					setSendQuery(val, 'user'); 
					 panToBottom();               
                }
				
				

            function chatMessage(val, user){
				//append typing bubbles script
				/*if (stamp){
				$(chat).append("<div id='typing-bubble' class='typing-bubble' style='background:" +botBColor+ "; color:" +botBColor+ "; '> <svg id='typing-dots' class='typing-dots' style height='30'><circle  cx='10px' cy='20px'r='5px' style='fill:#000000;'/><circle  cx='25px'cy='20px' r='5px' style='fill:#000000;' /> <circle  cx='40px' cy='20px'r='5px' style='fill:#000000;'/></svg></div>"); 				
                $(".typing-dots").delay(1000).hide(1000); 
				$(".typing-bubble").delay(1000).hide(1000); }
				*/
				
				
				//generate timestamp
				addTimeStamp(user);				
				
				//html value to be appended to chat
				var html = "<div class='message-container'><div class='"+user+"-message-container'><div class='"+ user+ " bubble "+ user+ "-bubble' style='background:" +bBColor+ "; color:" +bBColor+ "; '><p class='" + user + "-message'>" + val + "</p></div> <div class='"+ user + "-timestamp timestamp' ><p>" + currentTimestamp + "</p></div></div></div>";
                
				setTimeout(function botResponse(){
                $(chat).append(html);
				
				panToBottom();
				},2010);		
				
			};
			
			//sets current timestamp for in chat
			function addTimeStamp(user){
				//generates  timestamp for in the chat
                var now = new Date();
				minutes = now.getMinutes(); hours = now.getHours(); 
              		 if (minutes <10){
						  	minutes = "0"+ minutes;
						  }
					
					if (hours >12) {
							daytime = "PM";
						  } 
						  else{ 
						  	daytime = "AM";
							}
							
						hours = hours %12 ||12;
						
			    setDaytimeGreeting(hours,daytime);
				
				currentTimestamp = hours+ ":"+minutes+daytime; 			
			}
			
			//sends automatic messages to api
			function sendAutoMessage(val){
				//send auto messages
				setTimeout( function sendPersonal(){
								        send(val);								
								 			}, 2000);									
				
				}
			