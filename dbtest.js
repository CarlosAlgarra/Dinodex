var http= require('http');
var client= http.createClient(5984,"127.0.0.1");
var request=client.request("PUT","/testdb2");
request.end();

request.on("response",function(response){
	response.on("end",function(){
		if(response.statusCode==201){
			console.log("DB Created!")
		}
		else{
			console.log("DB Not Created");
		}
	});
	
});

/* This is code to create a Database on Couch DB using Node.js follow 
the link to the tutorial! */
/* https://www.youtube.com/watch?v=nD1sE3AlV9g */