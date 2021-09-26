let mobilenet;
let video;
let label = '';
let canvas;
let buttonbuttonParent;
let div;
function modelReady(){
    console.log('model is ready');
    mobilenet.predict(video , gotResults);
}

function gotResults(error , results) {
    if(error){
        console.error(error);
    }
    else{
        label = results[0].label;
        div.html(label , false);
        mobilenet.predict(video , gotResults);
    }
}

function click(){
    buttonParent.hide();
    video = createCapture('VIDEO');
    video.size(420 , 700);
    main = select('main');
    main.child(video);
    div = createDiv();
    div.addClass('div');
    main.child(div);
    mobilenet = ml5.imageClassifier('MobileNet' , video , modelReady);
}

function setup() {
    canvas = createCanvas(420 , 700);
    canvas.addClass('canvas');
    canvas.hide();
    buttonParent = select('#buttonParent');
    button = select('#button');
    button.mousePressed(click)
    background(0);
}

function draw() {
    background(0);
    // image(video , 0 , 0);
    fill(255);
    textSize(64);
    text(label , 10, height - 20);
}