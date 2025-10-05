// ===================================
// Canadian Style Learner - Quiz.js
// ===================================

// Quiz state
let currentChapterId = 1;
let quizData = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let currentUser = null;
let userProgress = null;

// Initialize quiz
document.addEventListener('DOMContentLoaded', function() {
    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    currentChapterId = parseInt(urlParams.get('id')) || 1;
    
    // Load user data
    currentUser = window.auth.getCurrentUser();
    if (currentUser) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Load quiz data
    loadQuizData(currentChapterId);
    
    // Setup event listeners
    setupEventListeners();
});

// Load quiz data
function loadQuizData(chapterId) {
    // In production, this would load from quiz-01-data.json
    // For now, using inline data
    quizData = {
        chapterId: 1,
        title: "Abbreviations",
        questions: [
            {
                id: 1,
                type: "single",
                question: "What is the correct way to use an abbreviation for the first time in a document?",
                options: [
                    "Use the abbreviation without explanation",
                    "Write the full term followed by the abbreviation in parentheses",
                    "Write only the full term",
                    "Use the abbreviation followed by the full term"
                ],
                correctAnswer: 1,
                explanation: "When using an abbreviation for the first time, write the full term followed by the abbreviation in parentheses. For example: 'The Canadian Broadcasting Corporation (CBC)'."
            },
            {
                id: 2,
                type: "true-false",
                question: "SI/metric symbols should always take a plural 's' when representing multiple units.",
                options: ["True", "False"],
                correctAnswer: 1,
                explanation: "False. SI/metric symbols maintain the same form for both singular and plural. For example: '5 cm' not '5 cms', and '75 kg' not '75 kgs'."
            },
            {
                id: 3,
                type: "single",
                question: "Which of the following is the correct plural form of 'Mr.'?",
                options: [
                    "Mr.s",
                    "Mrs.",
                    "Messrs.",
                    "Misters"
                ],
                correctAnswer: 2,
                explanation: "The plural of 'Mr.' is 'Messrs.' This is an irregular plural form."
            },
            {
                id: 4,
                type: "multiple",
                question: "When should you avoid using abbreviations? (Select all that apply)",
                options: [
                    "When writing for a general audience",
                    "When the abbreviation appears only once in the document",
                    "In technical documents where space is limited",
                    "When it creates ambiguity or confusion"
                ],
                correctAnswers: [0, 1, 3],
                explanation: "You should avoid abbreviations when writing for a general audience, when the abbreviation appears only once, or when it creates confusion. However, abbreviations are appropriate in technical documents where space is limited."
            },
            {
                id: 5,
                type: "true-false",
                question: "It is acceptable to start a sentence with an abbreviation like 'Dr.' or 'Mr.'",
                options: ["True", "False"],
                correctAnswer: 1,
                explanation: "False. Generally, you should not begin a sentence with an abbreviation. Either spell out the word or restructure the sentence. However, some exceptions exist for titles when restructuring would be awkward."
            },
            {
                id: 6,
                type: "single",
                question: "How should periods be used with the abbreviation 'Ph. D.'?",
                options: [
                    "No periods needed",
                    "Periods after each letter with spaces: P. h. D.",
                    "Periods after each abbreviated word: Ph. D.",
                    "One period at the end: Ph D."
                ],
                correctAnswer: 2,
                explanation: "Use periods after each abbreviated word in multi-word terms. So it's written as 'Ph. D.' (or commonly 'Ph.D.' without the space)."
            },
            {
                id: 7,
                type: "single",
                question: "What is the standard plural form of most abbreviations?",
                options: [
                    "Add apostrophe + s (MP's)",
                    "Add s without apostrophe (MPs)",
                    "Keep the same form (MP)",
                    "Double the last letter (MPP)"
                ],
                correctAnswer: 1,
                explanation: "For most abbreviations, add 's' without an apostrophe to form the plural. For example: MPs, PCBs, CAs."
            },
            {
                id: 8,
                type: "multiple",
                question: "Which Latin abbreviations are commonly used in English writing? (Select all that are mentioned)",
                options: [
                    "e.g. (for example)",
                    "i.e. (that is)",
                    "etc. (and so forth)",
                    "q.e.d. (which was to be demonstrated)"
                ],
                correctAnswers: [0, 1, 2],
                explanation: "The chapter mentions e.g. (exempli gratia - for example), i.e. (id est - that is), and etc. (et cetera - and so forth) as common Latin abbreviations."
            },
            {
                id: 9,
                type: "true-false",
                question: "When using someone's academic degree, you should also use their title (e.g., 'Dr. John Smith, Ph.D.').",
                options: ["True", "False"],
                correctAnswer: 1,
                explanation: "False. You should not use both a title (Dr., Mr., etc.) and an academic degree abbreviation. Use either 'Dr. John Smith' OR 'John Smith, Ph.D.', but not both together."
            },
            {
                id: 10,
                type: "single",
                question: "Which is the correct way to abbreviate 'British Columbia' in a formal document?",
                options: [
                    "Always use 'BC' throughout the text",
                    "Spell out 'British Columbia' in running text, use 'BC' in addresses",
                    "Use 'B.C.' with periods",
                    "Either abbreviation is acceptable anywhere"
                ],
                correctAnswer: 1,
                explanation: "In formal documents, spell out province and territory names in running text. Use abbreviations like 'BC' primarily in addresses, tables, and lists."
            }
        ]
    };
    
    // Update UI
    document.getElementById('chapterBadge').textContent = currentChapterId;
    document.getElementById('quizTitle').textContent = `Chapter ${currentChapterId} Quiz: ${quizData.title}`;
    document.getElementById('totalQuestions').textContent = quizData.questions.length;
    document.getElementById('totalQuestionsNum').textContent = quizData.questions.length;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('startQuizBtn').onclick = startQuiz;
    document.getElementById('submitAnswerBtn').onclick = submitAnswer;
    document.getElementById('nextQuestionBtn').onclick = nextQuestion;
    document.getElementById('retakeQuizBtn').onclick = retakeQuiz;
    document.getElementById('completeChapterBtn').onclick = completeChapter;
}

