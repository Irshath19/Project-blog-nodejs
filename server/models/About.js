const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    about: String,
    updatedTime: { type: Date, default: Date.now },
});

const About = mongoose.model('About', aboutSchema);

module.exports = About;
