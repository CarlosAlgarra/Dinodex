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
	window.open("mapexample.html");
});
marker.bindPopup("I'm a popup");
marker.openPopup();


mymap.on('zoomend',onZoomend);
function onZoomend(){
	if (mymap.getZoom()>=10){
		mymap.addLayer(marker);
	}
	else{
		mymap.removeLayer(marker);
		
	}
}