// Start quiz
function startQuiz() {
    // Reset state
    currentQuestionIndex = 0;
    userAnswers = [];
    quizScore = 0;
    
    // Show question screen
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('questionScreen').style.display = 'block';
    
    // Load first question
    loadQuestion(0);
}

// Load question
function loadQuestion(index) {
    currentQuestionIndex = index;
    const question = quizData.questions[index];
    
    // Update progress
    updateQuizProgress();
    
    // Render question
    renderQuestion(question);
    
    // Hide feedback
    document.getElementById('feedbackArea').style.display = 'none';
    
    // Reset buttons
    document.getElementById('submitAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
}

// Render question
function renderQuestion(question) {
    const questionArea = document.getElementById('questionArea');
    
    let optionsHTML = '';
    
    if (question.type === 'single' || question.type === 'true-false') {
        // Single choice or True/False
        optionsHTML = '<div class="answer-options">';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <button class="answer-option" data-index="${index}">
                    <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                </button>
            `;
        });
        optionsHTML += '</div>';
    } else if (question.type === 'multiple') {
        // Multiple select
        optionsHTML = '<div class="answer-options">';
        question.options.forEach((option, index) => {
            optionsHTML += `
                <label class="answer-option" data-index="${index}">
                    <input type="checkbox" data-index="${index}">
                    <div class="option-letter">${String.fromCharCode(65 + index)}</div>
                    <div class="option-text">${option}</div>
                </label>
            `;
        });
        optionsHTML += '</div>';
    }
    
    questionArea.innerHTML = `
        <div class="question-type-badge">${getQuestionTypeName(question.type)}</div>
        <h3 class="question-text">${question.question}</h3>
        ${optionsHTML}
    `;
    
    // Add click handlers
    if (question.type === 'single' || question.type === 'true-false') {
        document.querySelectorAll('.answer-option').forEach(option => {
            option.onclick = function() {
                // Remove selected from all
                document.querySelectorAll('.answer-option').forEach(o => o.classList.remove('selected'));
                // Add selected to clicked
                this.classList.add('selected');
            };
        });
    }
}

// Get question type name
function getQuestionTypeName(type) {
    const types = {
        'single': 'Single Choice',
        'multiple': 'Multiple Select',
        'true-false': 'True/False'
    };
    return types[type] || type;
}

// Update quiz progress
function updateQuizProgress() {
    const current = currentQuestionIndex + 1;
    const total = quizData.questions.length;
    const percent = Math.round((current / total) * 100);
    
    document.getElementById('currentQuestionNum').textContent = current;
    document.getElementById('quizProgressBar').style.width = percent + '%';
}

// Submit answer
function submitAnswer() {
    const question = quizData.questions[currentQuestionIndex];
    let selectedAnswer = null;
    let isCorrect = false;
    
    if (question.type === 'single' || question.type === 'true-false') {
        // Get selected option
        const selected = document.querySelector('.answer-option.selected');
        if (!selected) {
            alert('Please select an answer before submitting.');
            return;
        }
        
        selectedAnswer = parseInt(selected.getAttribute('data-index'));
        isCorrect = selectedAnswer === question.correctAnswer;
        
        // Mark correct/incorrect
        document.querySelectorAll('.answer-option').forEach((option, index) => {
            option.classList.add('disabled');
            if (index === question.correctAnswer) {
                option.classList.add('correct');
            }
            if (index === selectedAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
    } else if (question.type === 'multiple') {
        // Get selected checkboxes
        const checkboxes = document.querySelectorAll('.answer-option input[type="checkbox"]:checked');
        if (checkboxes.length === 0) {
            alert('Please select at least one answer before submitting.');
            return;
        }
        
        selectedAnswer = Array.from(checkboxes).map(cb => parseInt(cb.getAttribute('data-index')));
        
        // Check if arrays match
        isCorrect = arraysEqual(selectedAnswer.sort(), question.correctAnswers.sort());
        
        // Mark correct/incorrect
        document.querySelectorAll('.answer-option').forEach((option, index) => {
            const checkbox = option.querySelector('input[type="checkbox"]');
            checkbox.disabled = true;
            
            if (question.correctAnswers.includes(index)) {
                option.classList.add('correct');
            }
            if (selectedAnswer.includes(index) && !question.correctAnswers.includes(index)) {
                option.classList.add('incorrect');
            }
        });
    }
    
    // Save answer
    userAnswers.push({
        questionId: question.id,
        selectedAnswer: selectedAnswer,
        correct: isCorrect
    });
    
    // Update score
    if (isCorrect) {
        quizScore++;
    }
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Update buttons
    document.getElementById('submitAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
}

// Show feedback
function showFeedback(isCorrect, question) {
    const feedbackArea = document.getElementById('feedbackArea');
    feedbackArea.className = 'feedback-area ' + (isCorrect ? 'correct' : 'incorrect');
    
    let correctAnswerText = '';
    if (!isCorrect) {
        if (question.type === 'multiple') {
            const correctOptions = question.correctAnswers.map(i => 
                String.fromCharCode(65 + i) + ': ' + question.options[i]
            ).join(', ');
            correctAnswerText = `<p class="correct-answer-label">Correct answers: ${correctOptions}</p>`;
        } else {
            correctAnswerText = `<p class="correct-answer-label">Correct answer: ${String.fromCharCode(65 + question.correctAnswer)}: ${question.options[question.correctAnswer]}</p>`;
        }
    }
    
    feedbackArea.innerHTML = `
        <div class="feedback-header">
            <span class="feedback-icon">${isCorrect ? '✓' : '✗'}</span>
            <h4 class="feedback-title">${isCorrect ? 'Correct!' : 'Incorrect'}</h4>
        </div>
        <p class="feedback-explanation">${question.explanation}</p>
        ${correctAnswerText}
    `;
    
    feedbackArea.style.display = 'block';
}

// Next question
function nextQuestion() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
        loadQuestion(currentQuestionIndex + 1);
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    const totalQuestions = quizData.questions.length;
    const scorePercent = Math.round((quizScore / totalQuestions) * 100);
    const passed = scorePercent >= 70;
    
    // Update results UI
    document.getElementById('finalScore').textContent = scorePercent;
    document.getElementById('correctAnswers').textContent = quizScore;
    document.getElementById('incorrectAnswers').textContent = totalQuestions - quizScore;
    document.getElementById('scorePercent').textContent = scorePercent + '%';
    
    const scoreCircle = document.getElementById('scoreCircle');
    if (passed) {
        scoreCircle.classList.add('pass');
    }
    
    // Results message
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsMessage = document.getElementById('resultsMessage');
    
    if (passed) {
        resultsTitle.textContent = 'Excellent Work!';
        resultsMessage.textContent = `You passed with ${scorePercent}%! You've demonstrated a strong understanding of abbreviations in Canadian English.`;
    } else {
        resultsTitle.textContent = 'Keep Practicing';
        resultsMessage.textContent = `You scored ${scorePercent}%. Review the material and try again to reach the 70% passing score.`;
    }
    
    // Show question breakdown
    renderResultsBreakdown();
    
    // Save quiz results
    saveQuizResults(scorePercent, passed);
    
    // Show results screen
    document.getElementById('questionScreen').style.display = 'none';
    document.getElementById('resultsScreen').style.display = 'block';
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Render results breakdown
function renderResultsBreakdown() {
    const detailsContainer = document.getElementById('resultsDetails');
    
    let html = '<h3>Question Breakdown</h3>';
    
    quizData.questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer.correct;
        
        html += `
            <div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">
                <div class="result-status ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                </div>
                <div class="result-question">
                    ${index + 1}. ${question.question}
                </div>
            </div>
        `;
    });
    
    detailsContainer.innerHTML = html;
}

