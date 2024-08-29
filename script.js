const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('feedback');
const timerElement = document.getElementById('time');
const resultContainer = document.getElementById('result');
const finalScoreElement = document.getElementById('final-score');
const quizHeader = document.getElementById('quiz-header');
const quiz = document.getElementById('quiz');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft;
let timerInterval;
let selectedCategory;
let selectedDifficulty;

const questions = {
    categoria1: {
        easy: [
            { question: 'Qual a capital do Brasil?', answers: [{ text: 'Brasília', correct: true }, { text: 'São Paulo', correct: false }, { text: 'Rio de Janeiro', correct: false }, { text: 'Belo horizonte', correct: false }] },
            { question: 'Qual a capital da Agentina?', answers: [{ text: 'Roma', correct: false }, { text: 'Buenos Aires', correct: true }, { text: 'Toronto', correct: false }, { text: 'La Paz', correct: false }] },
        ],
        medium: [
            { question: 'Qual a capital da Bélgica?', answers: [{ text: 'Abu Dabi', correct: false }, { text: 'Bruxelas', correct: true }, { text: 'Berlim', correct: false }, { text: 'Helsinque', correct: false }] },
            { question: 'Qual a capital da Alemanha?', answers: [{ text: 'Berlim', correct: true }, { text: 'Brigetown', correct: false }, { text: 'Nassau', correct: false }, { text: 'Copenhague', correct: false }] },
            { question: 'Qual a capital da Espanha?', answers: [{ text: 'Luanda', correct: false }, { text: 'Caracas', correct: false }, { text: 'Madrid', correct: true }, { text: 'Cairo', correct: false }] },
            { question: 'Qual a capital do Equador?', answers: [{ text: 'La Paz', correct: false }, { text: 'Buenos Aires', correct: false }, { text: 'Santiago', correct: false }, { text: 'Quito', correct: true }] },
        ],
        hard: [
            { question: 'Pergunta difícil 1', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: true }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 2', answers: [{ text: 'Resposta 1', correct: true }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 3', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: true }] },
            { question: 'Pergunta difícil 4', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 5', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: true }] },
            { question: 'Pergunta difícil 6', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
        ]
    },
    categoria2: {
        easy: [
            { question: 'Pergunta fácil 1', answers: [{ text: 'Resposta 1', correct: true }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta fácil 2', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
        ],
        medium: [
            { question: 'Pergunta média 1', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta média 2', answers: [{ text: 'Resposta 1', correct: true }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta média 3', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: true }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta média 4', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: true }] },
        ],
        hard: [
            { question: 'Pergunta difícil 1', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: true }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 2', answers: [{ text: 'Resposta 1', correct: true }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 3', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: true }] },
            { question: 'Pergunta difícil 4', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
            { question: 'Pergunta difícil 5', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: false }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: true }] },
            { question: 'Pergunta difícil 6', answers: [{ text: 'Resposta 1', correct: false }, { text: 'Resposta 2', correct: true }, { text: 'Resposta 3', correct: false }, { text: 'Resposta 4', correct: false }] },
        ]
    }
};

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartGame);

function startGame() {
    startButton.classList.add('hide');
    quizHeader.classList.add('hide');
    quiz.classList.remove('hide');
    selectedCategory = document.getElementById('category').value;
    selectedDifficulty = document.getElementById('difficulty').value;
    shuffledQuestions = questions[selectedCategory][selectedDifficulty];
    currentQuestionIndex = 0;
    score = 0;
    setNextQuestion();
    startTimer();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (correct) {
        score++;
        feedbackElement.innerText = 'Correto!';
    } else {
        feedbackElement.innerText = 'Errado!';
    }
    feedbackElement.classList.remove('hide');
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        resultContainer.classList.remove('hide');
        quiz.classList.add('hide');
        finalScoreElement.innerText = `Você acertou ${score} de ${shuffledQuestions.length}`;
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    timeLeft = 30;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedbackElement.innerText = 'Tempo esgotado!';
            feedbackElement.classList.remove('hide');
            Array.from(answerButtonsElement.children).forEach(button => {
                button.disabled = true;
            });
            nextButton.classList.remove('hide');
        }
    }, 1000);
}

function restartGame() {
    resultContainer.classList.add('hide');
    quizHeader.classList.remove('hide');
    startButton.classList.remove('hide');
}
