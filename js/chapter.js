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
    
    // ========================================
    // CHAPTER 3 SPECIFIC CONTENT HANDLERS
    // ========================================
    
    // British vs American Differences (Chapter 3)
    if (content.britishAmericanDifferences) {
        html += `
            <div class="comparison-section">
                <h3>${content.britishAmericanDifferences.title}</h3>
                <table class="comparison-table">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>British</th>
                            <th>American</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.britishAmericanDifferences.patterns.forEach(pattern => {
            html += `
                <tr>
                    <td><strong>${pattern.category}</strong></td>
                    <td>${pattern.british.join('<br>')}</td>
                    <td>${pattern.american.join('<br>')}</td>
                </tr>
            `;
            if (pattern.note) {
                html += `
                    <tr>
                        <td colspan="3" class="pattern-note"><em>Note: ${pattern.note}</em></td>
                    </tr>
                `;
            }
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Recommended Spellings (Chapter 3)
    if (content.recommendedSpellings) {
        html += `
            <div class="recommended-box">
                <h4>${content.recommendedSpellings.title}</h4>
                <ul>
        `;
        content.recommendedSpellings.patterns.forEach(pattern => {
            html += `<li>${pattern}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    // Frequently Misspelled Words (Chapter 3)
    if (content.words && Array.isArray(content.words)) {
        html += `
            <div class="words-list">
                <div class="words-grid">
        `;
        content.words.forEach(word => {
            html += `<span class="word-item">${word}</span>`;
        });
        html += `
                </div>
            </div>
        `;
    }
    
    // Standard Spellings (SI units, etc.)
    if (content.standardSpellings && Array.isArray(content.standardSpellings)) {
        html += `<ul>`;
        content.standardSpellings.forEach(spelling => {
            html += `<li>${spelling}</li>`;
        });
        html += `</ul>`;
    }
    
    // Prefix Rules
    if (content.prefixRules) {
        html += `
            <div class="info-box">
                <h4>${content.prefixRules.title}</h4>
                <p>${content.prefixRules.text}</p>
            </div>
        `;
    }
    
    // Homonyms pairs (Chapter 3)
    if (content.homonyms && Array.isArray(content.homonyms)) {
        html += `
            <div class="homonyms-section">
                <table class="homonyms-table">
                    <thead>
                        <tr>
                            <th>Word 1</th>
                            <th>Meaning</th>
                            <th>Word 2</th>
                            <th>Meaning</th>
        `;
        
        // Check if there's a third column
        if (content.homonyms.some(h => h.word3)) {
            html += `<th>Word 3</th><th>Meaning</th>`;
        }
        
        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.homonyms.forEach(pair => {
            html += `
                <tr>
                    <td><strong>${pair.word1}</strong></td>
                    <td>${pair.meaning1}</td>
                    <td><strong>${pair.word2}</strong></td>
                    <td>${pair.meaning2}</td>
            `;
            
            if (pair.word3) {
                html += `
                    <td><strong>${pair.word3}</strong></td>
                    <td>${pair.meaning3}</td>
                `;
            } else if (content.homonyms.some(h => h.word3)) {
                html += `<td></td><td></td>`;
            }
            
            html += `</tr>`;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // ei/ie Rule and Exceptions
    if (content.keyPrinciple && content.exceptions) {
        html += `
            <div class="key-principle">
                <h4>${content.keyPrinciple.title}</h4>
                <p>${content.keyPrinciple.content}</p>
            </div>
        `;
        
        if (content.exceptions.title) {
            html += `
                <div class="exceptions-box">
                    <h4>${content.exceptions.title}</h4>
                    <div class="words-grid">
            `;
            content.exceptions.words.forEach(word => {
                html += `<span class="word-item">${word}</span>`;
            });
            html += `
                    </div>
                </div>
            `;
        }
    }
    
    // Verbs lists (sede/ceed/cede)
    if (content.sedeVerb) {
        html += `
            <div class="verb-section">
                <h4>${content.sedeVerb.title}</h4>
                <p>${content.sedeVerb.content}</p>
            </div>
        `;
    }
    
    if (content.ceedVerbs) {
        html += `
            <div class="verb-section">
                <h4>${content.ceedVerbs.title}</h4>
                <p>${content.ceedVerbs.content}</p>
                <ul>
        `;
        content.ceedVerbs.verbs.forEach(verb => {
            html += `<li>${verb}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    if (content.cedeVerbs) {
        html += `
            <div class="verb-section">
                <h4>${content.cedeVerbs.title}</h4>
                <p>${content.cedeVerbs.content}</p>
                <div class="words-grid">
        `;
        content.cedeVerbs.verbs.forEach(verb => {
            html += `<span class="word-item">${verb}</span>`;
        });
        html += `
                </div>
            </div>
        `;
    }
    
    // able/ible Examples
    if (content.ableAtiveExamples) {
        html += `
            <div class="examples-section">
                <h4>${content.ableAtiveExamples.title}</h4>
                <ul>
        `;
        content.ableAtiveExamples.examples.forEach(ex => {
            html += `<li><strong>${ex.root}</strong> → ${ex.derived}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    if (content.ibleItiveExamples) {
        html += `
            <div class="examples-section">
                <h4>${content.ibleItiveExamples.title}</h4>
                <ul>
        `;
        content.ibleItiveExamples.examples.forEach(ex => {
            html += `<li><strong>${ex.root}</strong> → ${ex.derived}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    // Rules with examples (for consonant doubling, etc.)
    if (content.rule1) {
        html += `
            <div class="rule-section">
                <h4>${content.rule1.title}</h4>
                <p>${content.rule1.text}</p>
        `;
        if (content.rule1.examples) {
            html += `<div class="examples-grid">`;
            content.rule1.examples.forEach(ex => {
                html += `<div class="example-item"><strong>${ex.base}</strong> → ${ex.suffix || ex.derived}</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    if (content.rule2) {
        html += `
            <div class="rule-section">
                <h4>${content.rule2.title}</h4>
                <p>${content.rule2.text}</p>
        `;
        if (content.rule2.examples) {
            html += `<div class="examples-grid">`;
            content.rule2.examples.forEach(ex => {
                html += `<div class="example-item"><strong>${ex.base}</strong> → ${ex.suffix || ex.derived}</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    if (content.exceptions1) {
        html += `
            <div class="exceptions-box">
                <h4>${content.exceptions1.title}</h4>
                <p>${content.exceptions1.text}</p>
        `;
        if (content.exceptions1.examples) {
            html += `<div class="examples-grid">`;
            content.exceptions1.examples.forEach(ex => {
                html += `<div class="example-item"><strong>${ex.base}</strong> → ${ex.suffix || ex.derived}</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    if (content.exceptions2) {
        html += `
            <div class="exceptions-box">
                <h4>${content.exceptions2.title}</h4>
                <p>${content.exceptions2.content}</p>
            </div>
        `;
    }
    
    if (content.busNote) {
        html += `
            <div class="info-box">
                <h4>${content.busNote.title}</h4>
                <p>${content.busNote.content}</p>
            </div>
        `;
    }
    
    // Y ending rules
    if (content.rule && content.rule.title) {
        html += `
            <div class="rule-section">
                <h4>${content.rule.title}</h4>
                <p>${content.rule.text}</p>
        `;
        if (content.rule.examples) {
            html += `<div class="examples-grid">`;
            content.rule.examples.forEach(ex => {
                html += `<div class="example-item"><strong>${ex.base}</strong> → ${ex.derived}</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    if (content.exceptions && content.exceptions.title && content.exceptions.examples) {
        html += `
            <div class="exceptions-box">
                <h4>${content.exceptions.title}</h4>
                <div class="words-grid">
        `;
        content.exceptions.examples.forEach(ex => {
            html += `<span class="word-item">${ex.word}</span>`;
        });
        html += `
                </div>
            </div>
        `;
    }
    
    if (content.distinction) {
        html += `
            <div class="info-box">
                <h4>${content.distinction.title}</h4>
                <p>${content.distinction.content}</p>
            </div>
        `;
    }
    
    if (content.vowelYRule) {
        html += `
            <div class="rule-section">
                <h4>${content.vowelYRule.title}</h4>
                <p>${content.vowelYRule.text}</p>
        `;
        if (content.vowelYRule.examples) {
            html += `<div class="examples-grid">`;
            content.vowelYRule.examples.forEach(ex => {
                html += `<div class="example-item"><strong>${ex.base}</strong> → ${ex.derivatives}</div>`;
            });
            html += `</div>`;
        }
        html += `</div>`;
    }
    
    // ise/ize words
    if (content.iseWords) {
        html += `
            <div class="words-section">
                <h4>${content.iseWords.title}</h4>
                <p>${content.iseWords.text}</p>
                <div class="words-grid">
        `;
        content.iseWords.words.forEach(word => {
            html += `<span class="word-item">${word}</span>`;
        });
        html += `
                </div>
                ${content.iseWords.note ? `<p class="note"><em>Note: ${content.iseWords.note}</em></p>` : ''}
            </div>
        `;
    }
    
    if (content.izeWords) {
        html += `
            <div class="words-section">
                <h4>${content.izeWords.title}</h4>
                <p>${content.izeWords.text}</p>
                <div class="words-grid">
        `;
        content.izeWords.examples.forEach(word => {
            html += `<span class="word-item">${word}</span>`;
        });
        html += `
                </div>
            </div>
        `;
    }
    
    // Plural Forms (Chapter 3)
    if (content.pluralForms && Array.isArray(content.pluralForms)) {
        html += `
            <div class="plural-forms-section">
                <table class="plural-table">
                    <thead>
                        <tr>
                            <th>Singular</th>
                            <th>Plural</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.pluralForms.forEach(form => {
            html += `
                <tr>
                    <td><strong>${form.singular}</strong></td>
                    <td>${form.plural}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Drawbacks list (for spell-checking)
    if (content.drawbacks) {
        html += `
            <div class="warning-box">
                <h4>${content.drawbacks.title}</h4>
                <ul>
        `;
        content.drawbacks.points.forEach(point => {
            html += `<li>${point}</li>`;
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    // Search-Replace Example
    if (content.searchReplaceExample) {
        html += `
            <div class="example-section">
                <h4>${content.searchReplaceExample.title}</h4>
                <p>${content.searchReplaceExample.text}</p>
                ${content.searchReplaceExample.solution ? `
                    <div class="solution-box">
                        <strong>Solution:</strong> ${content.searchReplaceExample.solution}
                    </div>
                ` : ''}
            </div>
        `;
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
