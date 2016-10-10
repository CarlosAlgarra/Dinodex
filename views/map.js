AmCharts.makeChart("mapdiv",{
	"type":"map",
	"dataProvider":{
		"map": "worldLow",
		"getAreasFromMap":true,
		"images":[
			{
				"latitude":40.3951,
				"longitude":-73.5619,
				"type": "circle",
				"color": "#6c00ff",
				"scale": 0.5,
				"zoomLevel": 5,
				"description": "Is this a dinosaur click again to find out!"
			}
		]
	},
	"areasSettings":{
		"autoZoom":true,
		"selectedColor": "#CC0000"
	},
	"smallMap":{}
	});