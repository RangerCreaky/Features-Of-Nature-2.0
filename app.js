const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const {Nature , Review , Single} = require('./modals/db');
const app = express();


// MIDDLEWARES
// BODY-PARSER
app.use(express.urlencoded({extended : false}));
// STATIC FILES
app.use(express.static(path.join(__dirname , "public")));

// VIEWS
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , "views"));

// ROUTES
app.get("/" , (req , res)=>{
    res.render('index');
});

app.get("/image-identify" , (req , res)=>{
    res.render('image_identify');
});

app.get("/video-identify" , (req , res)=>{
    res.render('video_identify');
});

app.get("/feature-extractor" , (req , res)=>{
    res.render('feature_extractor');
});

app.get("/about/:label" , (req , res)=>{
    let params = req.params.label;
    let name = params[0].toUpperCase() + params.slice(1 , params.length);
    Nature.find({name : name} , (err , data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.render('about' , {data : data[0]});
        }
    })
});

app.get("/review/:label" , (req , res)=>{
    let params = req.params.label;
    console.log(params);
    let name = params[0].toUpperCase() + params.slice(1 , params.length);
    console.log(name);
    Review.find({name : name} , (err , data)=>{
        if(err){
            console.log(err);
        }
        if(data){
            res.render("reviews" , {data : data[0]});
        }
    });
});


// POST 
app.post("/review" , (req , res)=>{
    const review = new Single ({
        nickname : req.body.nickname,
        review : req.body.review,
    });
    console.log(req.body.element);
    Review.updateOne({name : req.body.element} , {$push : {reviews : review}} , (err)=>{
        if(err){
            console.log(err);
        }
        res.redirect(`/review/${req.body.element}`);
    });
})

// Listen
app.listen(3000 , ()=>{
    console.log("server up and running")
})