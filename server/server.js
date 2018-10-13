const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + './../build'));

// Start server
app.listen(port, function() {
	console.log("running on port", port);
});


//let apiRoutes = require('./apiRoutes');
//app.use('/api', apiRoutes);