var questions = [
  {
    question: "The atomic number is the number of _____ in an atom.",
    choices: ["protons", "neutrons", "protons and neutrons", "electrons"],
    answer: "protons",
  },
  {
    question:
      "The oxidation state of iron in rust is ...",
    choices: ["+1", "+2", "+3", "0"],
    answer: "+3",
  },
  {
    question:
      "Which of the following is not an oxidation-reduction reaction?",
    choices: ["double replacement", "single replacement", "combustion", "synthesis"],
    answer: "double replacement",
  },
  {
    question:
      "Titrations are used to experimentally determine ...",
    choices: ["pressure", "temperature", "volume", "concentration"],
    answer: "concentration",
  },
  {
    question:
      "0.00450 mL has how many significant figures?",
    choices: ["6", "5", "4", "3", "2", "1", "What's a significant figure?"],
    answer: "3",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var startEl = document.querySelector("#welcome");

var questionIndex = 0;
var correctCount = 0;
var time = 10;
var intervalId;

timerEl.textContent=time;

function endQuiz() {
  clearInterval(intervalId);
  var body = document.body;
  body.innerHTML = "Game over, You scored " + correctCount;
  //After 2 s move on to showHighScore
  setTimeout(showHighScore, 2);
}

function showHighScore() {
  //Prompts user to enter initials
  var name = prompt("Please enter your initials");

  //Gets scores
  var high_scores = localStorage.getItem("scores");

  if (!high_scores) {
    high_scores = [];
  } else {
    high_scores = JSON.parse(high_scores);
  }

  //adds new items to array
  high_scores.push({ name: name, score: correctCount });

  localStorage.setItem("scores", JSON.stringify(high_scores));

  high_scores.sort(function (a, b) {
    return b.score - a.score;
  });

  var contentUL = document.createElement("ul");

  for (var i = 0; i < high_scores.length; i++) {
    var contentLI = document.createElement("li");
    contentLI.textContent =
      "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
    contentUL.appendChild(contentLI);
  }

  document.body.appendChild(contentUL);
}

function updateTime() {
  time--;
  timerEl.textContent = time;
  if (time <= 0) {
    endQuiz();
  }
}

function renderQuestion() {
  
  if (time == 0) {
    updateTime();
    return;
  }

  intervalId = setInterval(updateTime, 1000);
  questionEl.textContent = questions[questionIndex].question;

  optionListEl.innerHTML = "";
  questionResultEl.innerHTML = "";

  var choices = questions[questionIndex].choices;
  var choicesLenth = choices.length;

  for (var i = 0; i < choicesLenth; i++) {
    var questionListItem = document.createElement("li");
    questionListItem.textContent = choices[i];
    optionListEl.append(questionListItem);
  }
}

function nextQuestion() {
  questionIndex++;
  if (questionIndex === questions.length) {
    time = 0;
  }
  renderQuestion();
}

function checkAnswer(event) {
  clearInterval(intervalId);
  if (event.target.matches("li")) {
    var answer = event.target.textContent;
    if (answer === questions[questionIndex].answer) {
      questionResultEl.textContent = "Correct";
      correctCount++;
    } else {
      questionResultEl.textContent = "Incorrect";
      time = time - 2;
      timerEl.textContent = time;
    }
  }
  setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);