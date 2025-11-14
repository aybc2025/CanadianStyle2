// ===================================
// Canadian Style Learner - Chapter.js
// Updated to load content from JSON files
// ===================================

// Chapter data - will be loaded from JSON
let chapterData = null;

// Current state
let currentSection = 0;
let currentUser = null;
let userProgress = null;

// Initialize chapter page
document.addEventListener('DOMContentLoaded', async function() {
    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = parseInt(urlParams.get('id')) || 1;
    
    // Load user data
    currentUser = window.auth.getCurrentUser();
    if (currentUser) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Load chapter data from JSON
    await loadChapterData(chapterId);
    
    // Setup navigation
    setupNavigation();
});

// Load chapter data from JSON file
async function loadChapterData(chapterId) {
    try {
        // Pad chapter ID to two digits (01, 02, etc.)
        const paddedId = chapterId.toString().padStart(2, '0');
        
        // Fetch the JSON file
        const response = await fetch(`data/chapter-${paddedId}.json`);
        
        if (!response.ok) {
            throw new Error(`Failed to load chapter data: ${response.status}`);
        }
        
        // Parse JSON
        chapterData = await response.json();
        
        // Update header with chapter info
        document.getElementById('chapterBadge').textContent = chapterData.number;
        document.getElementById('chapterTitle').textContent = chapterData.title;
        document.getElementById('chapterDescription').textContent = chapterData.description;
        
        // Render section tabs
        renderSectionTabs();
        
        // Load first section (or saved position)
        const savedSection = getSavedSection(chapterId);
        loadSection(savedSection);
        
    } catch (error) {
        console.error('Error loading chapter data:', error);
        // Show error to user
        document.getElementById('contentArea').innerHTML = `
            <div class="error-message">
                <h2>Error Loading Chapter</h2>
                <p>Unable to load chapter content. Please try refreshing the page.</p>
                <p class="error-details">${error.message}</p>
            </div>
        `;
    }
}

// Render section tabs
function renderSectionTabs() {
    const tabsContainer = document.getElementById('navTabs');
    tabsContainer.innerHTML = '';
    
    chapterData.sections.forEach((section, index) => {
        const tab = document.createElement('button');
        tab.className = 'nav-tab';
        tab.textContent = `${section.id} ${section.title}`;
        tab.onclick = () => loadSection(index);
        
        // Mark completed sections
        if (isSectionCompleted(section.id)) {
            tab.classList.add('completed');
        }
        
        tabsContainer.appendChild(tab);
    });
}

// Load section content
function loadSection(sectionIndex) {
    currentSection = sectionIndex;
    const section = chapterData.sections[sectionIndex];
    
    // Update active tab
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === sectionIndex);
    });
    
    // Update progress
    updateProgress();
    
    // Render content
    renderSectionContent(section);
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Mark section as viewed
    markSectionViewed(section.id);
}

// Render section content from JSON data
function renderSectionContent(section) {
    const contentArea = document.getElementById('contentArea');
    
    // Build HTML from section content object
    const html = buildSectionHTML(section);
    
    contentArea.innerHTML = `
        <div class="section-header">
            <div class="section-number">Section ${section.id}</div>
            <h2 class="section-title">${section.title}</h2>
        </div>
        ${html}
    `;
}

