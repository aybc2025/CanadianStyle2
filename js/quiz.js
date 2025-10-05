// ===================================
// Canadian Style Learner - Quiz.js
// COMPLETE VERSION - FIXED
// ===================================

// ===== QUIZ DATA =====
const chapter1ExpandedQuiz = {
    chapterId: 1,
    title: "Abbreviations",
    questions: [
        {
            id: 1,
            section: "1.02",
            type: "single",
            question: "What is the correct way to introduce an abbreviation for the first time in a document?",
            options: [
                "Use the abbreviation without explanation",
                "Write the full term followed by the abbreviation in parentheses",
                "Write only the full term",
                "Use the abbreviation followed by the full term in brackets"
            ],
            correctAnswer: 1,
            explanation: "When using an abbreviation for the first time, write the full term followed by the abbreviation in parentheses. Example: The Canadian Broadcasting Corporation (CBC) announced..."
        },
        {
            id: 2,
            section: "1.03",
            type: "true-false",
            question: "Abbreviations of single words generally take periods (e.g., govt., dept., Sept.).",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation: "True. Abbreviations of single words generally take periods. Examples include govt., dept., Sept., etc."
        },
        {
            id: 3,
            section: "1.04",
            type: "single",
            question: "What is the correct plural form of 'p.' (page)?",
            options: ["p.s", "ps.", "pp.", "p.'s"],
            correctAnswer: 2,
            explanation: "The correct plural of p. (page) is pp. (pages). Other examples: l. → ll. (lines), f. → ff. (following pages)."
        },
        {
            id: 4,
            section: "1.04",
            type: "true-false",
            question: "SI/metric symbols should take a plural 's' when representing multiple units (e.g., 5 cms, 75 kgs).",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. SI/metric symbols maintain the same form for both singular and plural: 5 cm (not 5 cms), 75 kg (not 75 kgs)."
        },
        {
            id: 5,
            section: "1.06",
            type: "single",
            question: "What is the correct plural form of 'Mr.'?",
            options: ["Mr.s", "Mrs.", "Messrs.", "Misters"],
            correctAnswer: 2,
            explanation: "The plural of Mr. is Messrs. This is used when addressing multiple men. Similarly, the plural of Mrs. is Mmes."
        },
        {
            id: 6,
            section: "1.07",
            type: "single",
            question: "How should you write a military rank like 'Lieutenant-Colonel'?",
            options: ["Lt. Col.", "Lt.-Col.", "LtCol", "Lt Col"],
            correctAnswer: 1,
            explanation: "Military ranks with hyphens in the full form retain the hyphen in abbreviation: Lt.-Col. (Lieutenant-Colonel), Lt.-Cmdr. (Lieutenant-Commander)."
        },
        {
            id: 7,
            section: "1.08",
            type: "true-false",
            question: "It is correct to write 'Dr. Jane Smith, Ph.D.' when listing someone with a doctorate.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Use either the title (Dr. Jane Smith) OR the degree (Jane Smith, Ph.D.), but not both together. They represent the same credential."
        },
        {
            id: 8,
            section: "1.09",
            type: "single",
            question: "How should you write 'British Columbia' in formal body text?",
            options: [
                "Always use BC",
                "Spell out British Columbia in running text, use BC in addresses",
                "Use B.C. with periods",
                "Either abbreviation is acceptable anywhere"
            ],
            correctAnswer: 1,
            explanation: "In formal documents, spell out province and territory names in running text. Use abbreviations like BC primarily in addresses, tables, and lists."
        },
        {
            id: 9,
            section: "1.10",
            type: "single",
            question: "What is the correct way to abbreviate 'Street' in an address?",
            options: ["Str.", "St.", "Strt.", "S."],
            correctAnswer: 1,
            explanation: "The standard abbreviation for Street in addresses is St. Other common abbreviations: Ave. (Avenue), Rd. (Road), Blvd. (Boulevard)."
        },
        {
            id: 10,
            section: "1.11",
            type: "single",
            question: "How should degrees of latitude be written?",
            options: ["45 degrees N", "45° N.", "45°N", "45 deg. N"],
            correctAnswer: 2,
            explanation: "Latitude and longitude are written with the degree symbol directly attached to the number, followed by the direction with no space: 45°N, 75°W."
        },
        {
            id: 11,
            section: "1.12",
            type: "single",
            question: "What is the correct abbreviation for 'chapter' when citing specific chapters?",
            options: ["chapt.", "chap.", "ch.", "c."],
            correctAnswer: 2,
            explanation: "The standard abbreviation for chapter is ch. or c. Example: See ch. 3, p. 45."
        },
        {
            id: 12,
            section: "1.13",
            type: "single",
            question: "What does the abbreviation 'i.e.' mean?",
            options: ["for example", "that is", "and so forth", "compare"],
            correctAnswer: 1,
            explanation: "i.e. means 'that is' (Latin: id est). It's used to clarify or rephrase. For 'for example,' use e.g. (exempli gratia)."
        },
        {
            id: 13,
            section: "1.13",
            type: "multiple",
            question: "Which of the following Latin abbreviations are used correctly? (Select all that apply)",
            options: [
                "The document was written circa 1850 (c. 1850)",
                "The report discusses three topics, i.e., climate, economy, and health",
                "See the reference (cf. Smith, 2020)",
                "The study found significant results, e.g. improved performance"
            ],
            correctAnswer: [0, 2, 3],
            explanation: "Correct uses: c. (circa) for 'approximately', cf. (confer) for 'compare', e.g. (exempli gratia) for 'for example'. However, i.e. means 'that is' (for clarification), not for listing multiple examples - that should be e.g."
        },
        {
            id: 14,
            section: "1.14",
            type: "true-false",
            question: "Scientific abbreviations like DNA, RNA, and DNA should be spelled out on first use.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Well-established scientific abbreviations like DNA, RNA, pH, and IQ are so widely recognized that they don't need to be spelled out."
        },
        {
            id: 15,
            section: "1.15",
            type: "single",
            question: "How should you write a company name like 'General Motors Corporation'?",
            options: [
                "Always abbreviate to GMC",
                "Write the full name on first use, then use the abbreviation",
                "Use GM Corp.",
                "Always write the full name"
            ],
            correctAnswer: 1,
            explanation: "For corporate names, write the full legal name on first mention, followed by any commonly used abbreviation in parentheses, then use the abbreviation in subsequent references."
        },
        {
            id: 16,
            section: "1.16",
            type: "single",
            question: "What is the difference between an acronym and an initialism?",
            options: [
                "There is no difference; they are the same thing",
                "Acronyms are pronounced as words (NATO), initialisms are pronounced letter by letter (FBI)",
                "Acronyms use periods, initialisms don't",
                "Initialisms are only used for organizations"
            ],
            correctAnswer: 1,
            explanation: "Acronyms are pronounced as words (NATO, radar, scuba), while initialisms are pronounced letter by letter (FBI, CBC, RCMP)."
        },
        {
            id: 17,
            section: "1.16",
            type: "true-false",
            question: "It is correct to write 'Enter your PIN number' when asking for a personal identification number.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. This creates redundancy since PIN already means 'Personal Identification Number.' Write either 'Enter your PIN' or 'Enter your personal identification number,' but not both."
        },
        {
            id: 18,
            section: "1.17",
            type: "single",
            question: "How should you abbreviate 'numbers' in body text?",
            options: ["Use # symbol", "Use No. or Nos.", "Use Num. or Nums.", "Use N or Ns"],
            correctAnswer: 1,
            explanation: "In body text, use No. for 'number' and Nos. for 'numbers.' The # symbol is reserved for tabular and statistical material. Example: Nos. 56-86 are missing."
        },
        {
            id: 19,
            section: "1.17",
            type: "single",
            question: "When should you use the % symbol instead of spelling out 'percent'?",
            options: [
                "Always use % to save space",
                "Use % in technical, financial, and statistical documents",
                "Never use %; always spell out 'percent'",
                "Only use % in charts and graphs"
            ],
            correctAnswer: 1,
            explanation: "Use the % symbol in economic, financial, statistical, or technical documents where figures are abundant. In general text, spell out 'percent' except when used adjectivally (e.g., a 15% bond)."
        },
        {
            id: 20,
            section: "1.18",
            type: "true-false",
            question: "The ampersand (&) should be used in federal department names like 'Public Works & Government Services.'",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Do NOT use the ampersand in federal department names. Write 'Public Works and Government Services.' Use & only when it's part of an official corporate name (e.g., AT&T, Smith & Jones)."
        },
        {
            id: 21,
            section: "1.19",
            type: "single",
            question: "How should you distinguish Canadian dollars from US dollars in a document?",
            options: [
                "Use $ for both and clarify in text",
                "Use C$ or CAN$ for Canadian, US$ for American",
                "Use CDN$ and USD$",
                "Always spell out the currency"
            ],
            correctAnswer: 1,
            explanation: "Use C$ or CAN$ for Canadian dollars and US$ for US dollars when you need to distinguish between currencies. Example: The loan will be repaid in instalments of C$650 each."
        },
        {
            id: 22,
            section: "1.20",
            type: "multiple",
            question: "Which statements about abbreviating months are correct? (Select all that apply)",
            options: [
                "Always spell out month names in body text and footnotes",
                "May should never be abbreviated",
                "June and July are abbreviated only in military writing",
                "All months can be abbreviated in tables and forms"
            ],
            correctAnswer: [0, 1, 2],
            explanation: "All statements are correct: spell out months in body text and footnotes; May is never abbreviated; June and July are shortened only in military writing; most months can be abbreviated in tables and forms."
        },
        {
            id: 23,
            section: "1.21",
            type: "single",
            question: "What is the correct format for elapsed time?",
            options: [
                "2 hours, 30 minutes, 21 seconds",
                "2:30:21",
                "2h 30m 21s",
                "2-30-21"
            ],
            correctAnswer: 1,
            explanation: "For elapsed time, use colons with no spaces: 2:30:21 (hours:minutes:seconds). You can add decimal fractions: 2:30:21.65 (hours:minutes:seconds.tenths.hundredths)."
        },
        {
            id: 24,
            section: "1.22",
            type: "single",
            question: "How should time zone abbreviations be written?",
            options: [
                "Use lowercase with periods: e.s.t.",
                "Use capitals with periods: E.S.T.",
                "Use capitals without periods: EST",
                "Spell them out: Eastern Standard Time"
            ],
            correctAnswer: 2,
            explanation: "Time zones are abbreviated with capitals and no periods when used with specific times: 4:30 p.m. EST. When not with a specific time, spell them out: Pacific standard time."
        },
        {
            id: 25,
            section: "1.23",
            type: "single",
            question: "What is the correct spacing for SI/metric symbols?",
            options: [
                "No space: 45kg, 32°C",
                "Space for all: 45 kg, 32 °C",
                "Space for letter-only symbols (45 kg), no space when including non-letters (32°C)",
                "Space only for temperature: 45kg, 32 °C"
            ],
            correctAnswer: 2,
            explanation: "Leave a full space between quantity and symbol when the symbol is all letters (45 kg). Leave no space when the symbol includes non-letter characters (32°C, 45°)."
        },
        {
            id: 26,
            section: "1.23",
            type: "single",
            question: "What does the prefix 'kilo' (k) represent in the SI system?",
            options: ["10²", "10³", "10⁶", "10⁹"],
            correctAnswer: 1,
            explanation: "Kilo (k) represents 10³ or 1,000. Other common prefixes: mega (M) = 10⁶, giga (G) = 10⁹, milli (m) = 10⁻³, micro (μ) = 10⁻⁶."
        },
        {
            id: 27,
            section: "1.23",
            type: "single",
            question: "Which derived SI unit is used to measure pressure?",
            options: ["newton (N)", "pascal (Pa)", "joule (J)", "watt (W)"],
            correctAnswer: 1,
            explanation: "Pascal (Pa) is the SI unit for pressure and stress. Newton (N) is force, joule (J) is energy, and watt (W) is power."
        },
        {
            id: 28,
            section: "1.23",
            type: "single",
            question: "What is the correct way to write 'kilometres per hour'?",
            options: ["kmh or kph", "km/h", "k/h", "km-h"],
            correctAnswer: 1,
            explanation: "When combining SI symbols with time or division, use an oblique (/): km/h (not kmh or kph). Other examples: r/min (not rpm), J/kg (not Jkg)."
        },
        {
            id: 29,
            section: "1.24",
            type: "single",
            question: "How should you write 'square feet' using imperial abbreviations?",
            options: ["ft²", "sq. ft.", "sq.ft", "sqft"],
            correctAnswer: 1,
            explanation: "In the imperial system, use 'sq.' for square and 'cu.' for cubic, with a space before the unit: 100 sq. ft., 20 cu. yd. Note the space between sq./cu. and the following abbreviation."
        },
        {
            id: 30,
            section: "1.25",
            type: "multiple",
            question: "Which business abbreviations are appropriate for use in tables and forms? (Select all that apply)",
            options: [
                "CEO (chief executive officer)",
                "qty. (quantity)",
                "recd. (received)",
                "V.P. (vice-president)"
            ],
            correctAnswer: [0, 1, 2, 3],
            explanation: "All of these are appropriate business abbreviations for tables and forms: CEO, qty., recd., V.P. However, in formal business letters, spell out these terms fully."
        }
    ]
};

