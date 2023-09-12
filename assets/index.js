const timerDisplay = document.getElementById('timerDisplay')
const highscore = document.getElementById('scoreLog')
const question = document.getElementById('question-title')
const answerList = document.getElementById('answer-list')
const startBtn = document.getElementById('startBtn')

const mcQuestions = [
    {
        question: 'Which of the following is not a primitive data type?',
        choices: ['String', 'Number', 'Array', 'Boolean'],
        correctAnswer: 2,
    },
    {
        question: 'What does NaN stand for?',
        choices: ['Now or Never', 'Null', 'Not Another', 'Not a Number'],
        correctAnswer: 3,
    }
]

let timer;
let timerLeft = 5;

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
  
}

function startTime() {
    timeLeft = 5

    timer = setInterval(function (){
        timeLeft--
        updateTimerDisplay()

        if(timeLeft === 0) {
            stopTimer()
            alert('Times Up--Try Again!')
        }


    }, 1000)
}

function stopTimer() {
    clearInterval(timer)
}



startBtn.addEventListener('click', startTime);