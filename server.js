const MongoClient = require('mongodb').MongoClient
const express = require('express');
const app = express();

var db

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

/* load("map2.js"); */
app.use(express.static(__dirname));
app.use(express.static("map2.js"));
app.use(express.static("marker_class.js"));

