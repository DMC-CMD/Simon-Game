//variales
var allowedToRestart = true;

var userPattern;
var gamePattern;
var levelCounter;
var highScoreCounter = 0;
var tutorialVisible = false;
$(".tutorial-text").hide();
$("h3").text("");
var buttonColors = ["red", "blue", "yellow", "green"];
$("h2").text("");
$("h4").click(function() {
  if (!tutorialVisible) {
    showTutorial();
  } else if (tutorialVisible) {
    hideTutorial();
  }
})
$(".btn").click(function(e) {
  buttonClick(e)   });

$(document).keypress(function() {
  gameStart();
});
function hideTutorial() {
  $("h1").text("press a key to start!");
  $("h1").css("color", "white");
  $(".container").show();
  $(".tutorial-text").hide();
  tutorialVisible = false;
  allowedToRestart = true;
  $("h1").text("press a key to start!");
  $("h2").text("");
  $("h1").css("font-size", "3rem");
}
function showTutorial() {
  $("body").css("background-color", "darkgreen")
  $("h1").text("Tutorial");
  $("h1").css("color", "black")
  $(".container").hide();
  $(".tutorial-text").show();
  tutorialVisible = true;
}
function gameStart() {
  if (allowedToRestart) {
    $("h1").css("font-size", "3rem")
    $("h2").text("");
    allowedToRestart = false;
    levelCounter = 1;
    userPattern = [];
    gamePattern = [];

    nextLevel();

    $("h1").text("Level " + levelCounter);
    $("body").css("background-color", "#003c00");


  }
}

function buttonClick(e) {
  if (!allowedToRestart) {
  var color = e.target.id;
  var colorNum = buttonColors.indexOf(color);
  userPattern.push(colorNum);
  checkPattern();
  buttonAnimation(color);
}
}

function buttonAnimation(color) {
  $("#" + color).css("background-color", "black");
  setTimeout(function() {$("#" + color).css("background-color", color)},250);

}

function nextLevel() {
  if (!allowedToRestart) {
    setTimeout(function() {
      $("h2").text("")
      userPattern = [];
      var randomColorNum = Math.floor(Math.random()*4);
      gamePattern.push(randomColorNum);
      playLastButton();
    }, 500)

  }
}
function playLastButton() {
  var n = gamePattern.length -1;
  var lastEntry = gamePattern[n];
  var col = buttonColors[lastEntry];
  buttonAnimation(col);
}
function checkPattern() {
  var n = userPattern.length - 1;
  var lastEntry = userPattern[n];
  if (lastEntry === gamePattern[n]) {
    checkLevel();
  } else if (lastEntry !== gamePattern[n]){
    restart();
  }

}

function checkLevel() {
  if (userPattern.length == levelCounter) {
    levelCounter += 1;
    $("h1").text("Level " + levelCounter);
    $(".smileys-left").text("🥳🎊");
    $(".smileys-right").text("🎊🥳");
    setTimeout(function() {
      nextLevel(); }, 800);
  }
}
function restart() {
  if (levelCounter > highScoreCounter) {
    highScoreCounter = levelCounter; }
  $("h3").text("Highscore: " + highScoreCounter);
  $("h2").text("");
  $("body").css("background-color", "red");
  $("h1").text("Mistake... Press a key to restart");
  $("h1").css("font-size", "2rem");
  allowedToRestart = true;
}
