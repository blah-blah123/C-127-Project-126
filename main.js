song = "";
song2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

function preload() {
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    if (scoreLeftWrist > 0.02) {

        fill("#ff474a");
        stroke("#274422");
        circle(leftWristX, leftWristY, 20);
        song.stop();
        song2.stop();

        song2.play();
        document.getElementById("song").innerHTML = "Song 2 is being played!";


    }

    if (scoreRightWrist > 0.02) {

        fill("#90c185");
        stroke("#9f1f19");
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        song.stop();

       
        song.play();
        document.getElementById("song").innerHTML = "Song 1 Playing!"
      

    }

}


function modelLoaded() {
    console.log("PoseNet has been initialized!");
}

function gotPoses(results, error) {
    if (error) {
        console.log("Error!");
    }

    if (results.length > 0) {
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreLeftWrist - " + scoreLeftWrist);
        console.log("scoreRightWrist - " + scoreRightWrist);

        console.log("leftWristX - " + leftWristX);
        console.log("leftWristY - " + leftWristY);
        console.log("rightWristX - " + rightWristX);
        console.log("rightWristY - " + rightWristY);
    }
}