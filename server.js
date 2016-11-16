const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require ('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
var db
var currentLogIn

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



app.post('/login', function (req, res, next) {
   var userid1 = req.body.userid;
   var pass = req.body.password;

   db.collection('users').findOne({userid: userid1, userpassword: pass}, function(err, user) {
      if(err) return next(err);
      if(!user) {
		  
		  return res.send('Loggin failed!')
		  
	  }

      currentLogIn = userid1;
	  console.log('user '+userid1+' loggedin')
   });
   
});

app.post('/updateScore', (req,res) =>{

	db.collection('users').update({userid: currentLogIn}, {$set: {spellScore: req.body.newScore}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
 
 
});
	console.log(req.body.newScore)
})


app.post('/updateDino', (req,res) =>{

	db.collection('users').update({userid: req.body.userid}, {$set: {trophies: [2,5,7]}}, function (err, numUpdated) {
  if (err) {
    console.log(err);
  } else if (numUpdated) {
    console.log('Updated Successfully %d document(s).', numUpdated);
  } else {
    console.log('No document found with defined "find" criteria!');
  }
  
 
});
	console.log(req.body.userid)
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

		db.collection('users').insertOne({userid: req.body.userid, userpassword: req.body.password1}, function (err, numUpdated) {
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

