const timerDisplay = document.getElementById('timerDisplay')
const viewHighScore = document.getElementById('view-high-scores')
const question = document.getElementById('question-title')
const answerList = document.getElementById('answer-list')
const startBtn = document.getElementById('startBtn')
const initials = document.getElementById('initials')
const submitBtn = document.getElementById('submitBtn')
const restartBtn = document.getElementById('return')
const scoreBoard = document.querySelector('.score-board')
const endScreen = document.querySelector('.end-screen')

    let mcIndex = 0

    let timer;
    let timeLeft = 30;

    

    const mcScore = { //object for keeping score
        correctAnswers: 0,
        incorrectAnswers: 0
    };

const mcQuestions = [
    {
        question: 'Which of the following is not a primitive data type?',
        choices: ['String', 'Number', 'Array', 'Boolean'],
        correctAnswer: 'Array',
    },
    {
        question: 'What does NaN stand for?',
        choices: ['Now or Never', 'Null', 'Not Another', 'Not a Number'],
        correctAnswer: 'Not a Number',
    }

];
    
    function mcStart() {
        startTime()
        displayQuestion()
    }

    

   

function displayQuestion() {
   const questionTitle = mcQuestions[mcIndex].question;
   question.textContent = questionTitle; 
   
    const mcChoices = mcQuestions[mcIndex].choices;

    let mcChoicesEl = ''
   for (var i = 0; i < mcChoices.length; i++) {
         mcChoicesEl += `<li>${mcChoices[i]}</li>`
         answerList.innerHTML = mcChoicesEl 
    // console.log(`Question: ${mcQuestions[i].question}`); //
    // console.log(`Choices: ${mcQuestions[i].choices}`);
    // console.log(`Correct Answer: ${mcQuestions[i].correctAnswer}`)
    } 

    answerList.addEventListener('click', function(event){
        event.preventDefault()
        if (event.target.matches('li')) {
            console.log(event.target.textContent)
            mcChecker(event.target.textContent)
        }
    })
}

// let userChoice = '';
let result = '';

function mcChecker(mcContent) {
    //mcIndex++ to jump to the next question
    //if statements go here
    let userChoice = mcContent;
    const currentAnswer = mcQuestions[mcIndex].correctAnswer;
    console.log('check answer', userChoice, currentAnswer)

    if (userChoice === currentAnswer) { //tried [mcIndex], [0], [1]
        console.log('Correct!')
        // alert('Correct!')
        result = 'Correct!'
    } else {
        result = 'Incorrect!'
        // alert('Incorrect: 5 seconds will be deducted from the timer!')
        timeLeft -= 5; //time reduction for getting an incorrect score

        console.log('Incorrect!')  
    }

    if (timer <= 0) {
        clearInterval(timer);

    }

    mcIndex++
    console.log(mcIndex)
    

    if (result === 'Correct!') { //score tally. need to save this in local storage.
        mcScore.correctAnswers += 1; //shortcut for increasing a score is using +=
    } else if (result === "Incorrect!") {
        mcScore.incorrectAnswers += 1;
    }

        if (mcQuestions.length > mcIndex) {
            displayQuestion()
        } else {
            clearInterval(timer)
            //enter an end screen function later 
            gameOver()
        }
    
}



function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
  
}

function startTime() {
    timeLeft = 30

    timer = setInterval(function (){
        timeLeft--
        updateTimerDisplay()

        if(timeLeft <= 0) {
            stopTimer()
            alert('Times Up--Try Again!')
        }


    }, 1000)
}

function stopTimer() {
    clearInterval(timer)
}

function gameOver() {
    
    endScreen.classList.remove('hide')
    const quizElement = document.querySelector('.quiz')
    quizElement.classList.add('hide') 
}

function saveScores() {
    const initialsInput = document.querySelector('#initials')
    let user = initialsInput.value.trim()
    let highScores = JSON.parse(localStorage.getItem('highScores')) || []
    let newScore = {
        user: user,
        mcScore: mcScore
    }

    highScores.push(newScore)
    localStorage.setItem('highScores', JSON.stringify(highScores))
    endScreen.innerText = 'Score Saved!'
}

function viewHighScores() {
    let scoreList = JSON.parse(localStorage.getItem('highScores')) || []
    let scoresElement = ''
    scoreList.forEach((score) => {
     scoresElement += `<div class='scoreLog'><p>score: ${score.user} Correct: ${score.mcScore.correctAnswers} Incorrect: ${score.mcScore.incorrectAnswers}</p></div>` 
     scoreBoard.innerHTML = scoresElement  
    });
}

viewHighScore.addEventListener('click', function(event) {
    event.preventDefault()

    viewHighScores() 
    scoreBoard.classList.remove('hide')
})
submitBtn.addEventListener('click', saveScores)

restartBtn.addEventListener('click', function(event) {
    event.preventDefault()
    document.location.reload()
}) 





startBtn.addEventListener('click', mcStart);