// Build HTML from section content JSON
function buildSectionHTML(section) {
    const content = section.content;
    let html = '';
    
    // Main text
    if (content.text) {
        html += `<p>${content.text}</p>`;
    }
    
    // Key Principle box
    if (content.keyPrinciple) {
        html += `
            <div class="key-principle">
                <h4>${content.keyPrinciple.title}</h4>
                <p>${content.keyPrinciple.content}</p>
            </div>
        `;
    }
    
    // Warning/Avoid box
    if (content.warningBox) {
        html += `
            <div class="warning-box">
                <h4>⚠ ${content.warningBox.title}</h4>
                ${content.warningBox.content ? `<p>${content.warningBox.content}</p>` : ''}
                ${content.warningBox.items ? `
                    <ul>
                        ${content.warningBox.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Avoid box
    if (content.avoidBox) {
        html += `
            <div class="warning-box">
                <h4>⚠ ${content.avoidBox.title}</h4>
                <ul>
                    ${content.avoidBox.items.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Rules list
    if (content.rules) {
        html += '<ul class="rules-list">';
        content.rules.forEach(rule => {
            if (typeof rule === 'string') {
                html += `<li>${rule}</li>`;
            } else if (rule.rule) {
                html += `
                    <li>
                        <strong>${rule.rule}</strong>
                        ${rule.examples ? `
                            <div class="example-box">
                                ${rule.examples.join('<br>')}
                            </div>
                        ` : ''}
                    </li>
                `;
            }
        });
        html += '</ul>';
    }
    
    // Principles
    if (content.principles) {
        html += `<ul>${content.principles.map(p => `<li>${p}</li>`).join('')}</ul>`;
    }
    
    // Examples
    if (content.examples) {
        content.examples.forEach(example => {
            const className = example.type === 'correct' ? 'example-correct' : 
                            example.type === 'incorrect' ? 'example-incorrect' : 'example-box';
            const label = example.type === 'correct' ? '✓ Correct' : 
                         example.type === 'incorrect' ? '✗ Incorrect' : 'Example';
            
            html += `
                <div class="${className}">
                    <div class="example-label">${label}</div>
                    ${example.text}
                </div>
            `;
        });
    }
    
    // Special cases (for plurals, provinces, etc.)
    if (content.specialCases) {
        html += '<h3>Special Cases</h3><ul>';
        content.specialCases.forEach(item => {
            html += `<li><strong>${item.singular}</strong> → ${item.plural}</li>`;
        });
        html += '</ul>';
    }
    
    if (content.provinces) {
        html += '<div class="provinces-list"><ul>';
        content.provinces.forEach(province => {
            html += `<li>${province}</li>`;
        });
        html += '</ul></div>';
    }
    
    // Abbreviations (for Latin terms, etc.)
    if (content.abbreviations) {
        content.abbreviations.forEach(abbr => {
            if (typeof abbr === 'string') {
                html += `<p>${abbr}</p>`;
            } else if (abbr.abbr) {
                html += `
                    <div class="abbr-item">
                        <strong>${abbr.abbr}</strong> 
                        ${abbr.full ? `(${abbr.full})` : ''} 
                        — ${abbr.meaning}
                        ${abbr.usage ? `<br><em>${abbr.usage}</em>` : ''}
                    </div>
                `;
            }
        });
    }
    
    // Tables (for SI units, etc.)
    if (content.baseUnits) {
        html += '<h3>Base Units</h3><table><thead><tr><th>Quantity</th><th>Unit</th><th>Symbol</th></tr></thead><tbody>';
        content.baseUnits.forEach(unit => {
            html += `<tr><td>${unit.quantity}</td><td>${unit.unit}</td><td>${unit.symbol}</td></tr>`;
        });
        html += '</tbody></table>';
    }
    
    // Notes
    if (content.note) {
        html += `<p class="note"><strong>Note:</strong> ${content.note}</p>`;
    }
    
    return html;
}

// Update progress bar
function updateProgress() {
    const totalSections = chapterData.sections.length;
    const progress = Math.round(((currentSection + 1) / totalSections) * 100);
    
    document.getElementById('progressText').textContent = 
        `Section ${currentSection + 1} of ${totalSections}`;
    document.getElementById('progressPercent').textContent = `${progress}%`;
    
    const progressBar = document.getElementById('chapterProgressBar');
    progressBar.style.width = `${progress}%`;
}

// Update navigation buttons
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const quizBtn = document.getElementById('quizBtn');
    
    // Previous button
    if (currentSection > 0) {
        prevBtn.style.display = 'inline-block';
    } else {
        prevBtn.style.display = 'none';
    }
    
    // Next/Quiz buttons
    if (currentSection < chapterData.sections.length - 1) {
        nextBtn.style.display = 'inline-block';
        quizBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'none';
        quizBtn.style.display = 'inline-block';
    }
}

// Setup navigation
function setupNavigation() {
    document.getElementById('prevBtn').onclick = () => {
        if (currentSection > 0) {
            loadSection(currentSection - 1);
        }
    };
    
    document.getElementById('nextBtn').onclick = () => {
        if (currentSection < chapterData.sections.length - 1) {
            loadSection(currentSection + 1);
        }
    };
    
    document.getElementById('quizBtn').onclick = () => {
        window.location.href = `quiz.html?id=${chapterData.id}`;
    };
}

// Check if section is completed
function isSectionCompleted(sectionId) {
    if (!userProgress) return false;
    
    const chapterProgress = userProgress.chapters[chapterData.id];
    if (!chapterProgress || !chapterProgress.sections) return false;
    
    const section = chapterProgress.sections.find(s => s.sectionId === sectionId);
    return section && section.completed;
}

// Mark section as viewed
function markSectionViewed(sectionId) {
    if (!currentUser || !userProgress) return;
    
    // Initialize chapter progress if needed
    if (!userProgress.chapters[chapterData.id]) {
        userProgress.chapters[chapterData.id] = {
            completed: false,
            sections: []
        };
    }
    
    const chapterProgress = userProgress.chapters[chapterData.id];
    
    // Find or create section progress
    let sectionProgress = chapterProgress.sections.find(s => s.sectionId === sectionId);
    
    if (!sectionProgress) {
        sectionProgress = {
            sectionId: sectionId,
            completed: true,
            viewedAt: new Date().toISOString()
        };
        chapterProgress.sections.push(sectionProgress);
    } else {
        sectionProgress.completed = true;
        sectionProgress.viewedAt = new Date().toISOString();
    }
    
    // Save progress
    window.auth.saveUserProgress(currentUser.email, userProgress);
}

// Get saved section position
function getSavedSection(chapterId) {
    if (!userProgress) return 0;
    
    const chapterProgress = userProgress.chapters[chapterId];
    if (!chapterProgress || !chapterProgress.sections) return 0;
    
    // Find first incomplete section
    for (let i = 0; i < chapterData.sections.length; i++) {
        const section = chapterData.sections[i];
        const progress = chapterProgress.sections.find(s => s.sectionId === section.id);
        
        if (!progress || !progress.completed) {
            return i;
        }
    }
    
    // All completed, return last section
    return chapterData.sections.length - 1;
}
