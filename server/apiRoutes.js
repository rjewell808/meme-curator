const router = require('express').Router();
const Meme = require('./favoritememe');
const request = require('request');

let memeWeights = {
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

const seen = {}

router.post('/addFavorite', function(req, res) {
    console.log(req.body);
    let newFav = new Meme();
    newFav.image_url = req.body.image;
    newFav.save(function(err) {
        if (err) console.log(err);
    });
});

router.get('/getFavorites', function(req, res) {
    Meme.find({}, function(err, result) {
        if (err) {
            res.status(500).json({
                "message": "There was an error" + err
            });
        } else {
            res.json({
                result: result
            });
        }
    });
});

router.post('/updateMemes', function(req, res) {
    memeWeights = req.body.memeWeights;
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
        let allPromises = [];
        const subreddits = Object.keys(memeWeights);
        let sum = getSum()
        for (var i = 0; i < 25; i++) {
            let x = Math.floor(Math.random() * (sum + 1));
            let total = 0
            for (var j = 0; j < subreddits.length; j++) {
                let current = memeWeights[subreddits[j]];
                if (x > total && x <= total + current) {
                    allPromises.push(getMemeFromSubreddit(subreddits[j], 1));
                    break;
                }
                total += current;
            }
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

function getMemeFromSubreddit(subreddit, num) {
    console.log("About to make request for", subreddit);
    return new Promise(function(resolve, reject) {
        let memes = []
        request(`http://www.reddit.com/r/${subreddit}/.json`, function(error, response, body) {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                const children = JSON.parse(body).data.children;
                let j = 0;
                while (j < children.length && memes.length < num) {
                    if (children[j].data.post_hint === "image" && !seen[children[j].data.url]) {
                        memes.push({imageUrl: children[j].data.url, subreddit: subreddit, title: children[j].data.title});
                        seen[children[j].data.url] = true;
                    }
                    j++;
                }
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