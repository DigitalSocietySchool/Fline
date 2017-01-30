// JavaScript Document
/*
Author: Quinnard Stewart
Company: MediaLAB Amsterdam
Dates: August 31st 2016 - January 31st 2017
*/
//scanner file to get data from QR-code on file upload 
var gCtx = null;
							var gCanvas = null;

							var imageData = null;
							var ii=0;
							var jj=0;
							var c=0, files;
							
								$("#scan-btn").on('change',function (e){
									if(e){
									files = e.dataTransfer.files;
									}
									filehandler();
								});
								$("#upload-btn").on('change',function (e){
									if(e){
									files = e.dataTransfer.files;
									}
									filehandler();
								});
	
								function dragenter(e) {
  											e.stopPropagation();
  											e.preventDefault();
										}

								function dragover(e) {
 											e.stopPropagation();
  											e.preventDefault();
										}
								function drop(e) {
 											e.stopPropagation();
 											e.preventDefault();

  											var dt = e.dataTransfer;
 											var files = dt.files;
										 if  (files.length >0){
  											fileHandler(files[0]);  
									 }
							
						 
			
					function fileHandler(){
						    
							
							var o=[];
							var gCanvas = document.getElementById("qr_canvas"); 
							var decodeResult = null;
							qrcode.callback = read;
							
							
							for(var i =0;i<files.length;i++)
							{
									var reader = new FileReader();
									reader.onload = (function(theFile) {
									return function(e) {
													qrcode.decode(e.target.result);
							
									};
									})(files[i]);
									reader.readAsDataURL(files[i]);
							 
								}


}  
function read(a)
{
console.log ("reading"); 

var html="<br>";
    if(a.indexOf("http://") === 0 || a.indexOf("https://") === 0)
        html+="<a target='_blank' href='"+a+"'>"+a+"</a><br>";
    html+="<b>"+a+"</b><br><br>";
    console.log(html);
    document.getElementById("result").innerHTML=html;
}
								
							function load()
							{
								initCanvas(200,200);
								qrcode.callback = read;
								qrcode.decode("src/test/WikiTest.jpg");
							}
							
							function initCanvas(ww,hh)
								{
									gCanvas = document.getElementById("qr_canvas");
									gCanvas.on("dragenter", dragenter, false);  
									gCanvas.on("dragover", dragover, false);  
									gCanvas.on("drop", drop, false);
									var w = ww;
									var h = hh;
									gCanvas.style.width = w + "px";
									gCanvas.style.height = h + "px";
									gCanvas.width = w;
									gCanvas.height = h;
									gCtx = gCanvas.getContext("2d");
									gCtx.clearRect(0, 0, w, h);
									imageData = gCtx.getImageData( 0,0,320,240);
								}
							
								function passLine(stringPixels) { 
									//a = (intVal >> 24) & 0xff;
							
									var coll = stringPixels.split("-");
								
									for(var i=0;i<320;i++) { 
										var intVal = parseInt(coll[i]);
										r = (intVal >> 16) & 0xff;
										g = (intVal >> 8) & 0xff;
										b = (intVal ) & 0xff;
										imageData.data[c+0]=r;
										imageData.data[c+1]=g;
										imageData.data[c+2]=b;
										imageData.data[c+3]=255;
										c+=4;
									} 
							
									if(c>=320*240*4) { 
										c=0;
											gCtx.putImageData(imageData, 0,0);
									} 
								} 
							
									function captureToCanvas(file) {
									//canvas = document.getElementById("qr_canvas");
									qrcode.callback = function(data) { console.log(data); };
									var result= qrcode.decode(readfile);
									
									}
								}
     