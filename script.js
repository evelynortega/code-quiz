function byId(id) {
    return document.getElementById(id)
}
var timeLeft = 60;
var startScreen = byId("startScreen");
var gameScreen = byId("gameScreen");
var startBtn = byId("startQuiz");
var question = byId("question");
var ans1 = byId("ans1");
var ans2 = byId("ans2");
var ans3 = byId("ans3");
var ans4 = byId("ans4");
var feedback = byId("feedback");
var endScreen = byId("endScreen");
var submitInitials = byId("submitInitials");
var initials = byId("initials");
var highScoreScreen = byId("highScoreScreen")
var highScores = byId("highScores")

var questionIndex = 0;
var questions = [
    {
        question: "What is the biggest heading in index.html?",
        ans1: "h1", 
        ans2: "h2",
        ans3: "h3",
        ans4: "h4",
        correct: "h1",
    },
    {
        question: "Which of the following use class elements?",
        ans1: "HTML",
        ans2: "JavaScript",
        ans3: "CSS",
        ans4: "All",
        correct: "All",
    },
    {
        question: "Where do you find '<!DOCTYPE html>'?",
        ans1: "HTML",
        ans2: "CSS",
        ans3: "JavaScript",
        ans4: "All",
        correct: "HTML",
    },
];

function startQuiz() {
    startScreen.classList.toggle("hide");
    gameScreen.classList.toggle("hide");

    // startTimer()
    displayQuestion();
}

function displayQuestion() {
    var currentQuestion = questions[questionIndex];

    if(!currentQuestion){

    }

    question.textContent = currentQuestion.question;
    ans1.textContent = currentQuestion.ans1;
    ans2.textContent = currentQuestion.ans2;
    ans3.textContent = currentQuestion.ans3;
    ans4.textContent = currentQuestion.ans4;
}

function endQuiz()  {
    gameScreen.classList.toggle("hide");
    endScreen.classList.toggle("hide");
}

function checkAnswer(event) {
    console.log(event.target.textContent);

    if(event.target.textContent === questions[questionIndex].correct) {
        console.log("right");
        feedback.textContent = "You got it right!";
        feedback.style.backgroundColor = "pink";
    } else{
        console.log("wrong");
        timeLeft -= 10;
        feedback.textContent = "Better luck next time...";
        feedback.style.backgroundColor = "purple";
    }
    setTimeout(function () {
        feedback.textContent = "";
        feedback.style.backgroundColor = "";
        questionIndex++;
        displayQuestion();
    }, 1500);
}

function saveScore() {
    var savedScores = JSON.parse(localStorage.getItem(Scores)) || [];
    var scoreObj = {
        name: initials.value,
        score: timeLeft,
    };

    savedScores.push(scoreObj);

    localStorage.setItem("scores", JSON.stringify(savedScores));
    endScreen.classList.toggle("hide");
    displayScores();
}

function displayScores() {
    highScoresScreen.classList.toggle("hide");
    var savedScores = JSON.parse(localStorage.getItem("scores")) || [];
    savedScores.sort(function (a, b){
        return b.score - a.score;
    });
    for (let i = 0; i < savedScores.length; i++) {
        let scoreObj = savedScores[i];
        let li = document.createElement("li");
        li.textContent = scoreObj.name + ": " + scoreObj.score;
        highScores.append(li);
    }
}

startBtn.addEventListener("click", startQuiz);
ans1.addEventListener("click", checkAnswer);
ans2.addEventListener("click", checkAnswer);
ans3.addEventListener("click", checkAnswer);
ans4.addEventListener("click", checkAnswer);
submitInitials.addEventListener("click", saveScore);