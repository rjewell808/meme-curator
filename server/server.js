const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './../build'));

const MLAB_URI = "mongodb://memers:urmomgay69@ds131763.mlab.com:31763/meme-curator"
  
mongoose.connection.on('connected', function() {
    console.log('Success: connected to MongoDb!');
});
mongoose.connection.on('error', function(err) {
    console.log('Error connecting to MongoDb: ' + err);
    process.exit(1);
});

mongoose.connection.on("connected", function() {
    console.log("Connected to mlab");
});

mongoose.connect(MLAB_URI);


// Start server
app.listen(port, function() {
	console.log("running on port", port);
});

let apiRoutes = require('./apiRoutes');
app.use('/api', apiRoutes);