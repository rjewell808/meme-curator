const router = require('express').Router();
const db = require('./database');
const request = require('request');

const memeWeights = {
    "memes":                50,
    "dankmemes":            50,
    "greentext":            50,
    "wholesomememes":       50,   
    "dankchristianmemes":   50,
    "meirl":                50,
    "blackpeopletwitter":   50,
    "whitepeopletwitter":   50,
    "me_irl":               50,
    "prequelmemes":         50,
    "adviceanimals":        50,
    "deepfriedmemes":       50,
    "programmerhumor":      50,
    "i_irl":                50,
    "bikinibottomtwitter":  50,
    "boottoobig":           50
}

router.get('/addFavorite', function(req, res) {

});

router.get('/getFavorites', function(req, res) {

});

router.post('/updateMemes', function(req, res) {
    console.log(req.body);
})

router.get('/getAllMemes', function(req, res) {
    getAllMemes().then(function(data) {
        let result = [];
        data.forEach(function(element) {
            element.forEach(function(inner) {
                result.push(inner);
            })
        })
        res.json({
            result: result,
            memeWeights: memeWeights
        });
    });
});

function getAllMemes() {
    return new Promise(function(resolve, reject) {
        console.log("Getting all memes")
        let allPromises = [];
        const subreddits = Object.keys(memeWeights);
        for (var i = 0; i < subreddits.length; i++) {
            const currentsubreddit = subreddits[i];
            allPromises.push(getMemeFromSubreddit(currentsubreddit));
        }
    
        Promise.all(allPromises)
        .then(function(data) {
            console.log("All promises resolved")
            resolve(data);
        })
        .catch(function(error) {
            reject(error);
        });
    });
}

function getMemeFromSubreddit(subreddit) {
    console.log("About to make request for", subreddit);
    return new Promise(function(resolve, reject) {
        let memes = []
        request(`http://www.reddit.com/r/${subreddit}/.json`, function(error, response, body) {
            if (error) {
                reject(error);
            } else {
                const children = JSON.parse(body).data.children;
                let j = 0;
                while (j < children.length && memes.length < 5) {
                    if (children[j].data.post_hint === "image") {
                        memes.push({imageUrl: children[j].data.url, subreddit: subreddit, title: children[j].data.title});
                    }
                    j++;
                }
                console.log("Got memes for", subreddit);
                resolve(memes);
            }
        });
    })
}

function getSum() {
    let sum = 0;
    for (let key in memeWeights) {
        sum += memeWeights[key];
    }
    return sum;
}

function createTable() {
    console.log("Creating table");
    let queryString = `CREATE TABLE IF NOT EXISTS favoritememes (id serial PRIMARY KEY, image_url varchar(255), date_favorited TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
    db.query(queryString, function(err, result) {
        console.log("Created table");
        if (err) console.log("error", err)
        console.log(result)
        insertFavorite();
    });
}

function insertFavorite() {
    console.log("Inserting favorite");
    let queryString = `INSERT INTO favoritememes(image_url) VALUES ('sample1.jpg')`;
    db.query(queryString, function(err, result) {
        if (err) console.log("error:", err);
        console.log("inserted")
        console.log(result);
    });
}

createTable();



module.exports = router;