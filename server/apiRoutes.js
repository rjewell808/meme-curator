const router = require('express').Router();
const Meme = require('./favoritememe');
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

router.post('/addFavorite', function(req, res) {
    console.log(req.body);
    let newFav = new Meme();
    newFav.image_url = req.body.image;
    newFav.save(function(err) {
        if (err) console.log(err);
    });
});

router.get('/getFavorites', function(req, res) {
    Meme.find({}, function(err, res) {
        if (err) {
            res.status(500).json({
                "message": "There was an error" + err
            });
        } else {
            res.json({
                result: res
            });
        }
    });
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
            result: shuffle(result),
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

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

module.exports = router;