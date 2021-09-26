const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/natureDB');

const elementSchema = mongoose.Schema({
    name : String,
    scientificName : String,
    aboutStar : String,
    about : String,
    geographyStar : String,
    geography : String,
    speciality : String,

});

const singleReview = mongoose.Schema({
    nickname : String,
    scientificName : String,
    review : String
});

const reviewSchema = mongoose.Schema({
    name : String,
    reviews : [singleReview]
});

const Nature = mongoose.model('element' , elementSchema);
const Review = mongoose.model('review' , reviewSchema);
const Single = mongoose.model('single' , singleReview);
module.exports = {Nature , Review , Single};