// ===== QUIZ STATE =====
let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = {
    correct: 0,
    incorrect: 0,
    answers: []
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = parseInt(urlParams.get('id')) || 1;
    
    loadQuizData(chapterId);
    setupEventListeners();
});

function loadQuizData(chapterId) {
    if (chapterId === 1) {
        currentQuiz = chapter1ExpandedQuiz;
        document.getElementById('chapterBadge').textContent = chapterId;
        document.getElementById('quizTitle').textContent = `Chapter ${chapterId} Quiz: ${currentQuiz.title}`;
        document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
        document.getElementById('totalQuestionsNum').textContent = currentQuiz.questions.length;
    }
}

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
    const question = currentQuiz.questions[currentQuestionIndex];
    const questionArea = document.getElementById('questionArea');
    
    document.getElementById('currentQuestionNum').textContent = currentQuestionIndex + 1;
    const progressPercent = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    document.getElementById('quizProgressBar').style.width = progressPercent + '%';
    
    let questionHTML = `
        <div class="question-header">
            <span class="question-badge">Question ${currentQuestionIndex + 1}</span>
            <span class="section-badge">Section ${question.section}</span>
        </div>
        <h3 class="question-text">${question.question}</h3>
        <div class="options-list">
    `;
    
    const inputType = (question.type === 'multiple') ? 'checkbox' : 'radio';
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
    
    document.getElementById('feedbackArea').style.display = 'none';
    document.getElementById('submitAnswerBtn').style.display = 'inline-block';
    document.getElementById('nextQuestionBtn').style.display = 'none';
}

