const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

const myQuestions = [
    {
        question: "Number of continents?",
        answers: {
            a: "6",
            b: "7",
            c: "5"
        },
        correctAnswer: "b"
    },
    {
        question: "How many dots appear on a pair of dice?",
        answers: {
            a: "52",
            b: "36",
            c: "42"
        },
        correctAnswer: "c"
    },
    {
        question: "How many minutes are in a full week?",
        answers: {
            a: "10,000",
            b: "11,245",
            c: "9,902",
            d: "10,080"
        },
        correctAnswer: "d"
        
    },
    {
        question: "Who was the Ancient Greek God of the Sun?",
        answers: {
            a: "Apllo",
            b: "Atlas",
            c: "Zeus",
            d: "Hades"
        },
        correctAnswer: "a"
        
    },
    {
        question: "What is the most common surname in the United States?",
        answers: {
            a: "Smith",
            b: "John",
            c: "Olivia",
            d: "Emma"
        },
        correctAnswer: "a"
        
    }
];


let currentSlide = 0;

// Build the quiz
function buildQuiz() {
    const output = myQuestions.map((currentQuestion, questionNumber) => {
        const answers = Object.keys(currentQuestion.answers)
            .map(letter => `
                <label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>
            `).join('');

        return `
            <div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers}</div>
            </div>
        `;
    }).join('');

    quizContainer.innerHTML = output;
}

// Show the results
function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selectedAnswer = (answerContainer.querySelector(`input[name=question${questionNumber}]:checked`) || {}).value;

        if (selectedAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainer.style.color = 'green';
        } else {
            answerContainer.style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length} correct`;
}

// Pagination
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;

    previousButton.style.display = currentSlide === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentSlide === slides.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentSlide === slides.length - 1 ? 'inline-block' : 'none';
}

function showNextSlide() {
    showSlide(currentSlide + 1);
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Initialize the quiz
buildQuiz();
showSlide(currentSlide);

// Event listeners
submitButton.addEventListener('click', showResults);
previousButton.addEventListener('click', showPreviousSlide);
nextButton.addEventListener('click', showNextSlide);

var timeLeft = 30;
var timer = setInterval(function() { 
  timeLeft--; 
  document.getElementById('timer').textContent = timeLeft; 
  if (timeLeft <= 0) { 
    clearInterval(timer); 
    alert('Time is up!'); 
  }
}, 1000);