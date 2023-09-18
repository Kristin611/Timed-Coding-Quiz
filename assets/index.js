// Psuedocode:
// 1. When I click the "Begin Quiz" button:
    // a. a timer starts, and
    // b. the user is presented with the first question and answer choicesw.

// 2. When an answer choice is selected, the user is prompted with a message of correct or incorrect.
    // a. if the user selects the wrong answer choice, 5 seconds is deducted from the time. 

// 3. Once all of the questions are answered or the timer equals 0, then the quiz is over. 

// 4. Once the quiz is over, user types their initials in the input box to save their score to their initials.

// 5. User can click "View High Scores" to see their and others' scores. 

// 6. To re-take the quiz, user clicks "Start Over." 

//below are the variables I created to grab specific html elements in order to make the application interactive. 
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

    let mcIndex = 0 //index starts at 0 

    let timer;
    let timeLeft = 30;

    

    const mcScore = { //object for keeping score
        correctAnswers: 0,
        incorrectAnswers: 0
    };

const mcQuestions = [ //I created an array of object questions the stores the quiz questions with choices and correct answers.
    {
        question: 'Which of the following is not a primitive data type?',
        choices: ['String', 'Number', 'Array', 'Boolean'],
        correctAnswer: 'Array',
    },
    {
        question: 'What does NaN stand for?',
        choices: ['Now or Never', 'Null', 'Not Another', 'Not a Number'],
        correctAnswer: 'Not a Number',
    },
    {
        question: 'What is the primary purpose of JavaScript?',
        choices: ['Styling web pages', 'Creating server-side applications', 'Enhancing user interfaces', 'Managing databases'],
        correctAnswer: 'Enhancing user interfaces',
    },
    {
        question: 'What does the "DOM" stand for in JavaScript?',
        choices: ['Document Object Model', 'Data Object Model', 'Dynamic Output Mechanism', 'Digital Object Manager'],
        correctAnswer: 'Document Object Model',
    },
    {
        question: 'Which JavaScript method is used to add new elements to an array?',
        choices: ['push()', 'append()', 'addElement()', 'insert()'],
        correctAnswer: 'push()',
    }

];
    
    function mcStart() {
        startTime()
        displayQuestion()
    }

    

   
//below is the function to display each question. I used a for loop to go through each question and its corresponding answer choices. 
function displayQuestion() {
   const questionTitle = mcQuestions[mcIndex].question; 
   question.textContent = questionTitle; 
   
    const mcChoices = mcQuestions[mcIndex].choices;

    let mcChoicesEl = ''
   for (var i = 0; i < mcChoices.length; i++) {
         mcChoicesEl += `<li>${mcChoices[i]}</li>` //to creat the <li> element to display each question appropriately
         answerList.innerHTML = mcChoicesEl 
    // console.log(`Question: ${mcQuestions[i].question}`); //
    // console.log(`Choices: ${mcQuestions[i].choices}`);
    // console.log(`Correct Answer: ${mcQuestions[i].correctAnswer}`)
    } 

    answerList.addEventListener('click', function(event){ //event listener for when an answer choice is selected
        event.preventDefault() //to prevent the refresh page default of forms
        if (event.target.matches('li')) {
            console.log(event.target.textContent)
            mcChecker(event.target.textContent)
        }
    })
}

let result = '';

function mcChecker(mcContent) { //the function to check whether the question is answered correctly or incorrectly. 
    
    let userChoice = mcContent;
    const currentAnswer = mcQuestions[mcIndex].correctAnswer;
    console.log('check answer', userChoice, currentAnswer)

    if (userChoice === currentAnswer) { 
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
        clearInterval(timer); //to clear the timer so it will not go negative.

    }

    mcIndex++
    console.log(mcIndex)
    

    if (result === 'Correct!') { //boolean for recording user's points for answering a question correctly or incorrectly.
        mcScore.correctAnswers += 1; 
    } else if (result === "Incorrect!") {
        mcScore.incorrectAnswers += 1;
    }

        if (mcQuestions.length > mcIndex) { 
            displayQuestion()
        } else {
            clearInterval(timer) 
            gameOver()
        }
    
}



function updateTimerDisplay() {
    timerDisplay.textContent = timeLeft;
  
}

function startTime() { //function for quiz timer
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

function saveScores() { //function to save users' final scores that will be stored in local storage
    const initialsInput = document.querySelector('#initials')
    let user = initialsInput.value.trim()
    let highScores = JSON.parse(localStorage.getItem('highScores')) || [] //localStorage.getItem is being used to retreive users' scores--JSON.parse is used to convert the JSON string back into an object.
    let newScore = {
        user: user,
        mcScore: mcScore
    }

    highScores.push(newScore)
    localStorage.setItem('highScores', JSON.stringify(highScores)) //localStorage.setItem is being used to save users' scores in local storage--JSON.stringify is used to convert the object to a string so it can be saved in local storage. 
    endScreen.innerText = 'Score Saved!'
}

function viewHighScores() { //function for viewing high scores for present and past users.
    let scoreList = JSON.parse(localStorage.getItem('highScores')) || []
    let scoresElement = ''
    scoreList.forEach((score) => {
     scoresElement += `<div class='scoreLog'><p>${score.user}'s Score: Correct--${score.mcScore.correctAnswers} Incorrect--${score.mcScore.incorrectAnswers}</p></div>` 
     scoreBoard.innerHTML = scoresElement  
    });
}

viewHighScore.addEventListener('click', function(event) { //event listener for "View High Scores" button
    event.preventDefault()

    viewHighScores() 
    scoreBoard.classList.remove('hide')
})

submitBtn.addEventListener('click', saveScores) //event listener for submit button to save initials and scores

restartBtn.addEventListener('click', function(event) { //event listener for restart button
    event.preventDefault()
    document.location.reload()
}) 

startBtn.addEventListener('click', mcStart); //event listener for "begin quiz" button