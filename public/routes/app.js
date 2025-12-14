let questions = [];
let currentIndex = 0;
let score = 0;

// Decode HTML entities from Trivia API
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

async function loadQuiz() {
    try {
        const response = await fetch('/api/questions?amount=10');
        const data = await response.json();
        
        console.log('RAW API Response:', data); // See what we actually get
        console.log('First question:', data[0]); // See structure
        
        questions = data;
        showQuestion();
    } catch (err) {
        console.error('Failed to load quiz questions', err);
    }
}

function showQuestion() {
    if (currentIndex >= questions.length) {
        window.location.href = `results.html?score=${score}&total=${questions.length}`;
        return;
    }

    const q = questions[currentIndex];
    
    console.log('Current question object:', q);
    console.log('Question text:', q.question);
    console.log('Answers array:', q.answers);
    console.log('Correct answer:', q.correct);

    // Safety check
    if (!q.answers || !Array.isArray(q.answers)) {
        console.error('ERROR: answers is not an array!', q);
        return;
    }

    document.getElementById('question-number').textContent =
        `Question ${currentIndex + 1}/${questions.length}`;

    document.getElementById('question-text').textContent =
        decodeHTML(q.question);

    const buttons = document.querySelectorAll('.option-btn');
    
    console.log('Number of buttons:', buttons.length);
    console.log('Number of answers:', q.answers.length);

    // Populate buttons with answers
    q.answers.forEach((answer, index) => {
        if (buttons[index]) {
            buttons[index].textContent = 
                String.fromCharCode(65 + index) + ": " + decodeHTML(answer);
        }
    });
}

function selectAnswer(selectedIndex) {
    // Safety check
    if (!questions[currentIndex] || !questions[currentIndex].answers) {
        console.error('ERROR: Invalid question data');
        return;
    }
    
    const selectedAnswer = questions[currentIndex].answers[selectedIndex];

    if (selectedAnswer === questions[currentIndex].correct) {
        score++;
    }

    currentIndex++;
    showQuestion();
}

// Only run quiz on quiz.html
if (document.getElementById('quiz-container')) {
    loadQuiz();
}