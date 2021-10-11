function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill("#ADD8E6");
    stroke("#ffb6c1")
    circle(rightWristX,rightWristY,20);
    if(rightWristY>0 && rightWristY<= 100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else {
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5);
    }
    if(scoreLeftWrist>0.2){
         circle(leftWristX,leftWristY,20);
         InNumberleft=Number(leftWristY);
         remove_decimals=floor(InNumberleft);
         volume=remove_decimals/500;
         document.getElementById("volume").innerHTML="volume"+volume;
         song.setVolume(volume);
        
    }
    
}
song="";
function preload(){
    song=loadSound("music.mp3");
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
 scoreRightWrist=0;
 scoreLeftWrist=0

rightWristX=0;
rightWristY=0;

leftWristX=0;
leftWristY=0;

function gotPoses(results){
    if(results.length>0){
       scoreLeftWrist=results[0].pose.keypoints[9].score;
       console.log("score of leftWrist="+scoreLeftWrist);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY"+rightWristY);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("lefttWristX="+leftWristX+"leftWristY"+leftWristY);

}
}
function modelLoaded(){
    console.log("poseNet is Initialized");
}
function stop(){
    song.stop();
}