const questions = [
    {
        question:"Qual o maior animal do mundo?",
        answers: [
           { id: 1, text: "Tubarão", correct:false},
           { id: 2, text: "Baleia Azul", correct:true},
           { id: 3, text: "Elefante", correct:false},
           { id: 4, text: "Girafa", correct:false},
        ]
    },
    {
        question:"Qual é o maior deserto do mundo?",
        answers: [
           { id: 1, text: "Kalahari", correct:false},
           { id: 2, text: "Gobi", correct:false},
           { id: 3, text: "Saara", correct:false},
           { id: 4, text: "Antartica", correct:true},
        ],
    },
    {
        question:"Qual é o maior país do mundo?",
        answers: [
           { id: 1, text: "Etados Unidos", correct:false},
           { id: 2, text: "Rússia", correct:true},
           { id: 3, text: "China", correct:false},
           { id: 4, text: "Brasil", correct:false},
        ],
    },
    {
        question:"Qual é o menor pais do mundo?",
        answers: [
           { id: 1, text: "Vaticano", correct:true},
           { id: 2, text: "Butão", correct:false},
           { id: 3, text: "Nepal", correct:false},
           { id: 4, text: "Shri Lanka", correct:false},
        ],
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Próxima"
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.dataset.id = answer.id;
        button.classList.add("btn");
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function selectAnswer (e) {
    answers = questions[currentQuestionIndex].answers;
    const correctAnswer = answers.filter((answer) => answer.correct == true)[0];

    const selectedBtn = e.target;
    const isCorrrect = selectedBtn.dataset.id == correctAnswer.id;
    if (isCorrrect) {
        selectedBtn.classList.add("correct");
        score ++;
    } else {
       selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `Você acertou ${score} de ${questions.length}!`;
    nextButton.innerHTML = "Tentar Novamente";
    nextButton.style.display = "block";
}

function handleNextButton () {
    currentQuestionIndex++;
     if (currentQuestionIndex < questions.length){
        showQuestion();
     } else {
        showScore();
     }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
         handleNextButton();
    } else {
        startQuiz ();
    }
})

startQuiz();