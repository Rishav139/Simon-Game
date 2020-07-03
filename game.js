var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var highScore = 0;

function playSound (name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress (name) {
  $("#"+name).addClass("pressed");
  setTimeout(function() {
    $("#"+name).removeClass("pressed");
    }, 100);
}

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level += 1;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver() {
  if (level > highScore) {
    $(".score").text("High Score = " + (level-1));
    highScore=level-1;
    alert("Game Finished");
  }
  level = 0;
  gamePattern = [];
}

function checkAnswer (currentLevel) {
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if(gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

$(document).keypress(function () {
  if(level === 0 ) {
    $("#level-title").text("Level 0");
    nextSequence();
  }

});
