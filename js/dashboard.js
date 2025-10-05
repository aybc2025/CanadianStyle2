// ===================================
// Canadian Style Learner - Dashboard.js
// ===================================

// Chapters data
const chapters = [
    {
        id: 1,
        number: "1",
        title: "Abbreviations",
        category: "basics",
        description: "Learn proper abbreviation usage and formatting.",
        sections: 25,
        available: true
    },
    {
        id: 2,
        number: "2",
        title: "Hyphenation",
        category: "basics",
        description: "Master compound words and word division.",
        sections: 15,
        available: false
    },
    {
        id: 3,
        number: "3",
        title: "Spelling",
        category: "basics",
        description: "Canadian spelling conventions and common errors.",
        sections: 12,
        available: false
    },
    {
        id: 4,
        number: "4",
        title: "Capitalization",
        category: "basics",
        description: "Rules for proper capitalization in Canadian English.",
        sections: 14,
        available: false
    },
    {
        id: 5,
        number: "5",
        title: "Numerical Expressions",
        category: "basics",
        description: "Format numbers, dates, and measurements correctly.",
        sections: 10,
        available: false
    },
    {
        id: 6,
        number: "6",
        title: "Italics",
        category: "typography",
        description: "When and how to use italics effectively.",
        sections: 8,
        available: false
    },
    {
        id: 7,
        number: "7",
        title: "Punctuation",
        category: "typography",
        description: "Master punctuation marks and their proper usage.",
        sections: 18,
        available: false
    },
    {
        id: 8,
        number: "8",
        title: "Quotations",
        category: "typography",
        description: "Handle direct and indirect quotations properly.",
        sections: 9,
        available: false
    },
    {
        id: 9,
        number: "9",
        title: "Reference Matter",
        category: "typography",
        description: "Format footnotes, citations, and bibliographies.",
        sections: 16,
        available: false
    },
    {
        id: 10,
        number: "10",
        title: "Letters and Memorandums",
        category: "style",
        description: "Professional correspondence formatting.",
        sections: 12,
        available: false
    },
    {
        id: 11,
        number: "11",
        title: "Reports and Minutes",
        category: "style",
        description: "Structure and format reports and meeting minutes.",
        sections: 11,
        available: false
    },
    {
        id: 12,
        number: "12",
        title: "Usage",
        category: "style",
        description: "Correct word usage and common mistakes.",
        sections: 15,
        available: false
    },
    {
        id: 13,
        number: "13",
        title: "Plain Language",
        category: "style",
        description: "Write clearly and concisely for your audience.",
        sections: 7,
        available: false
    },
    {
        id: 14,
        number: "14",
        title: "Elimination of Stereotyping",
        category: "style",
        description: "Inclusive and respectful writing practices.",
        sections: 8,
        available: false
    },
    {
        id: 15,
        number: "15",
        title: "Geographical Names",
        category: "style",
        description: "Canadian geographical naming conventions.",
        sections: 6,
        available: false
    },
    {
        id: 16,
        number: "16",
        title: "Revision and Proofreading",
        category: "style",
        description: "Techniques for editing and improving your writing.",
        sections: 8,
        available: false
    }
];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    loadProgress();
    renderModules();
    setupFilters();
});

// Load user information
function loadUserInfo() {
    const currentUser = window.auth.getCurrentUser();
    
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('userEmail').textContent = currentUser.email;
    }
}

// Load and display progress
function loadProgress() {
    const currentUser = window.auth.getCurrentUser();
    if (!currentUser) return;
    
    const progress = window.auth.getUserProgress(currentUser.email);
    
    // Calculate statistics
    const totalChapters = chapters.length;
    let completedChapters = 0;
    let completedSections = 0;
    let quizzesTaken = 0;
    
    chapters.forEach(chapter => {
        const chapterProgress = progress.chapters[chapter.id];
        if (chapterProgress && chapterProgress.completed) {
            completedChapters++;
        }
        if (chapterProgress && chapterProgress.sections) {
            completedSections += chapterProgress.sections.filter(s => s.completed).length;
        }
    });
    
    if (progress.quizzes) {
        quizzesTaken = Object.keys(progress.quizzes).length;
    }
    
    // Update UI
    document.getElementById('chaptersCompleted').textContent = completedChapters;
    document.getElementById('sectionsCompleted').textContent = completedSections;
    document.getElementById('quizzesTaken').textContent = quizzesTaken;
    
    // Calculate overall progress
    const overallProgress = Math.round((completedChapters / totalChapters) * 100);
    const progressBar = document.getElementById('overallProgressBar');
    progressBar.style.width = overallProgress + '%';
    progressBar.textContent = overallProgress + '%';
    
    // Update stats in progress object
    progress.stats.totalChaptersCompleted = completedChapters;
    progress.stats.totalQuizzesTaken = quizzesTaken;
    progress.stats.overallProgress = overallProgress;
    
    window.auth.saveUserProgress(currentUser.email, progress);
}

// Render modules
function renderModules(filterCategory = 'all') {
    const grid = document.getElementById('modulesGrid');
    grid.innerHTML = '';
    
    const currentUser = window.auth.getCurrentUser();
    const progress = currentUser ? window.auth.getUserProgress(currentUser.email) : null;
    
    chapters
        .filter(chapter => filterCategory === 'all' || chapter.category === filterCategory)
        .forEach(chapter => {
            const card = createModuleCard(chapter, progress);
            grid.appendChild(card);
        });
}

// Create module card
function createModuleCard(chapter, progress) {
    const card = document.createElement('div');
    card.className = 'module-card';
    
    // Get chapter progress
    let chapterProgress = 0;
    let isCompleted = false;
    
    if (progress && progress.chapters[chapter.id]) {
        const cp = progress.chapters[chapter.id];
        if (cp.sections) {
            const completedSections = cp.sections.filter(s => s.completed).length;
            chapterProgress = Math.round((completedSections / chapter.sections) * 100);
        }
        isCompleted = cp.completed || false;
    }
    
    if (isCompleted) {
        card.classList.add('completed');
    }
    
    card.innerHTML = `
        <div class="module-header">
            <div class="module-number">${chapter.number}</div>
            <div class="module-title">
                <div class="module-category">${chapter.category}</div>
                <h3>${chapter.title}</h3>
            </div>
        </div>
        
        <p class="module-description">${chapter.description}</p>
        
        <div class="module-progress">
            <div class="module-progress-label">
                <span>Progress</span>
                <span>${chapterProgress}% Complete</span>
            </div>
            <div class="module-progress-bar">
                <div class="module-progress-fill" style="width: ${chapterProgress}%"></div>
            </div>
        </div>
        
        <div class="module-footer">
            ${isCompleted ? `
                <div class="completion-badge">
                    <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span>Completed</span>
                </div>
            ` : ''}
            <button class="btn ${chapter.available ? 'btn-primary' : 'btn-secondary'}" 
                    onclick="startChapter(${chapter.id})"
                    ${!chapter.available ? 'disabled' : ''}>
                ${chapterProgress > 0 ? 'Continue' : 'Start Chapter'}
            </button>
        </div>
    `;
    
    return card;
}

// Setup filter tabs
function setupFilters() {
    const tabs = document.querySelectorAll('.filter-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter modules
            const category = this.getAttribute('data-category');
            renderModules(category);
        });
    });
}

// Start chapter
function startChapter(chapterId) {
    const chapter = chapters.find(c => c.id === chapterId);
    
    if (chapter && chapter.available) {
        window.location.href = `chapter.html?id=${chapterId}`;
    }
}

// Make startChapter available globally
window.startChapter = startChapter;
