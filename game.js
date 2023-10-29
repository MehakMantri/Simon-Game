// alert("Hello Mfssssss");
var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];
//to check which button is clicked
var started=false;
var level=0;

$(document).keypress(function() {
    if(!started){
        $("#level-title").text("Level"+level);
        nextSequence();
        started=true;
       
    }
});


$(".btn").click(function(){//attaches aclick event handler
    var userChosenColor=$(this).attr("id");
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
});



//random colour is choosen

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor((Math.random())*3)+1;
    var randomChosenColor=buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);

    // animation added when a random colour is choosen
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    //sound added when a random colour is choosen
    playSound(randomChosenColor);
}

function playSound(name) {
    var audio= new Audio("sounds/" + name+ ".mp3");
    audio.play();
}   

//adding animation to user clicks

function animatePress(currentColor){

    $("#"+ currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);

}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }

    }
    else{
        console.log("wrong");
        playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart"); 
     startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;


}