function submitAnswer() {
    const question = currentQuiz.questions[currentQuestionIndex];
    let userAnswer = null;
    let isCorrect = false;
    
    if (question.type === 'multiple') {
        const selected = document.querySelectorAll('input[name="answer"]:checked');
        if (selected.length === 0) {
            alert('Please select at least one answer.');
            return;
        }
        userAnswer = Array.from(selected).map(el => parseInt(el.value)).sort();
        const correctAnswer = [...question.correctAnswer].sort();
        isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correctAnswer);
    } else {
        const selected = document.querySelector('input[name="answer"]:checked');
        if (!selected) {
            alert('Please select an answer.');
            return;
        }
        userAnswer = parseInt(selected.value);
        isCorrect = userAnswer === question.correctAnswer;
    }
    
    userAnswers.push({ questionId: question.id, userAnswer, correct: isCorrect });
    
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
    
    showFeedback(isCorrect, question);
    
    document.getElementById('submitAnswerBtn').style.display = 'none';
    document.getElementById('nextQuestionBtn').style.display = 'inline-block';
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
    
    document.getElementById('finalScore').textContent = scorePercent + '%';
    document.getElementById('correctAnswers').textContent = quizResults.correct;
    document.getElementById('incorrectAnswers').textContent = quizResults.incorrect;
    document.getElementById('scorePercent').textContent = scorePercent + '%';
    
    const scoreCircle = document.getElementById('scoreCircle');
    if (passed) {
        scoreCircle.classList.add('pass');
        document.getElementById('resultsTitle').textContent = 'Congratulations!';
        document.getElementById('resultsMessage').textContent = `You scored ${scorePercent}% and passed the quiz!`;
    } else {
        document.getElementById('resultsTitle').textContent = 'Keep Practicing';
        document.getElementById('resultsMessage').textContent = `You scored ${scorePercent}%. You need 70% to pass. Review the material and try again.`;
    }
    
    const detailsHTML = quizResults.answers.map((answer, index) => `
        <div class="result-item ${answer.correct ? 'correct' : 'incorrect'}">
            <div class="result-question">Question ${index + 1}: ${answer.question}</div>
            <div class="result-status ${answer.correct ? 'correct' : 'incorrect'}">
                ${answer.correct ? 'Correct' : 'Incorrect'}
            </div>
        </div>
    `).join('');
    
    document.getElementById('resultsDetails').innerHTML = `<h3>Question Results</h3>${detailsHTML}`;
    
    if (passed) {
        saveQuizResult(scorePercent);
    }
}

function saveQuizResult(score) {
    const currentUser = window.auth.getCurrentUser();
    if (!currentUser) return;
    
    const userProgress = window.auth.getUserProgress(currentUser.email);
    
    if (!userProgress.quizzes) {
        userProgress.quizzes = {};
    }
    
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
    const currentUser = window.auth.getCurrentUser();
    if (!currentUser) {
        window.location.href = 'dashboard.html';
        return;
    }
    
    const userProgress = window.auth.getUserProgress(currentUser.email);
    
    if (!userProgress.chapters[currentQuiz.chapterId]) {
        userProgress.chapters[currentQuiz.chapterId] = { completed: false, sections: [] };
    }
    
    userProgress.chapters[currentQuiz.chapterId].completed = true;
    userProgress.chapters[currentQuiz.chapterId].completedAt = new Date().toISOString();
    
    window.auth.saveUserProgress(currentUser.email, userProgress);
    
    window.location.href = 'dashboard.html';
}
