const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser = require ('body-parser')
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
var db



var currentLogIn

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

app.get('/', (req, res) => {
db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {users: result})

  })
})



app.post('/login', function (req, res, next) {
   var userid1 = req.body.userid;
   var pass = req.body.password;

   db.collection('users').find({userid: userid1, userpassword: pass}, function(err, user) {
      if(err) return next(err);
      if(!user) {
		  
		  return res.send('Loggin failed!')
		  
	  }

      currentLogIn = userid1;
	  console.log('user '+userid1+' loggedin')
   });
   
});

app.post('/updateScore', (req,res) =>{

	db.collection('users').update({userid: currentLogIn}, {$set: {memScore: req.body.newScore}}, function (err, numUpdated) {
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


app.post('/update', (req,res) =>{

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
	
	var bool = checkTaken(req.body.userid)
	
	
	
	
	if(bool){
	if (req.body.password == req.body.password2){

			db.collection('users').insertOne({userid: req.body.userid, password: req.body.password}, function (err, numUpdated) {
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
})

function checkTaken(userid1){

   db.collection('users').find({userid: userid1}, function(err, user) {
      if(err) return next(err);
      if(!user) {
		  
		  console.log('user not found(good)')
		  return false
		  
	  }
		
		console.log('USER FOUNDSDDDD')
      return true
   });
	
	
	
}


/* load("map2.js"); */
app.use(express.static(__dirname));
app.use(express.static("map2.js"));

