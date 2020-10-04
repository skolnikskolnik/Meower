function scoreBoard() {

  //Gets scores
  var scoreBoardScore = localStorage.getItem("scores");

  if (!scoreBoardScore) {
    scoreBoardScore = [];
  } else {
    scoreBoardScore = JSON.parse(scoreBoardScore);
  }

  localStorage.setItem("scores", JSON.stringify(scoreBoardScore));

  scoreBoardScore.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < scoreBoardScore.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.textContent =
      "Name: " + scoreBoardScore[i].name + " Score: " + scoreBoardScore[i].score;
    contentUL.appendChild(contentLI);
  }

  if(!scoreBoardScore){
    contentLI.textContent = "Nothing to see yet.";
  }

  document.body.appendChild(contentUL);
}

scoreBoard();