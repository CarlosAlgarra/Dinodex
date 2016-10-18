var imgs = [ [ "http://efdreams.com/data_images/dreams/dinosaur/dinosaur-11.jpg","Triceratops"],
             ["http://orig03.deviantart.net/f652/f/2014/331/5/7/jurassic_world__tyrannosaurus_rex_by_sonichedgehog2-d87wp3n.png","Tyranosaurus Rex"],
             ["http://kindersay.com/files/images/dinosaur.png","Brontosaurus"]
           ]
var mymap=L.map('mapid').setView([26.305892349824866,-98.17293477943724],13);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
	'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
	'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);


var markerarr=[
	[26.305892349824866,-98.17293477943724,"Edinburg, TX"],
	[26.2159066,-98.32529319999998,"Mission, TX"],
	[26.2034071,-98.23001239999996,"McAllen, TX"]
];

/* for(i=0;i<markerarr.length;i++){
	lat=markerarr[i][0];
	lon=markerarr[i][1];
	popupText=markerarr[i][2];
	var marker=L.marker([lat,lon]).addTo(mymap);
	marker.bindPopup(popupText);
	marker.openPopup();
} */

var marker=L.marker([26.305892349824866,-98.17293477943724]).addTo(mymap);

marker.on("click",function(){
	/* window.open("Spelling_Game/Spell_Game.html"); */
	var x=Math.floor(Math.random() * 3) + 1;
	if(x==1){
		document.getElementById("dino").src=imgs[0][0]
		document.getElementById("dinotext").innerHTML=imgs[0][1]
		
	}
	else if(x==2){
		document.getElementById("dino").src=imgs[1][0]
		document.getElementById("dinotext").innerHTML=imgs[1][1]
		
	}
	else{
		document.getElementById("dino").src=imgs[2][0]
		document.getElementById("dinotext").innerHTML=imgs[2][1]
		
	}
	console.log()
	$("#game").show();
});
$("#answer").click(function(){
	var myVar=setTimeout(myFunction,5000);

	
});


function myFunction(){
	var val=document.getElementById("answer").value;
	var val2=$("#dinotext").text();
	if(val==val2){
		alert("you are right");
		
	}
	else{
		alert("you are wrong");
		
	}
	$("#game").hide();
	document.getElementById("answer").value="";


}


marker.bindPopup("??");
marker.openPopup();

var marker2=L.marker([26.309892349824866,-98.17293477943724]).addTo(mymap);

marker2.on("click",function(){
	$("#game2").show();
	
});
marker2.bindPopup("???????");
marker2.openPopup();


mymap.on('zoomend',onZoomend);
function onZoomend(){
	if (mymap.getZoom()>=10){
		mymap.addLayer(marker);
	}
	else{
		mymap.removeLayer(marker);
		
	}
}



