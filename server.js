const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require ('body-parser')
const session= require('express-session')

/* var session = require('express-session'); */



const app = express();


app.use(bodyParser.urlencoded({extended:true}))
app.use(session({secret : 'iwiwjeiwjewieji',
		resave: true,
		saveUninitialized: true
		}
))


var db
var currentLogIn
var currentDinoId

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}



MongoClient.connect('mongodb://dinodex:qqppaamm@ds041566.mlab.com:41566/dinodex', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('dinos').find().toArray((err, result) => {
    if (err) return console.log(err)
		
	
/* 	if(req.sessionID){
		console.log(req.sessionID)
		res.render('loggedindex.ejs', {dinos: result})
		}
	else{ }*/
		res.render('index.ejs', {dinos: result})

	


  })
  
  
})

app.get('/usersinfo', (req, res) => {
	  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.get('/dinosinfo', (req, res) => {
  db.collection('dinos').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.get('/bloginfo', (req, res) => {
  db.collection('blog').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
})

app.get('/getCurrentUser', (req, res) => {
 
	  db.collection('users').find({userid: session.id}).toArray((err, result) => {
    if (err) return console.log(err)
    res.send(result)
  })
  })


app.post('/giveDinoID', function (req, res) {
   var dinoid1 = req.body.dinoid;

   session.dino = dinoid1;
   
   console.log(session.dino)
   
   res.status(201)
   res.json();
});

app.post('/changepassword', function (req, res, next) {
   var userid1 = session.id;
   var pass = req.body.currentpass;
   var newpass = req.body.newpass;

		db.collection('users').update({userid: session.id, userpassword:pass}, {$set: {userpassword: newpass}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Password changed!');
  } else {
    console.log('No document found with defined "find" criteria!');
  }
  
 
});
   

   
});

app.post('/login', function (req, res, next) {
   var userid1 = req.body.userid;
   var pass = req.body.password;

   db.collection('users').findOne({userid: userid1, userpassword: pass}, function(err, user) {
      if(err) return next(err);
      if(!user) {
		  
		  return res.send('Loggin failed!')
		  
	  }

      session.id = userid1;
	  console.log('user '+userid1+' loggedin')
	     res.status(202)

		

   });
   

   
});

/* app.post('/logout', function(req, res, next){
	
	
}) */
/*
app.post('/updateDino', (req,res) =>{

	db.collection('users').update({userid: session.id}, {$push: {dinos: session.dino}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s). Dino Added', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
  
 
});
})
*/

app.post('/updateScore', (req,res) =>{
	
		db.collection('users').update({userid: session.id}, {$push: {dinos: session.dino}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s). Dino Added', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
  
 
});

if(req.body.gameName == "spellGame"){
	db.collection('users').update({userid: session.id}, {$set: {spellScore: req.body.newScore}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
 
 
});}
else if (req.body.gameName == "memGame"){
	db.collection('users').update({userid: session.id}, {$set: {memScore: req.body.newScore}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
 
 
});}

else if (req.body.gameName == "hangGame"){
	db.collection('users').update({userid: session.id}, {$set: {memScore: req.body.newScore}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
 
 
});}


	console.log(req.body.newScore)
})


app.post('/signup', (req,res) =>{
	
var check = 0;
   db.collection('users').findOne({userid: req.body.userid}, function(err, user) {
      if(err) return next(err);
      if(!user) {
		  check = 1;
		  console.log("not found happens");
	  }
	  
	console.log(req.body.userid);
	console.log(check);
	if(check > 0){
		console.log(req.body.password1 + req.body.password2)
	if (req.body.password1 == req.body.password2){

		db.collection('users').insertOne({userid: req.body.userid, userpassword: req.body.password1, admin: "no", memScore: "0", spellScore:"0", whackScore:"0", templeScore: "0", dinos:[]}, function (err, numUpdated) {
		  if (err) {
			console.log(err);
		  } else if (numUpdated) {
			console.log('Updated Successfully %d document(s).', numUpdated);
		  } 
		  //Close connection
		 
		});
		console.log(req.body.userid)
	
	}
	else{
		console.log('not same pass')
	}
	}
	else console.log('user taken!');
   });
})





/* load("map2.js"); */
app.use(express.static(__dirname));
app.use(express.static("map2.js"));
app.use(express.static("blog.html"));

