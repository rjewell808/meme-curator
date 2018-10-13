const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Meme = new Schema({
    image_url: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Meme', Meme);