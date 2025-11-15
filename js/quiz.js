// ===================================
// Canadian Style Learner - Quiz.js
// Updated to load quiz questions from JSON files
// ===================================

// ===== QUIZ STATE =====
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = {
    correct: 0,
    incorrect: 0,
    answers: []
};
let currentUser = null;
let userProgress = null;
let currentChapterId = 1; // Store the current chapter ID

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', async function() {
    const urlParams = new URLSearchParams(window.location.search);
    currentChapterId = parseInt(urlParams.get('id')) || 1;
    
    // Load user data
    currentUser = window.auth.getCurrentUser();
    if (currentUser) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Load quiz data from JSON
    await loadQuizData(currentChapterId);
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup navigation buttons
    setupNavigationButtons();
});

// Setup navigation buttons for "Back to Chapter"
function setupNavigationButtons() {
    // Get all "Back to Chapter" buttons
    const backToChapterButtons = [
        document.getElementById('backToChapterBtnTop'),
        document.getElementById('backToChapterBtnBottom1'),
        document.getElementById('backToChapterBtnTop2'),
        document.getElementById('backToChapterBtnBottom2'),
        document.getElementById('backToChapterBtnTop3'),
        document.getElementById('backToChapterBtnBottom3')
    ];
    
    // Add click event to all buttons
    backToChapterButtons.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                window.location.href = `chapter.html?id=${currentChapterId}`;
            });
        }
    });
}

// Load quiz data from JSON file
async function loadQuizData(chapterId) {
    try {
        // Pad chapter ID to two digits (01, 02, etc.)
        const paddedId = chapterId.toString().padStart(2, '0');
        
        // Fetch the quiz JSON file
        const response = await fetch(`data/quizzes/chapter-${paddedId}-quiz.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load quiz data: ${response.status}`);
        }
        
        // Parse JSON
        currentQuiz = await response.json();
        
        // Update UI with quiz info
        document.getElementById('chapterBadge').textContent = currentQuiz.chapterId;
        document.getElementById('quizTitle').textContent = `Chapter ${currentQuiz.chapterId} Quiz: ${currentQuiz.title}`;
        document.getElementById('quizDescription').textContent = `Test your knowledge with ${currentQuiz.questions.length} questions`;
        document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
        document.getElementById('totalQuestionsNum').textContent = currentQuiz.questions.length;
        
    } catch (error) {
        console.error('Error loading quiz data:', error);
        // Show error to user
        document.getElementById('startScreen').innerHTML = `
            <div class="quiz-card">
                <div class="error-message" style="padding: 2rem; text-align: center; background: #fee; border: 1px solid #c00; border-radius: 8px;">
                    <h2 style="color: #c00; margin-bottom: 1rem;">⚠️ Error Loading Quiz</h2>
                    <p style="margin-bottom: 1rem;">Unable to load quiz questions. Please try refreshing the page.</p>
                    <p style="color: #666; font-size: 0.9rem;"><strong>Error details:</strong> ${error.message}</p>
                    <button onclick="window.location.href='dashboard.html'" class="btn btn-secondary" style="margin-top: 1rem;">Back to Dashboard</button>
                </div>
            </div>
        `;
    }
}

// Setup event listeners
function setupEventListeners() {
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) startBtn.addEventListener('click', startQuiz);
    
    const submitBtn = document.getElementById('submitAnswerBtn');
    if (submitBtn) submitBtn.addEventListener('click', submitAnswer);
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
    
    const retakeBtn = document.getElementById('retakeQuizBtn');
    if (retakeBtn) retakeBtn.addEventListener('click', retakeQuiz);
    
    const completeBtn = document.getElementById('completeChapterBtn');
    if (completeBtn) completeBtn.addEventListener('click', completeChapter);
}

// ===== QUIZ FLOW =====
function startQuiz() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    
    currentQuestionIndex = 0;
    userAnswers = [];
    quizResults = { correct: 0, incorrect: 0, answers: [] };
    
    loadQuestion();
}