// Save quiz results
function saveQuizResults(score, passed) {
    if (!currentUser || !userProgress) return;
    
    // Initialize quizzes object if needed
    if (!userProgress.quizzes) {
        userProgress.quizzes = {};
    }
    
    // Save quiz data
    const quizResult = {
        chapterId: currentChapterId,
        score: score,
        passed: passed,
        attempts: (userProgress.quizzes[currentChapterId]?.attempts || 0) + 1,
        date: new Date().toISOString(),
        answers: userAnswers
    };
    
    // Update best score
    if (!userProgress.quizzes[currentChapterId] || score > userProgress.quizzes[currentChapterId].bestScore) {
        quizResult.bestScore = score;
    } else {
        quizResult.bestScore = userProgress.quizzes[currentChapterId].bestScore;
    }
    
    userProgress.quizzes[currentChapterId] = quizResult;
    
    // Update stats
    userProgress.stats.totalQuizzesTaken = Object.keys(userProgress.quizzes).length;
    
    // Save to localStorage
    window.auth.saveUserProgress(currentUser.email, userProgress);
}

// Complete chapter
function completeChapter() {
    if (!currentUser || !userProgress) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Mark chapter as completed
    if (!userProgress.chapters[currentChapterId]) {
        userProgress.chapters[currentChapterId] = {};
    }
    
    userProgress.chapters[currentChapterId].completed = true;
    userProgress.chapters[currentChapterId].completedAt = new Date().toISOString();
    
    // Update stats
    const completedChapters = Object.values(userProgress.chapters).filter(c => c.completed).length;
    userProgress.stats.totalChaptersCompleted = completedChapters;
    userProgress.stats.overallProgress = Math.round((completedChapters / 16) * 100);
    
    // Save progress
    window.auth.saveUserProgress(currentUser.email, userProgress);
    
    // Redirect to dashboard
    window.location.href = 'dashboard.html';
}

// Retake quiz
function retakeQuiz() {
    // Hide results
    document.getElementById('resultsScreen').style.display = 'none';
    
    // Restart quiz
    startQuiz();
}

// Helper function to compare arrays
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}