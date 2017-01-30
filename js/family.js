// Javascript file to handle all family div interactions and content

/*
Author: Quinnard Stewart
Company: MediaLAB Amsterdam
Dates: August 31st 2016 - January 31st 2017
*/

//global variables
var today;
var page = "#family", 
content = "#family-content", 
activity = "#family-activity", 
contentList = "#family-content-list", 
dotsCont = "#dots-container";

var sIndex = 0, 
slides, 
dots, 
iconPath,
array, 
beltCount; 

var sampleText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget."; 
var activityContainer= "#activity-container"; 


//click event bot icon
$("#bot-icon").on('click',function () {
		currentBot();
        showFamily();		
	
});

// click event main menu btn family
$("#main-menu-btn-family").on('click',function () {
        currentBot()
		showFamily();
});

// function to prepare family screen when app is loaded
$(document).ready(function(){
	    //array is the botArray without values at index 0 (welcome)
		array = bArray;
		array.splice(0,1);
		
		//runs function to add values from array to family screen
		familyPage();
	});

//sets sIndex to current bot
function currentBot() {
     //checks if botName matches value[1] in array to set the sIndex on the right member
	 for ( i = 0; i<array.length; i++){
	    
	if (bName == array[i][1]){
		
		sIndex = i;
		
		 currentSlider(sIndex);
	}
	  }
}

//adds values from array to elements
function familyPage (){
		  
			     
		today = new Date();
		
		//passes length of array into one global variable
		beltCount= array.length;
	  
	  //for each items in array append name, image, button, dot
	  for (i= 0; i < array.length; i++) {
						  var name = array[i][1], path =array[i][3],id = name.toLowerCase();
						  
						  var contenthtml = "<div class='adventure-slider'><div class='adventure-slider-title'><h1>"+ name+ "</h1></div> <div class='adventure-slider-img'><img src='src/bot-icon-resources/"+path+ "' /></div> <div class='adventure-slider-label'><label id=''adventure-btn-"+id+"' class='adventure-label' for='adventure-"+id+"'><div > <p >"+ name+"'s Adventures</p></div></label></div> <input type='button' id='adventure-"+id+"'  style='display:none;' onclick='show"+name+"Adventures()' /> <div> ";
						   var n = i+1;
						   var dotHtml  = "<span class='dots' onClick='currentSlider("+(n)+ ")'></span>";
						   
						  $("#family-content-list-container").append(contenthtml);
						  $(dotsCont).append(dotHtml);	     	  
	  } 
		
}

//shows items
function showSlider(n){
	   
	  var slides = document.getElementsByClassName('adventure-slider'); 
	  dots = document.getElementsByClassName('dots'); 
	 
	 //statement to make sure slider extend boundaries 
	 if( n>=(beltCount)) {
		  sIndex = 0;
		  } 
	  if(n < 0) { 
	      var temp = slides.length;
		  temp-=1;
	      sIndex =temp;
	  }
	 
	  //hides inactive slides
	  for ( i=0; i<slides.length;i++){
		  slides[i].style.display ='none';
	  }
	  for (i=0; i<dots.length; i++){
		    // set other dots not active
			dots[i].className = dots[i].className.replace("active", "");
		  }
		 
		//shows selected item and change dot color
		if (sIndex < slides.length){
		 slides[sIndex].style.display = 'block'; 
  		dots[sIndex].className= 'dots active';	
	   	 }		
	}


// function for next or previous item
function nextSlider(i){
	  
	 var temp = sIndex+=i;
	 
	 showSlider(temp); 
	 
	} 

//determines current item
function currentSlider(i){
	 
     showSlider(sIndex=i); 
}

//adds activities 
function addActivities () {
	
	//for loop to add example activities
	for (i=0; i<20; i++){
		var month = today.getMonth(); month+=1;
		date = today.getDate()+ "." +month + " "+ today.getFullYear();
		$(activityContainer).append("<div><p class='activity-timestamp'>"+ date+ "</p><p class='activity'>"+sampleText+"</p></div>"); 		
	}
}

//adds right bot icon on navigation bar in adventures
function addBotIcon() {
	
	$("#family-nav-bar").append("<a id='family-nav-bar-bot-icon'  href=#family ><div class='bot-icon-link'><img class='bot-icon-centered' width='35px' height='50px' /></div></a>"); 
	
}

//Sets correct content in adventures
function setContent(title){
	$(activityContainer).empty();
	$("#activity-nav div h1").empty();
	setTitle(title);
	addActivities(); 
	
}

//sets correct title and icon in adventures
function setTitle(title) {
	iconPath = "src/bot-icon-resources/"+array[sIndex][3];
	 $('#activity-nav div h1').append(title); 
	 $('#bot-icon-activity').show();
	 $('#bot-icon-activity').attr('src', iconPath);
}

//shows 
function showAnnaAdventures(){
	
    showActivity();
    
	setContent("Anna's Adventures");
};
function showHenkAdventures(){

	showActivity();
   
	setContent("Henk's Adventures");
}
function showChrisAdventures(){

	showActivity();
    
	setContent("Chris's Adventures");
}
function showOddyAdventures(){

	showActivity();
	setContent("Oddy's Adventures");
}
// click event for back button in adventures
$('#back-btn').on('click', function(){
	showFamily();
});

//shows adventures screen
function showActivity() {
	$(content).hide(); 
	$(activity).show();
	$("#bot-link-activity").show();
	
	
}
//shows family screen
function showFamily(){
	$(content).show(); 
	$(activity).hide();
	$("#bot-link-activity").hide();
}
