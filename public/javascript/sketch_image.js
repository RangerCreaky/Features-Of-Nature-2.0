let mobilenet;
let mango;
let dropzone;
let uploadedImage;

function modelReady() {
    console.log('model is ready');
    mobilenet.predict(uploadedImage, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        let label = results[0].label.split(' ')[0];
        let prob = results[0].confidence;
        console.log(label);
        let foundImg = createImg(`./sketch-image/${label}.jpg`);
        foundImg.addClass('image')

        let name = createElement('h1', `${label}`);
        name.addClass('name');

        let labelName = label.split(' ').join('');

        let buttonDiv = createDiv('');
        buttonDiv.addClass('buttonDiv')
        let about = createA(`/about/${labelName}`, 'About');
        about.addClass('btn');
        about.addClass('btn-lg');
        about.addClass('btn-success');
        about.addClass('custom-button');
        
        let review = createA(`/review/${labelName}`, 'Reviews');
        review.addClass('btn');
        review.addClass('btn-lg');
        review.addClass('btn-success');
        review.addClass('custom-button');
        
        buttonDiv.child(about); 
        buttonDiv.child(review);
    }
}

function setup() {
    createCanvas(0, 0);

    dropzone = select('#drop-zone');
    dropzone.dragOver(() => {
        dropzone.style('background-color', '#3b8834');
    });

    dropzone.dragLeave(() => {
        dropzone.style('background-color', '#fff');
    })

    dropzone.drop((file) => {
        uploadedImage = createImg(file.data);
        uploadedImage.addClass('image');
        mobilenet = ml5.imageClassifier('MobileNet', modelReady);

    }, () => {
        dropzone.style('display', 'none');
    });



    // mango = createImg('./images/mango.jpg' , imageReady);


    // mango.hide();
    // background(0);


}