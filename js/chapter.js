// ===================================
// Canadian Style Learner - Chapter.js
// Updated to load content from JSON files
// FIXED: Handles complex abbreviations and examples correctly
// FIXED: Added handlers for Chapter 4 structures (mainRule, mainRules, personifications, abstractions, verbs, warning)
// FIXED: Properly handles sections 4.21-4.30 with rules array
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
    
    // === NEW: mainText (Chapter 4 style) ===
    if (content.mainText) {
        html += `<p>${content.mainText}</p>`;
    }
    
    // === NEW: explanation (Chapter 4 style) ===
    if (content.explanation) {
        html += `<p>${content.explanation}</p>`;
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
    
    // Info/Use box  
    if (content.useBox) {
        html += `
            <div class="info-box">
                <h4>${content.useBox.title}</h4>
                ${content.useBox.content ? `<p>${content.useBox.content}</p>` : ''}
                ${content.useBox.items ? `
                    <ul>
                        ${content.useBox.items.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // === FIXED: Abbreviations (handles complex objects like Latin terms) ===
    if (content.abbreviations && Array.isArray(content.abbreviations)) {
        const firstItem = content.abbreviations[0];
        
        // Check if this is a complex abbreviation structure (like 1.13 Latin Terms)
        if (typeof firstItem === 'object' && firstItem !== null && 
            (firstItem.abbr || firstItem.quantity || firstItem.symbol)) {
            
            // Complex abbreviations - render as table
            html += `
                <div class="abbreviations-section">
                    <h4>Abbreviations</h4>
                    <table class="abbreviations-table">
                        <thead>
                            <tr>
            `;
            
            // Determine table headers based on structure
            if (firstItem.abbr) {
                // Latin terms style
                html += `
                    <th>Abbreviation</th>
                    <th>Full Form</th>
                    <th>Meaning</th>
                    <th>Usage</th>
                `;
            } else if (firstItem.quantity) {
                // SI units style
                html += `
                    <th>Quantity</th>
                    <th>Unit</th>
                    <th>Symbol</th>
                `;
            }
            
            html += `
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            content.abbreviations.forEach(abbr => {
                html += `<tr>`;
                
                if (abbr.abbr) {
                    // Latin terms format
                    html += `
                        <td><strong>${abbr.abbr}</strong></td>
                        <td>${abbr.full || ''}</td>
                        <td>${abbr.meaning || ''}</td>
                        <td class="usage-text">${abbr.usage || ''}</td>
                    `;
                } else if (abbr.quantity) {
                    // SI units format
                    html += `
                        <td>${abbr.quantity || ''}</td>
                        <td>${abbr.unit || ''}</td>
                        <td><strong>${abbr.symbol || ''}</strong></td>
                    `;
                }
                
                html += `</tr>`;
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            // Simple string abbreviations - render as list
            html += `<ul>`;
            content.abbreviations.forEach(abbr => {
                html += `<li>${abbr}</li>`;
            });
            html += `</ul>`;
        }
    }

    // === Words list (for frequently misspelled words - Section 3.03) ===
    if (content.words && Array.isArray(content.words)) {
        html += `
            <div class="words-section">
                <div class="words-grid">
        `;
        
        content.words.forEach(word => {
            html += `<div class="word-item">${word}</div>`;
        });
        
        html += `
                </div>
            </div>
        `;
    }
    
    // === FIXED: Examples list (handles complex objects with base/derived) ===
    if (content.examples && Array.isArray(content.examples)) {
        html += `
            <div class="examples-section">
                <h4>Examples</h4>
                <ul class="examples-list">
        `;
        
        content.examples.forEach(example => {
            // Handle both string and object formats
            if (typeof example === 'object' && example !== null) {
                let exampleText = '';
                let exampleType = example.type;
                
                // === FIXED: Handle different example object structures ===
                if (example.base && example.derived) {
                    // Pattern: base → derived (e.g., spelling rules in Chapter 3)
                    exampleText = `<strong>${example.base}</strong> → ${example.derived}`;
                } else if (example.base && example.suffix) {
                    // Pattern: base + suffix
                    exampleText = `<strong>${example.base}</strong> → ${example.suffix}`;
                } else if (example.base && example.derivatives) {
                    // Pattern: base with multiple derivatives
                    exampleText = `<strong>${example.base}</strong> → ${example.derivatives}`;
                } else if (example.separate && example.combined) {
                    // Pattern: separate vs combined (like "all together" → "altogether")
                    exampleText = `${example.separate} → <strong>${example.combined}</strong>`;
                } else if (example.root && example.derived) {
                    // Pattern: root → derived (for able/ible examples)
                    exampleText = `<strong>${example.root}</strong> → ${example.derived}`;
                } else if (example.text) {
                    // Has explicit text field
                    exampleText = example.text;
                } else {
                    // Fallback: convert to string
                    exampleText = String(example);
                }
                
                // Handle both 'type' and 'correct' properties for correct/incorrect examples
                if (!exampleType && example.correct !== undefined) {
                    exampleType = example.correct ? 'correct' : 'incorrect';
                }
                exampleType = exampleType || 'example';
                
                if (exampleType === 'correct' || exampleType === 'incorrect') {
                    // Use example-box for typed examples
                    html += `
                        <li class="example-list-item">
                            <div class="example-box ${exampleType === 'correct' ? 'example-correct' : 'example-incorrect'}">
                                <div class="example-label">${exampleType === 'correct' ? '✓ Correct' : '✗ Incorrect'}</div>
                                <div>${exampleText}</div>
                            </div>
                        </li>
                    `;
                } else {
                    // Regular example object without type
                    html += `<li>${exampleText}</li>`;
                }
            } else {
                // Simple string example
                html += `<li>${example}</li>`;
            }
        });
        
        html += `
                </ul>
            </div>
        `;
    }
    
    // === CRITICAL FIX: Process rules array BEFORE mainRule ===
    // This fixes sections 4.21-4.30 which use rules, not mainRule
    // Rules - can be array of strings or array of objects
    if (content.rules && Array.isArray(content.rules) && content.rules.length > 0) {
        // Check if first rule is a string (simple array) or object
        if (typeof content.rules[0] === 'string') {
            // Simple array of strings
            html += `<ul>`;
            content.rules.forEach(rule => {
                html += `<li>${rule}</li>`;
            });
            html += `</ul>`;
        } else {
            // Array of rule objects (used in sections 4.21-4.30)
            content.rules.forEach(rule => {
                html += `
                    <div class="rule-section">
                        ${rule.letter ? `<h4>${rule.letter})</h4>` : ''}
                        ${rule.title ? `<h4>${rule.title}</h4>` : ''}
                        ${rule.text ? `<p>${rule.text}</p>` : ''}
                        ${rule.note ? `<p class="note"><em>Note: ${rule.note}</em></p>` : ''}
                        ${rule.additionalNote ? `<p class="note"><em>${rule.additionalNote}</em></p>` : ''}
                        ${rule.warningText ? `<p class="warning-text"><strong>Warning:</strong> ${rule.warningText}</p>` : ''}
                        ${rule.warningExample ? `<p class="example-text"><em>${rule.warningExample}</em></p>` : ''}
                        ${rule.capitalized && typeof rule.capitalized === 'string' ? `<p><strong>Capitalized:</strong> ${rule.capitalized}</p>` : ''}
                        ${rule.lowercase && typeof rule.lowercase === 'string' ? `<p><strong>Lowercase:</strong> ${rule.lowercase}</p>` : ''}
                        ${rule.reference && typeof rule.reference === 'string' ? `<p class="reference-text"><em>${rule.reference}</em></p>` : ''}
                        ${rule.referenceNote && typeof rule.referenceNote === 'string' ? `<p class="note"><em>${rule.referenceNote}</em></p>` : ''}
                        ${rule.italicsReference && typeof rule.italicsReference === 'string' ? `<p class="note"><em>${rule.italicsReference}</em></p>` : ''}
                        ${rule.mainRule && typeof rule.mainRule === 'object' ? `
                            <div class="main-rule-subsection">
                                ${rule.mainRule.text ? `<p>${rule.mainRule.text}</p>` : ''}
                                ${rule.mainRule.examples && Array.isArray(rule.mainRule.examples) ? `
                                    <ul>
                                        ${rule.mainRule.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.genericUse && typeof rule.genericUse === 'object' ? `
                            <div class="generic-use-section">
                                ${rule.genericUse.text ? `<p>${rule.genericUse.text}</p>` : ''}
                                ${rule.genericUse.examples && Array.isArray(rule.genericUse.examples) ? `
                                    <ul>
                                        ${rule.genericUse.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.scientificNames && typeof rule.scientificNames === 'object' ? `
                            <div class="scientific-names-section">
                                ${rule.scientificNames.text ? `<p>${rule.scientificNames.text}</p>` : ''}
                                ${rule.scientificNames.examples && Array.isArray(rule.scientificNames.examples) ? `
                                    <ul>
                                        ${rule.scientificNames.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${rule.scientificNames.note ? `<p class="note"><em>${rule.scientificNames.note}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.commonNames && typeof rule.commonNames === 'object' ? `
                            <div class="common-names-section">
                                ${rule.commonNames.text ? `<p>${rule.commonNames.text}</p>` : ''}
                                ${rule.commonNames.capitalized && Array.isArray(rule.commonNames.capitalized) ? `
                                    <div class="capitalized-common">
                                        <h5>Capitalized:</h5>
                                        <ul>
                                            ${rule.commonNames.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${rule.commonNames.lowercase && Array.isArray(rule.commonNames.lowercase) ? `
                                    <div class="lowercase-common">
                                        <h5>Lowercase:</h5>
                                        <ul>
                                            ${rule.commonNames.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.chemicalElements && typeof rule.chemicalElements === 'object' ? `
                            <div class="chemical-elements-section">
                                <h5>${rule.chemicalElements.title || 'Chemical elements and compounds'}</h5>
                                ${rule.chemicalElements.text ? `<p>${rule.chemicalElements.text}</p>` : ''}
                                ${rule.chemicalElements.examples && Array.isArray(rule.chemicalElements.examples) ? `
                                    <ul>
                                        ${rule.chemicalElements.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${rule.chemicalElements.note ? `<p class="note"><em>${rule.chemicalElements.note}</em></p>` : ''}
                                ${rule.chemicalElements.symbolExamples && Array.isArray(rule.chemicalElements.symbolExamples) ? `
                                    <div class="symbol-examples">
                                        <p><strong>Chemical symbols:</strong></p>
                                        <ul>
                                            ${rule.chemicalElements.symbolExamples.map(ex => `<li>${ex}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.medicalTerms && typeof rule.medicalTerms === 'object' ? `
                            <div class="medical-terms-section">
                                <h5>${rule.medicalTerms.title || 'Medical conditions and syndromes'}</h5>
                                ${rule.medicalTerms.text ? `<p>${rule.medicalTerms.text}</p>` : ''}
                                ${rule.medicalTerms.examples && Array.isArray(rule.medicalTerms.examples) ? `
                                    <ul>
                                        ${rule.medicalTerms.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.infectiousOrganisms && typeof rule.infectiousOrganisms === 'object' ? `
                            <div class="infectious-section">
                                <h5>${rule.infectiousOrganisms.title || 'Infectious organisms'}</h5>
                                ${rule.infectiousOrganisms.text ? `<p>${rule.infectiousOrganisms.text}</p>` : ''}
                                ${rule.infectiousOrganisms.example ? `<p class="example-text"><em>${rule.infectiousOrganisms.example}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.drugNames && typeof rule.drugNames === 'object' ? `
                            <div class="drug-names-section">
                                <h5>${rule.drugNames.title || 'Generic drug names'}</h5>
                                ${rule.drugNames.text ? `<p>${rule.drugNames.text}</p>` : ''}
                                ${rule.drugNames.examples && Array.isArray(rule.drugNames.examples) ? `
                                    <ul>
                                        ${rule.drugNames.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.shortForms && typeof rule.shortForms === 'object' ? `
                            <div class="short-forms-section">
                                ${rule.shortForms.text ? `<p>${rule.shortForms.text}</p>` : ''}
                                ${rule.shortForms.examples && Array.isArray(rule.shortForms.examples) ? `
                                    <ul>
                                        ${rule.shortForms.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${rule.shortForms.exception ? `<p class="exception"><strong>Exception:</strong> ${rule.shortForms.exception}</p>` : ''}
                                ${rule.shortForms.exceptionExample ? `<p class="example-text"><em>${rule.shortForms.exceptionExample}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.tradeNames && typeof rule.tradeNames === 'object' ? `
                            <div class="trade-names-section">
                                ${rule.tradeNames.text ? `<p>${rule.tradeNames.text}</p>` : ''}
                                ${rule.tradeNames.capitalized && Array.isArray(rule.tradeNames.capitalized) ? `
                                    <div class="capitalized-trades">
                                        <h5>Capitalized:</h5>
                                        <ul>
                                            ${rule.tradeNames.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${rule.tradeNames.lowercase && Array.isArray(rule.tradeNames.lowercase) ? `
                                    <div class="lowercase-trades">
                                        <h5>Lowercase:</h5>
                                        <ul>
                                            ${rule.tradeNames.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                                        </ul>
                                    </div>
                                ` : ''}
                                ${rule.tradeNames.note ? `<p class="note"><em>${rule.tradeNames.note}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.highTechProducts && typeof rule.highTechProducts === 'object' ? `
                            <div class="hightech-section">
                                ${rule.highTechProducts.text ? `<p>${rule.highTechProducts.text}</p>` : ''}
                                ${rule.highTechProducts.examples && Array.isArray(rule.highTechProducts.examples) ? `
                                    <ul>
                                        ${rule.highTechProducts.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.genericUseNote && typeof rule.genericUseNote === 'object' ? `
                            <div class="generic-use-note">
                                ${rule.genericUseNote.text ? `<p>${rule.genericUseNote.text}</p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.prefixes && typeof rule.prefixes === 'object' ? `
                            <div class="prefixes-section">
                                ${rule.prefixes.text ? `<p>${rule.prefixes.text}</p>` : ''}
                                ${rule.prefixes.examples && Array.isArray(rule.prefixes.examples) ? `
                                    <ul>
                                        ${rule.prefixes.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${rule.prefixes.reference ? `<p class="reference-text"><em>${rule.prefixes.reference}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.prepositionsAsOtherParts && typeof rule.prepositionsAsOtherParts === 'object' ? `
                            <div class="prepositions-section">
                                ${rule.prepositionsAsOtherParts.text ? `<p>${rule.prepositionsAsOtherParts.text}</p>` : ''}
                                ${rule.prepositionsAsOtherParts.examples && Array.isArray(rule.prepositionsAsOtherParts.examples) ? `
                                    <ul>
                                        ${rule.prepositionsAsOtherParts.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.shortTitles && typeof rule.shortTitles === 'object' ? `
                            <div class="short-titles-section">
                                ${rule.shortTitles.text ? `<p>${rule.shortTitles.text}</p>` : ''}
                                ${rule.shortTitles.example && typeof rule.shortTitles.example === 'object' ? `
                                    <div class="title-example">
                                        <p><strong>Full:</strong> ${rule.shortTitles.example.full || ''}</p>
                                        <p><strong>Short:</strong> ${rule.shortTitles.example.short || ''}</p>
                                    </div>
                                ` : ''}
                                ${rule.shortTitles.additionalExample ? `<p class="example-text"><em>${rule.shortTitles.additionalExample}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.allCapsOnTitlePage && typeof rule.allCapsOnTitlePage === 'object' ? `
                            <div class="allcaps-section">
                                ${rule.allCapsOnTitlePage.text ? `<p>${rule.allCapsOnTitlePage.text}</p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.ancientManuscripts && typeof rule.ancientManuscripts === 'object' ? `
                            <div class="ancient-manuscripts-section">
                                ${rule.ancientManuscripts.text ? `<p>${rule.ancientManuscripts.text}</p>` : ''}
                                ${rule.ancientManuscripts.examples && Array.isArray(rule.ancientManuscripts.examples) ? `
                                    <ul>
                                        ${rule.ancientManuscripts.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                                ${rule.ancientManuscripts.note ? `<p class="note"><em>${rule.ancientManuscripts.note}</em></p>` : ''}
                            </div>
                        ` : ''}
                        ${rule.hyphenatedCompounds && typeof rule.hyphenatedCompounds === 'object' ? `
                            <div class="hyphenated-section">
                                ${rule.hyphenatedCompounds.text ? `<p>${rule.hyphenatedCompounds.text}</p>` : ''}
                                ${rule.hyphenatedCompounds.examples && Array.isArray(rule.hyphenatedCompounds.examples) ? `
                                    <ul>
                                        ${rule.hyphenatedCompounds.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.but && Array.isArray(rule.but) ? `
                            <div class="but-section">
                                <p><strong>But:</strong></p>
                                <ul>
                                    ${rule.but.map(item => `<li>${item}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.examples && Array.isArray(rule.examples) ? `
                            <div class="examples-grid">
                                ${rule.examples.map(ex => {
                                    let exText = '';
                                    if (typeof ex === 'object' && ex !== null) {
                                        if (ex.base && ex.derived) {
                                            exText = `<strong>${ex.base}</strong> → ${ex.derived}`;
                                        } else if (ex.type && ex.title) {
                                            exText = `<strong>${ex.type}:</strong> ${ex.title}`;
                                        } else if (ex.specific && ex.general) {
                                            exText = `<strong>Specific:</strong> ${ex.specific}<br><strong>General:</strong> ${ex.general}`;
                                        } else if (ex.capitalized && ex.lowercase) {
                                            exText = `<strong>Capitalized:</strong> ${ex.capitalized}<br><strong>Lowercase:</strong> ${ex.lowercase}`;
                                        } else if (ex.text) {
                                            exText = ex.text;
                                        } else {
                                            exText = String(ex);
                                        }
                                    } else {
                                        exText = ex;
                                    }
                                    return `<span class="example-item">${exText}</span>`;
                                }).join('')}
                            </div>
                        ` : ''}
                        ${rule.counterExamples && Array.isArray(rule.counterExamples) ? `
                            <div class="counter-examples">
                                <ul>
                                    ${rule.counterExamples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.parallelExamples && Array.isArray(rule.parallelExamples) ? `
                            <div class="parallel-examples">
                                <ul>
                                    ${rule.parallelExamples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.lowercaseExamples && Array.isArray(rule.lowercaseExamples) ? `
                            <div class="lowercase-examples">
                                <p><strong>Lowercase examples:</strong></p>
                                <ul>
                                    ${rule.lowercaseExamples.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.lowercase && Array.isArray(rule.lowercase) ? `
                            <div class="lowercase-section">
                                <h4>Lowercase:</h4>
                                <ul>
                                    ${rule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.capitalized && Array.isArray(rule.capitalized) ? `
                            <div class="capitalized-section">
                                <h4>Capitalized:</h4>
                                <ul>
                                    ${rule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        ` : ''}
                        ${rule.capitalizedExamples && typeof rule.capitalizedExamples === 'object' && rule.capitalizedExamples.text ? `
                            <div class="capitalized-examples">
                                <p><strong>${rule.capitalizedExamples.text}</strong></p>
                                ${rule.capitalizedExamples.examples && Array.isArray(rule.capitalizedExamples.examples) ? `
                                    <ul>
                                        ${rule.capitalizedExamples.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.adjectivalUse && typeof rule.adjectivalUse === 'object' ? `
                            <div class="adjectival-use">
                                <p>${rule.adjectivalUse.text}</p>
                                ${rule.adjectivalUse.examples && Array.isArray(rule.adjectivalUse.examples) ? `
                                    <ul>
                                        ${rule.adjectivalUse.examples.map(ex => `<li>${ex}</li>`).join('')}
                                    </ul>
                                ` : ''}
                            </div>
                        ` : ''}
                        ${rule.titleExamples && Array.isArray(rule.titleExamples) ? `
                            <ul>
                                ${rule.titleExamples.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        ` : ''}
                        ${rule.exception && typeof rule.exception === 'string' ? `
                            <p class="exception"><strong>Exception:</strong> ${rule.exception}</p>
                        ` : ''}
                    </div>
                `;
            });
        }
    }
    
    // === NEW: mainRule (Chapter 4.04, 4.10 style - object with text and examples) ===
    if (content.mainRule && typeof content.mainRule === 'object') {
    html += `
        <div class="main-rule-section">
            ${content.mainRule.text ? `<p>${content.mainRule.text}</p>` : ''}
            ${content.mainRule.explanation ? `<p class="explanation">${content.mainRule.explanation}</p>` : ''}
            ${content.mainRule.examples && Array.isArray(content.mainRule.examples) ? `
                <div class="examples-section">
                    <h4>Examples</h4>
                    <ul>
                        ${content.mainRule.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${content.mainRule.capitalized && Array.isArray(content.mainRule.capitalized) ? `
                <div class="capitalized-section">
                    <h4>Capitalized:</h4>
                    <ul>
                        ${content.mainRule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            ${content.mainRule.lowercase && Array.isArray(content.mainRule.lowercase) ? `
                <div class="lowercase-section">
                    <h4>Lowercase:</h4>
                    <ul>
                        ${content.mainRule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
        </div>
        `;
    }
    
    // === NEW: mainRules (Chapter 4.07 style - array of rule objects) ===
    if (content.mainRules && Array.isArray(content.mainRules)) {
        content.mainRules.forEach(mainRule => {
            html += `
                <div class="main-rule-section">
                    ${mainRule.title ? `<h4>${mainRule.title}</h4>` : ''}
                    ${mainRule.text ? `<p>${mainRule.text}</p>` : ''}
                    ${mainRule.capitalized && Array.isArray(mainRule.capitalized) ? `
                        <div class="capitalized-section">
                            <h4>Capitalized:</h4>
                            <ul>
                                ${mainRule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${mainRule.lowercase && Array.isArray(mainRule.lowercase) ? `
                        <div class="lowercase-section">
                            <h4>Lowercase:</h4>
                            <ul>
                                ${mainRule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    ${mainRule.capitalized && typeof mainRule.capitalized === 'string' ? `
                        <p><strong>Capitalized:</strong> ${mainRule.capitalized}</p>
                    ` : ''}
                    ${mainRule.lowercase && typeof mainRule.lowercase === 'string' ? `
                        <p><strong>Lowercase:</strong> ${mainRule.lowercase}</p>
                    ` : ''}
                </div>
            `;
        });
    }
    
    // === NEW: remoteAssociation (Chapter 4.04 style) ===
    if (content.remoteAssociation && typeof content.remoteAssociation === 'object') {
        html += `
            <div class="remote-association-section">
                ${content.remoteAssociation.title ? `<h4>${content.remoteAssociation.title}</h4>` : ''}
                ${content.remoteAssociation.text ? `<p>${content.remoteAssociation.text}</p>` : ''}
                ${content.remoteAssociation.examples && Array.isArray(content.remoteAssociation.examples) ? `
                    <ul>
                        ${content.remoteAssociation.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // === NEW: verbs (Chapter 4.04 style - object with capitalized and lowercase arrays) ===
    if (content.verbs && typeof content.verbs === 'object') {
        html += `
            <div class="verbs-section">
                ${content.verbs.title ? `<h4>${content.verbs.title}</h4>` : ''}
                ${content.verbs.text ? `<p>${content.verbs.text}</p>` : ''}
                ${content.verbs.capitalized && Array.isArray(content.verbs.capitalized) ? `
                    <div class="capitalized-verbs">
                        <h5>Capitalized:</h5>
                        <ul>
                            ${content.verbs.capitalized.map(verb => `<li>${verb}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${content.verbs.lowercase && Array.isArray(content.verbs.lowercase) ? `
                    <div class="lowercase-verbs">
                        <h5>Lowercase:</h5>
                        <ul>
                            ${content.verbs.lowercase.map(verb => `<li>${verb}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // === NEW: warning (Chapter 4.04 style - standalone warning object) ===
    if (content.warning && typeof content.warning === 'object') {
        html += `
            <div class="warning-box">
                <h4>⚠ ${content.warning.type || 'Warning'}</h4>
                ${content.warning.text ? `<p>${content.warning.text}</p>` : ''}
            </div>
        `;
    }
    
    // === NEW: personifications (Chapter 4.09 style) ===
    if (content.personifications && typeof content.personifications === 'object') {
        html += `
            <div class="personifications-section">
                ${content.personifications.title ? `<h4>${content.personifications.title}</h4>` : ''}
                ${content.personifications.text ? `<p>${content.personifications.text}</p>` : ''}
                ${content.personifications.examples && Array.isArray(content.personifications.examples) ? `
                    <ul>
                        ${content.personifications.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // === NEW: abstractions (Chapter 4.09 style) ===
    if (content.abstractions && typeof content.abstractions === 'object') {
        html += `
            <div class="abstractions-section">
                ${content.abstractions.title ? `<h4>${content.abstractions.title}</h4>` : ''}
                ${content.abstractions.text ? `<p>${content.abstractions.text}</p>` : ''}
                ${content.abstractions.capitalized && Array.isArray(content.abstractions.capitalized) ? `
                    <div class="capitalized-abstractions">
                        <h5>Capitalized examples:</h5>
                        <ul>
                            ${content.abstractions.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // === Handle nested rule structures (Chapter 3 spelling rules) ===
    // These are rules stored as objects, not arrays
    const nestedRuleKeys = [
        'rule', 'rule1', 'rule2', 
        'exceptions', 'exceptions2', 'exception',
        'supersede', 'sedeVerb',
        'ceedVerbs', 'cedeVerbs',
        'iseWords', 'izeWords',
        'distinction', 'vowelYRule'
    ];
    
    nestedRuleKeys.forEach(key => {
        if (content[key] && typeof content[key] === 'object') {
            const ruleContent = content[key];
            
            html += `
                <div class="rule-subsection">
                    <h4>${ruleContent.title || ''}</h4>
                    ${ruleContent.text ? `<p>${ruleContent.text}</p>` : ''}
                    ${ruleContent.content ? `<p>${ruleContent.content}</p>` : ''}
            `;
            
            // Handle examples in the rule
            if (ruleContent.examples && Array.isArray(ruleContent.examples)) {
                html += `<ul>`;
                ruleContent.examples.forEach(ex => {
                    let exText = '';
                    if (typeof ex === 'object' && ex !== null) {
                        if (ex.base && ex.derived) {
                            exText = `<strong>${ex.base}</strong> → ${ex.derived}`;
                        } else if (ex.base && ex.suffix) {
                            exText = `<strong>${ex.base}</strong> → ${ex.suffix}`;
                        } else if (ex.base && ex.derivatives) {
                            exText = `<strong>${ex.base}</strong> → ${ex.derivatives}`;
                        } else if (ex.separate && ex.combined) {
                            exText = `${ex.separate} → <strong>${ex.combined}</strong>`;
                        } else if (ex.text) {
                            exText = ex.text;
                        } else if (ex.word) {
                            exText = ex.word;
                        } else {
                            exText = String(ex);
                        }
                    } else {
                        exText = ex;
                    }
                    html += `<li>${exText}</li>`;
                });
                html += `</ul>`;
            }
            
            // Handle words list (for ise/ize words, exceptions, etc.)
            if (ruleContent.words && Array.isArray(ruleContent.words)) {
                html += `<div class="words-grid">`;
                ruleContent.words.forEach(word => {
                    html += `<span class="word-item">${word}</span>`;
                });
                html += `</div>`;
            }
            
            // Handle verbs list (for sede/ceed/cede)
            if (ruleContent.verbs && Array.isArray(ruleContent.verbs)) {
                html += `<ul class="verbs-list">`;
                ruleContent.verbs.forEach(verb => {
                    html += `<li>${verb}</li>`;
                });
                html += `</ul>`;
            }
            
            // Handle note
            if (ruleContent.note) {
                html += `<p class="note"><em>${ruleContent.note}</em></p>`;
            }
            
            html += `</div>`;
        }
    });
    
    // Standard Spellings (Chapter 3)
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
    
    // Word Pairs (Chapter 3.05 - alternative to homonyms)
    if (content.wordPairs && Array.isArray(content.wordPairs)) {
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
        if (content.wordPairs.some(p => p.word3)) {
            html += `<th>Word 3</th><th>Meaning</th>`;
        }
        
        html += `
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        content.wordPairs.forEach(pair => {
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
            } else if (content.wordPairs.some(p => p.word3)) {
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
    if (content.rule && content.exampleWords) {
        html += `
            <div class="rule-box">
                <h4>Rule</h4>
                <p>${content.rule}</p>
            </div>
            <div class="examples-section">
                <h4>Examples</h4>
                <div class="words-grid">
        `;
        content.exampleWords.forEach(word => {
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
                ${content.searchReplaceExample.solution ? 
                    `<div class="solution-box">
                        <strong>Solution:</strong> ${content.searchReplaceExample.solution}
                    </div>` : ''}
            </div>
        `;
    }
    
    // Special Cases (for plurals, etc.)
    if (content.specialCases && Array.isArray(content.specialCases)) {
        html += `
            <div class="special-cases-section">
                <h4>Special Cases</h4>
                <ul>
        `;
        content.specialCases.forEach(caseItem => {
            if (typeof caseItem === 'object' && caseItem.singular && caseItem.plural) {
                html += `<li><strong>${caseItem.singular}</strong> → ${caseItem.plural}</li>`;
            } else {
                html += `<li>${caseItem}</li>`;
            }
        });
        html += `
                </ul>
            </div>
        `;
    }
    
    // Special Rule
    if (content.specialRule) {
        html += `
            <div class="key-principle">
                <h4>${content.specialRule.title || 'Special Rule'}</h4>
                <p>${content.specialRule.content || ''}</p>
                ${content.specialRule.examples && Array.isArray(content.specialRule.examples) ? `
                    <ul>
                        ${content.specialRule.examples.map(ex => {
                            const exText = typeof ex === 'object' ? (ex.text || String(ex)) : ex;
                            return `<li>${exText}</li>`;
                        }).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Additional Notes
    if (content.additionalNotes && Array.isArray(content.additionalNotes)) {
        html += `<ul>`;
        content.additionalNotes.forEach(note => {
            html += `<li>${note}</li>`;
        });
        html += `</ul>`;
    }
    
    // Order of Precedence (object with title, content, and order array)
    if (content.orderOfPrecedence) {
        html += `
            <div class="info-box">
                <h4>${content.orderOfPrecedence.title || 'Order of Precedence'}</h4>
                <p>${content.orderOfPrecedence.content || ''}</p>
                ${content.orderOfPrecedence.order && Array.isArray(content.orderOfPrecedence.order) ? `
                    <ul>
                        ${content.orderOfPrecedence.order.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Simple arrays (titles, ranks, degrees, provinces, etc.)
    const simpleArrayFields = [
        'titles', 'ranks', 'degrees', 'provinces', 'streetAbbreviations', 
        'compassPoints', 'monthAbbreviations', 'timeZones',
        'commonUnits', 'commonAbbreviations', 'capitalizationRules', 
        'exceptions', 'criticalRules', 
        'additionalUnits', 'incorrectAbbreviations', 'spacingRules'
    ];
    
    simpleArrayFields.forEach(field => {
        if (content[field] && Array.isArray(content[field])) {
            html += `<ul>`;
            content[field].forEach(item => {
                const itemText = typeof item === 'object' ? (item.text || String(item)) : item;
                html += `<li>${itemText}</li>`;
            });
            html += `</ul>`;
        }
    });
    
    // Base Units (array of objects)
    if (content.baseUnits && Array.isArray(content.baseUnits)) {
        html += `
            <div class="units-section">
                <table class="units-table">
                    <thead>
                        <tr>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Symbol</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        content.baseUnits.forEach(unit => {
            html += `
                <tr>
                    <td>${unit.quantity || ''}</td>
                    <td>${unit.unit || ''}</td>
                    <td><strong>${unit.symbol || ''}</strong></td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Symbols (array of objects)
    if (content.symbols && Array.isArray(content.symbols)) {
        html += `
            <div class="symbols-section">
                <table class="symbols-table">
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Meaning</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        content.symbols.forEach(symbol => {
            html += `
                <tr>
                    <td><strong>${symbol.symbol || ''}</strong></td>
                    <td>${symbol.meaning || ''}</td>
                    <td>${symbol.example || ''}</td>
                </tr>
            `;
        });
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    // Currency Symbols
    if (content.currencySymbols && Array.isArray(content.currencySymbols)) {
        html += `<ul>`;
        content.currencySymbols.forEach(symbol => {
            html += `<li>${symbol}</li>`;
        });
        html += `</ul>`;
    }
    
    // Definitions (array of objects)
    if (content.definitions && Array.isArray(content.definitions)) {
        html += `<ul>`;
        content.definitions.forEach(def => {
            html += `<li><strong>${def.term || ''}:</strong> ${def.definition || ''}</li>`;
        });
        html += `</ul>`;
    }
    
    // Derived Units
    if (content.derivedUnits) {
        html += `
            <div class="info-box">
                ${content.derivedUnits.note ? `<p>${content.derivedUnits.note}</p>` : ''}
                ${content.derivedUnits.exception ? `<p><strong>Exception:</strong> ${content.derivedUnits.exception}</p>` : ''}
            </div>
        `;
    }
    
    // Number Symbol
    if (content.numberSymbol) {
        html += `
            <div class="info-box">
                <h4>${content.numberSymbol.symbol || 'Number Symbol'}</h4>
                <p>${content.numberSymbol.usage || ''}</p>
                ${content.numberSymbol.examples && Array.isArray(content.numberSymbol.examples) ? `
                    <ul>
                        ${content.numberSymbol.examples.map(ex => {
                            const exText = typeof ex === 'object' ? (ex.text || String(ex)) : ex;
                            const exType = typeof ex === 'object' ? (ex.type || '') : '';
                            if (exType === 'correct' || exType === 'incorrect') {
                                return `<li class="${exType === 'correct' ? 'example-correct' : 'example-incorrect'}">${exText}</li>`;
                            }
                            return `<li>${exText}</li>`;
                        }).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Percent Symbol
    if (content.percentSymbol) {
        html += `
            <div class="info-box">
                <h4>${content.percentSymbol.symbol || 'Percent Symbol'}</h4>
                <p>${content.percentSymbol.usage || ''}</p>
                ${content.percentSymbol.examples && Array.isArray(content.percentSymbol.examples) ? `
                    <ul>
                        ${content.percentSymbol.examples.map(ex => {
                            const exText = typeof ex === 'object' ? (ex.text || String(ex)) : ex;
                            const exType = typeof ex === 'object' ? (ex.type || '') : '';
                            if (exType === 'correct' || exType === 'incorrect') {
                                return `<li class="${exType === 'correct' ? 'example-correct' : 'example-incorrect'}">${exText}</li>`;
                            }
                            return `<li>${exText}</li>`;
                        }).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Time of Day
    if (content.timeOfDay) {
        html += `
            <div class="info-box">
                <h4>${content.timeOfDay.title || 'Time of Day'}</h4>
                ${content.timeOfDay.formats && Array.isArray(content.timeOfDay.formats) ? `
                    <ul>
                        ${content.timeOfDay.formats.map(format => `<li>${format}</li>`).join('')}
                    </ul>
                ` : ''}
                ${content.timeOfDay.note ? `<p><em>${content.timeOfDay.note}</em></p>` : ''}
            </div>
        `;
    }
    
    // Elapsed Time
    if (content.elapsedTime) {
        html += `
            <div class="info-box">
                <h4>${content.elapsedTime.title || 'Elapsed Time'}</h4>
                ${content.elapsedTime.format ? `<p><strong>Format:</strong> ${content.elapsedTime.format}</p>` : ''}
                ${content.elapsedTime.examples && Array.isArray(content.elapsedTime.examples) ? `
                    <ul>
                        ${content.elapsedTime.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Format (simple string)
    if (content.format) {
        html += `<p><strong>Format:</strong> ${content.format}</p>`;
    }
    
    // Notes
    if (content.note && typeof content.note === 'string') {
        html += `<p class="note"><strong>Note:</strong> ${content.note}</p>`;
    }
    
    // British/American Differences (Chapter 3)
    if (content.britishAmericanDifferences) {
        html += `
            <div class="info-box">
                <h4>${content.britishAmericanDifferences.title}</h4>
        `;
        
        if (content.britishAmericanDifferences.patterns && Array.isArray(content.britishAmericanDifferences.patterns)) {
            content.britishAmericanDifferences.patterns.forEach(pattern => {
                html += `
                    <div class="pattern-section">
                        <h5>${pattern.category}</h5>
                        <div class="comparison-grid">
                            <div class="british-column">
                                <strong>British:</strong>
                                <ul>
                                    ${pattern.british.map(word => `<li>${word}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="american-column">
                                <strong>American:</strong>
                                <ul>
                                    ${pattern.american.map(word => `<li>${word}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                        ${pattern.note ? `<p class="note"><em>${pattern.note}</em></p>` : ''}
                    </div>
                `;
            });
        }
        
        html += `</div>`;
    }
    
    // Time zones reference (for Chapter 4.17)
    if (content.timeZonesReference && typeof content.timeZonesReference === 'object') {
        html += `
            <div class="reference-section">
                ${content.timeZonesReference.text ? `<p>${content.timeZonesReference.text}</p>` : ''}
            </div>
        `;
    }
    
    // Seas and Centuries (Chapter 4.17)
    if (content.seasonsAndCenturies && typeof content.seasonsAndCenturies === 'object') {
        html += `
            <div class="seasons-section">
                ${content.seasonsAndCenturies.text ? `<p>${content.seasonsAndCenturies.text}</p>` : ''}
                ${content.seasonsAndCenturies.lowercase && Array.isArray(content.seasonsAndCenturies.lowercase) ? `
                    <div class="lowercase-seasons">
                        <h5>Lowercase:</h5>
                        <ul>
                            ${content.seasonsAndCenturies.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${content.seasonsAndCenturies.capitalized && Array.isArray(content.seasonsAndCenturies.capitalized) ? `
                    <div class="capitalized-seasons">
                        <h5>Capitalized:</h5>
                        <ul>
                            ${content.seasonsAndCenturies.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    // Religious Events (Chapter 4.17)
    if (content.religiousEvents && typeof content.religiousEvents === 'object') {
        html += `
            <div class="religious-events-section">
                ${content.religiousEvents.text ? `<p>${content.religiousEvents.text}</p>` : ''}
                ${content.religiousEvents.examples && Array.isArray(content.religiousEvents.examples) ? `
                    <ul>
                        ${content.religiousEvents.examples.map(ex => `<li>${ex}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // Specific vs General (Chapter 4.17)
    if (content.specificVsGeneral && typeof content.specificVsGeneral === 'object') {
        html += `
            <div class="specific-vs-general-section">
                ${content.specificVsGeneral.text ? `<p>${content.specificVsGeneral.text}</p>` : ''}
                ${content.specificVsGeneral.examples && Array.isArray(content.specificVsGeneral.examples) ? `
                    <ul>
                        ${content.specificVsGeneral.examples.map(ex => {
                            if (typeof ex === 'object' && ex.specific && ex.general) {
                                return `<li><strong>Specific:</strong> ${ex.specific}<br><strong>General:</strong> ${ex.general}</li>`;
                            }
                            return `<li>${ex}</li>`;
                        }).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    }
    
    // General Principle (Chapter 4.18)
    if (content.generalPrinciple && typeof content.generalPrinciple === 'object') {
        html += `
            <div class="general-principle-section">
                ${content.generalPrinciple.text ? `<p>${content.generalPrinciple.text}</p>` : ''}
            </div>
        `;
    }
    
    // Lowercase Rule (Chapter 4.18)
    if (content.lowercaseRule && typeof content.lowercaseRule === 'object') {
        html += `
            <div class="lowercase-rule-section">
                ${content.lowercaseRule.text ? `<p>${content.lowercaseRule.text}</p>` : ''}
                ${content.lowercaseRule.lowercase && Array.isArray(content.lowercaseRule.lowercase) ? `
                    <div class="lowercase-items">
                        <h5>Lowercase:</h5>
                        <ul>
                            ${content.lowercaseRule.lowercase.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                ${content.lowercaseRule.capitalized && Array.isArray(content.lowercaseRule.capitalized) ? `
                    <div class="capitalized-items">
                        <h5>Capitalized:</h5>
                        <ul>
                            ${content.lowercaseRule.capitalized.map(ex => `<li>${ex}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
        `;
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
