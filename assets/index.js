const timerDisplay = document.getElementById('timerDisplay')
const highscore = document.getElementById('scoreLog')
const question = document.getElementById('question-title')
const answerList = document.getElementById('answer-list')
const startBtn = document.getElementById('startBtn')
const initials = document.getElementById('initials')
const submitBtn = document.getElementById('submitBtn')

    let mcIndex = 0

    const mcScore = {
        correctAnswers: 0,
        incorrectAnswers: 0
    };

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

let userChoice = '';
let result = '';

function mcChecker(mcContent) {
    //mcIndex++ to jump to the next question
    //if statements go here
    userChoice = mcContent;
    const currentQuestion = mcQuestions[mcIndex];

    if (userChoice === currentQuestion.correctAnswer) {
        console.log('Correct!')
        // alert('Correct!')
        result = 'Correct!'
    } else {
        result = 'Incorrect!'
        // alert('Incorrect: 5 seconds will be deducted from the timer!')
        timer -= 5; //time reduction for getting an incorrect score

        console.log('Incorrect!')  
    }

    if (timer < 0) {
        clearInterval(timer);

    }

    mcIndex++
    console.log(mcIndex)
    displayQuestion()

    if (result === 'Correct!') { //score tally. need to save this in local storage.
        mcScore.correctAnswers += 1; //shortcut for increasing a score is using +=
    } else if (result === "Incorrect!") {
        mcScore.incorrectAnswers += 1;
    }

    // localStorage.setItem('score', JSON.stringify(mcScore)); Need to add event listener for this to work?
    // JSON.parse(localStorage.getItem('score'));
}

let timer;
let timerLeft = 30;

function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
  
}

function startTime() {
    timeLeft = 30

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





startBtn.addEventListener('click', mcStart);