// JavaScript Document
/*
Author: Quinnard Stewart
Company: MediaLAB Amsterdam
Dates: August 31st 2016 - January 31st 2017
*/
 
/* main script for the whole app parent global variables & handles navigation elements */

//Parent global variables
var bArray = [
[0,"Welcome", "#FFFFFF","test-bot-icon.jpg", "#F9C728"], 
[4,"Anna", "#F7E114","anna-bot-icon.png", "#fbee84"], 
[2,"Chris", "#F49F16","chris-bot-icon.png", "#f9cd85"],
[6,"Henk", "#F28B9E","henk-bot-icon.png", "#f8c2cc"], 
[7,"Oddy", "#7a50a1","oddy-bot-icon.png", "#c68bf3"]
];

var input =0, 
bIPath ="src/bot-icon-resources/", containers ;


//api variables
const accessToken = "00724994abce4d768d4d1f599ab76f68", 
baseUrl = "https://api.api.ai/v1/", 
sessionID = Math.random() * 1000000;

// bot properties variables
var bName, bColor, bIcon,bBColor; 

//container variables
var chatbotContainer = "#chatbot", 
mainMenuContainer  = "#main-menu", 
familyContainer ="#family", 
welcomeContainer = "#welcome", 
cbContainer = "#chat-btn-container", 
aboutContainer = "#about",
PUContainer = "#pop-up";

var instance = 0;
//$(this).before(">");

	$(document).ready(function(){
		//shows Welcome screen on start up
		$(mainMenuContainer).hide();
		$(chatbotContainer).hide(); 
		$(familyContainer).hide();
		$(cbContainer).hide(); 
		$(PUContainer).hide();
		$(aboutContainer).hide();
		$(welcomeContainer).show();
		bNameGenerator(input);		
		
       containers = document.getElementsByClassName('main-menu-btn'); 
	   
	   currentContainer (0);
	   
	  
		
	});
	
	
	
	$(document).on('click', '.options-btn', function(e) {
					if (e){
							e.preventDefault();
                    		var temp = $(e.target).val();
							
					if (temp= "yes"){
						
				     		$(mainMenuContainer).hide();
	 						$(welcomeContainer).hide();
	        				$("#bot-icon").hide();
							$(chatbotContainer).show(); 					
					}else { //no
								 }
					}
				
                });
			

			//function to set right navagation bar titles, bot icons, colors 
			function bNameGenerator(input) {
				 
				//shows bot icon beltnumber is known
				if(input !=0 ){ 
				   $("#bot-icon").css('display', 'block');
				}
				
				for ( i = 0; i<bArray.length; i++){				
									if (input == bArray[i][0]){
														bName = bArray[i][1];
														bColor = bArray[i][2];
														bBColor = bArray[i][4]; 
														bIcon = bArray[i][3];						
										}
				}
				
				bIcon  = bIPath+bIcon; 			
				
				$("#bot-icon").attr("src", bIcon); 
				$(".bot-icon-link").css("background", bColor); 
				$(".bot-bubble").attr("background", bBColor);
					
					//no multiple headers in navbar
					if(instance ==0){
					
							$("#nav-bar").append("<h2>" + bName + "</h2>");
						} else {
							$("#nav-bar h2").empty().hide();
							$("#nav-bar").append("<h2>" + bName + "</h2>");
							}
				instance++;
			}
			
			

		//script for when scan-btn is changed
		$("#scan-btn").on('change', function(){
			$(cbContainer).hide();
			$(PUContainer).show();
			$("#chat").empty();
			
			//random indexnumber 
			 var rdmNumber = Math.floor(Math.random() * 4);
			 
			 //set input to belt number
			input = bArray[rdmNumber][0];
			bNameGenerator(input);
			
			//appends data to pop-up screen
			$("#basic-info").append(fullname);
			$("#flight-info").append(flightnumber);
			 $("#post-form").css('display', 'block !important');
			 $("#scan-form").css('display', 'none');	
		});
		
		
		//script for when scan-btn is changed
		$("#upload-btn").on('change', function(){
			$(cbContainer).hide();
			$(PUContainer).show();
			$("#chat").empty();
			
			//random indexnumber 
			 var rdmNumber = Math.floor(Math.random() * 4);
			 
			 //set input to belt number
			input = bArray[rdmNumber][0];
			bNameGenerator(input);
			
			//appends data to pop-up screen
			$("#basic-info").append(fullname);
			$("#flight-info").append(flightnumber);
			 $("#post-form").css('display', 'block !important');
			 $("#scan-form").css('display', 'none');	
		});

       //click event to show About screen
		$("#main-menu-btn-about").on('click', function(){
			    currentContainer(3);
     	 		showAbout();
				
				hideMenu();
				
			});
			
 		//click event to show menu
		$(".menu-btn").on('click', function(){
			   showMenu();
		   });
		
		 //click event  for menu button Chat to chat screen
		$("#main-menu-btn-chat").on('click', function(){
			    currentContainer(0);
     	 		showChat();
				$(aboutContainer).hide();
			});
			
			// click event for menu button the Family in chat to family screen
			$("#main-menu-btn-family").on('click', function(){
				currentContainer(1);
				hideMenu();
     	 		$(familyContainer).show();
				$(chatbotContainer).hide();
				$(aboutContainer).hide();
				
				
			});
			
			// click event for bot-icon in chat to family screen
			$("#bot-icon").on('click', function(){
				currentContainer(1);
     	 		showFamily();
				$(familyContainer).show();
				$(chatbotContainer).hide();
				$(aboutContainer).hide();
				
			});
		    
			// click event to hide menu  when menubutton is pressed while menu is open
			$("#menu-main-btn-hidden").on('click', function(){
				hideMenu();
			});
			
	 
		function hideMenu(){ 
					$(mainMenuContainer).hide();
		}
		
		function showTP() {
		
					$('#main-menu').hide();
					$(welcomeContainer).hide(); 
					$(chatbotContainer).show(); 
					$(cbContainer).show();	
		}
					
		function showChat(){
					
					$(mainMenuContainer).hide();
					$(welcomeContainer).hide();
					$(familyContainer).hide();
					$(chatbotContainer).show();
		}
		
		function showFamily(){	
					currentContainer(1);				
					$(aboutContainer).hide();
					$(chatbotContainer).hide();
					$(familyContainer).show();					
		}
		
		function showMenu(){
					$(mainMenuContainer).show();			  
					$(welcomeContainer).hide();
		}
		
		function showAbout(){
					
					$(familyContainer).hide();
					$(chatbotContainer).hide();
					$(aboutContainer).show();
					
		}
		function currentContainer(n){
			
			if (n<containers.length){
				
				for (i=0; i<containers.length; i++){
					// sets classes of others main menu button  not active				
					containers[i].className = "main-menu-btn";
					
				}
				
				containers[n].className = "main-menu-btn main-menu-btn-activated";
			
				
			}
			
			
		}
		

 