function loadQuestion() {
    if (!currentQuiz || !currentQuiz.questions || currentQuestionIndex >= currentQuiz.questions.length) {
        console.error('Invalid quiz state');
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const questionArea = document.getElementById('questionArea');
    
    document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quizProgressBar').style.width = progressPercent + '%';
    
    // Build question HTML
    let questionHTML = `
        <div class="question-header">
            <span class="question-badge">Question ${currentQuestionIndex + 1}</span>
            <span class="section-badge">Section ${question.section}</span>
        </div>
        <h3 class="question-text">${question.question}</h3>
        <div class="options-list">
    `;
    
    // Determine input type based on question type
    const inputType = (question.type === 'multiple') ? 'checkbox' : 'radio';
    
    // Add options
    question.options.forEach((option, index) => {
        questionHTML += `
            <label class="option-item">
                <input type="${inputType}" name="answer" value="${index}" />
                <span class="option-text">${option}</span>
            </label>
        `;
    });
    
    questionHTML += '</div>';
    questionArea.innerHTML = questionHTML;
    
    // Reset feedback and buttons
    document.getElementById('feedbackArea').style.display = 'none';
    document.getElementById('submitAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
}

function submitAnswer() {
    const question = currentQuiz.questions[currentQuestionIndex];
    let userAnswer = null;
    let isCorrect = false;
    
    if (question.type === 'multiple') {
        // Multiple choice question
        const selected = document.querySelectorAll('input[name="answer"]:checked');
        if (selected.length === 0) {
            alert('Please select at least one answer.');
            return;
        }
        userAnswer = Array.from(selected).map(el => parseInt(el.value)).sort();
        const correctAnswer = [...question.correctAnswer].sort();
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
        
    } else {
        // Single choice or true-false question
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert('Please select an answer.');
            return;
        }
        userAnswer = parseInt(selected.value);
        isCorrect = userAnswer === question.correctAnswer;
    }
    
    // Store answer
    userAnswers.push({ 
        questionId: question.id, 
        userAnswer, 
        correct: isCorrect 
    });
    
    // Update results
    if (isCorrect) {
        quizResults.correct++;
    } else {
        quizResults.incorrect++;
    }
    
    quizResults.answers.push({
        question: question.question,
        userAnswer,
        correctAnswer: question.correctAnswer,
        correct: isCorrect,
        explanation: question.explanation
    });
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Update buttons
    document.getElementById('submitAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
    
    // Disable all inputs
    document.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);
}

function showFeedback(isCorrect, question) {
    const feedbackArea = document.getElementById('feedbackArea');
    
    let feedbackHTML = `
        <div class="feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}">
            <div class="feedback-icon">${isCorrect ? '✓' : '✗'}</div>
            <div class="feedback-content">
                <h4>${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
                <p>${question.explanation}</p>
    `;
    
    // Show correct answer if user was wrong
    if (!isCorrect) {
        if (question.type === 'multiple') {
            const correctOptions = question.correctAnswer.map(idx => question.options[idx]);
            feedbackHTML += `<p class="correct-answer-label"><strong>Correct answers:</strong> ${correctOptions.join(', ')}</p>`;
        } else {
            feedbackHTML += `<p class="correct-answer-label"><strong>Correct answer:</strong> ${question.options[question.correctAnswer]}</p>`;
        }
    }
    
    feedbackHTML += '</div></div>';
    feedbackArea.innerHTML = feedbackHTML;
    feedbackArea.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    const scorePercent = Math.round((quizResults.correct / currentQuiz.questions.length) * 100);
    const passed = scorePercent >= 70;
    
    // Update results display
    document.getElementById('finalScore').textContent = scorePercent + '%';
    document.getElementById('correctAnswers').textContent = quizResults.correct;
    document.getElementById('incorrectAnswers').textContent = quizResults.incorrect;
    document.getElementById('scorePercent').textContent = scorePercent + '%';
    
    // Update results message
    const scoreCircle = document.getElementById('scoreCircle');
    if (passed) {
        scoreCircle.classList.add('pass');
        document.getElementById('resultsTitle').textContent = 'Congratulations! 🎉';
        document.getElementById('resultsMessage').textContent = `You scored ${scorePercent}% and passed the quiz!`;
    } else {
        scoreCircle.classList.remove('pass');
        document.getElementById('resultsTitle').textContent = 'Keep Practicing';
        document.getElementById('resultsMessage').textContent = `You scored ${scorePercent}%. You need 70% to pass. Review the material and try again.`;
    }
    
    // Build question-by-question results
    const detailsHTML = quizResults.answers.map((answer, index) => `
        <div class="result-item ${answer.correct ? 'correct' : 'incorrect'}">
            <div class="result-question">Question ${index + 1}: ${answer.question}</div>
            <div class="result-status ${answer.correct ? 'correct' : 'incorrect'}">
                ${answer.correct ? '✓ Correct' : '✗ Incorrect'}
            </div>
        </div>
    `).join('');
    
    document.getElementById('resultsDetails').innerHTML = `<h3>Question Results</h3>${detailsHTML}`;
    
    // Save quiz result if passed
    if (passed) {
        saveQuizResult(scorePercent);
    }
}

function saveQuizResult(score) {
    if (!currentUser || !userProgress) return;
    
    // Initialize quizzes object if needed
    if (!userProgress.quizzes) {
        userProgress.quizzes = {};
    }
    
    // Save quiz result
    userProgress.quizzes[currentQuiz.chapterId] = {
        score: score,
        passed: score >= 70,
        completedAt: new Date().toISOString()
    };
    
    window.auth.saveUserProgress(currentUser.email, userProgress);
}

function retakeQuiz() {
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('startScreen').style.display = 'block';
}

function completeChapter() {
    if (!currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    if (!userProgress) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Initialize chapter progress if needed
    if (!userProgress.chapters[currentQuiz.chapterId]) {
        userProgress.chapters[currentQuiz.chapterId] = { 
            completed: false, 
            sections: [] 
        };
    }
    
    // Mark chapter as completed
    userProgress.chapters[currentQuiz.chapterId].completed = true;
    userProgress.chapters[currentQuiz.chapterId].completedAt = new Date().toISOString();
    
    window.auth.saveUserProgress(currentUser.email, userProgress);
    
    // Navigate to dashboard
    window.location.href = 'dashboard.html';
}
