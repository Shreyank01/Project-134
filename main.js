function setup() {
    canvas = createCanvas(400,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(400,400);
    object_detector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Object : Detecting...";
    alarm.play();
}

function modelLoaded() {
    console.log("Model Loaded !");
    status = true;
    
}

function gotResult(error , results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        objects = results;
    }
}

status = "";
objects = [];
alarm = "";

function preload() {
    alarm = loadSound("alert.mp3");
}

function draw() {
    image(video ,0 ,0 ,400 ,400); 
    if(status != "") {
        object_detector.detect(video , gotResult);
        for(i=0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Object : Detected";
            percent = Math.floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percent + "%" , objects[i].x , objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
            
            if(objects[i].label != "person"){
                document.getElementById("yes_no").innerHTML = "Person is not detected !";
                alarm.play();
            }
            else{
                document.getElementById("yes_no").innerHTML = "Person is detected";
                alarm.stop();
            }
            

           
        }
    
    }

    

}