/**
 * Author: Alexander Adu-Sarkodie
 * File name: server.js
 * Purpose: Server instance to instantiate and load application
 * Date: January 2016
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();

// MongoDB: MODIFY TO PULL IN DATA FROM DATABASE: viewchatlist 
//see notes here: C:\mongo-notes\viewchatlist
mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:/albumlist');
// mongoose.connection.on('error', function(){});



var COMMENTS_FILE = path.join(__dirname, 'comments.json');


//server Configuration
app.set('port', (process.env.PORT || 3040));


// Routes
app.use('/', express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', require('./routes/api'));
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(comments);
    });
  });
});

//Start server
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});