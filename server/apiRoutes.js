const router = require('express').Router();
const db = require('./database');

router.get('/addFavorite', function(req, res) {

});

router.get('/getFavorites', function(req, res) {

});

router.get('/getAllMemes', function(req, res) {

});

router.get('/getMemeOfType/:memeType', function(req, res) {

});

function insertUser() {
    let queryString = `INSERT INTO users (0, "urmom")`;
    db.query(queryString, function(err, result) {
        if (err) console.log("error:", err);
        console.log(result);
        if (!err) insertFavorite();
    });
}

function insertFavorite() {
    let queryString = `INSERT INTO favoritememes VALUES ("sample1.jpg", ${new Date().toString()}, 0)`;
    db.query(queryString, function(err, result) {
        if (err) console.log("error:", err);
        console.log(result);
    });
}

insertUser();



module.exports = router;