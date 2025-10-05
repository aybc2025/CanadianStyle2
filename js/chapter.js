// ===================================
// Canadian Style Learner - Chapter.js
// ===================================

// Chapter data - In production, this would be loaded from chapter-01-data.json
const chapterData = {
  "id": 1,
  "number": "1",
  "title": "Abbreviations",
  "description": "Learn the proper use of abbreviations in Canadian government writing",
  "sections": [] // Will be populated
};

// Current state
let currentSection = 0;
let currentUser = null;
let userProgress = null;

// Initialize chapter page
document.addEventListener('DOMContentLoaded', function() {
    // Get chapter ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const chapterId = parseInt(urlParams.get('id')) || 1;
    
    // Load user data
    currentUser = window.auth.getCurrentUser();
    if (currentUser) {
        userProgress = window.auth.getUserProgress(currentUser.email);
    }
    
    // Load chapter data
    loadChapterData(chapterId);
    
    // Setup navigation
    setupNavigation();
});

// Load chapter data
async function loadChapterData(chapterId) {
    // In a real app, this would fetch from a JSON file
    // For now, we'll use inline data from the chapter-01-data artifact
    
    // Update header
    document.getElementById('chapterBadge').textContent = chapterData.number;
    document.getElementById('chapterTitle').textContent = chapterData.title;
    document.getElementById('chapterDescription').textContent = chapterData.description;
    
    // Create sections from the full content
    createSections();
    
    // Render section tabs
    renderSectionTabs();
    
    // Load first section (or saved position)
    const savedSection = getSavedSection(chapterId);
    loadSection(savedSection);
}

// Create sections from data
function createSections() {
    chapterData.sections = [
        { id: "1.01", title: "Introduction" },
        { id: "1.02", title: "General Guidelines and Observations" },
        { id: "1.03", title: "Periods" },
        { id: "1.04", title: "Plurals" },
        { id: "1.05", title: "Capital Letters and Hyphens" },
        { id: "1.06", title: "Titles Used with Personal Names" },
        { id: "1.07", title: "Military Abbreviations" },
        { id: "1.08", title: "University Degrees, Professional Designations, Honours and Awards" },
        { id: "1.09", title: "Geographical Names" },
        { id: "1.10", title: "Addresses: Streets and Buildings; Points of the Compass" },
        { id: "1.11", title: "Latitude and Longitude" },
        { id: "1.12", title: "Parts of a Book or Document" },
        { id: "1.13", title: "Latin Terms" },
        { id: "1.14", title: "Scientific and Technical Terms" },
        { id: "1.15", title: "Corporate Names" },
        { id: "1.16", title: "Acronyms and Initialisms" },
        { id: "1.17", title: "Number and Percentage Symbols" },
        { id: "1.18", title: "Ampersand" },
        { id: "1.19", title: "Monetary Units" },
        { id: "1.20", title: "Months and Days" },
        { id: "1.21", title: "Time of Day and Elapsed Time" },
        { id: "1.22", title: "Time Zones" },
        { id: "1.23", title: "The International System of Units (SI)" },
        { id: "1.24", title: "The Imperial System" },
        { id: "1.25", title: "Business Terms, Expressions and Symbols" }
    ];
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

// Render section content
function renderSectionContent(section) {
    const contentArea = document.getElementById('contentArea');
    
    // Get section content based on section ID
    const content = getSectionContent(section.id);
    
    contentArea.innerHTML = `
        <div class="section-header">
            <div class="section-number">Section ${section.id}</div>
            <h2 class="section-title">${section.title}</h2>
        </div>
        ${content}
    `;
}

// Get section content (simplified - full content would come from JSON)
// ================================================
// COMPLETE CHAPTER 1 CONTENT - ALL 25 SECTIONS
// Based on The Canadian Style PDF (Pages 19-34)
// ================================================

// This file contains the COMPLETE content mapping for getSectionContent()
// Replace the existing getSectionContent function in chapter.js with this

function getSectionContent(sectionId) {
    const contents = {
        "1.01": `
            <p>The use of abbreviations has gained greater acceptance as an increasing number of new products and organizations are identified by shorter and more easily recognizable word forms.</p>
            
            <p>In addition to abbreviations in the strict sense (including the short forms of common nouns, Latin expressions and titles), this chapter contains information and recommendations regarding acronyms, initialisms, and symbols such as those for metric units, which are uniform in many languages.</p>
        `,
        
        "1.02": `
            <p>Many abbreviations will not be understood unless the term is written in full at first mention, with the abbreviation given in parentheses. Follow these general rules:</p>
            
            <ul>
                <li>In general, abbreviate words only when the short form will be immediately recognized by the reader, and ensure that the same abbreviation is used elsewhere in your text to represent the word or words involved.</li>
                <li>Some standard abbreviations such as <em>i.e., AD, IQ, ESR, CBC</em> and <em>MP</em> do not have to be spelled out because they are well known and in many cases occur as dictionary entries.</li>
                <li>Many commonly used words that are actually abbreviations are now rarely regarded as such, including <em>ad, fridge, phone, exam, memo, photo</em> and <em>math</em>. Most such words should be avoided in formal writing, although <em>cello</em> and <em>bus</em> are exceptions to this rule.</li>
            </ul>
            
            <div class="key-principle">
                <h4>Key Principle</h4>
                <p>Unless you are confident that the reader will know exactly what the abbreviation stands for, write the term in full at first mention, with the abbreviation following in parentheses.</p>
            </div>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                Several government departments were amalgamated to form Public Works and Government Services Canada (PWGSC).
            </div>
            
            <div class="warning-box">
                <h4>Common Abbreviations That Don't Need Spelling Out</h4>
                <p>These are well-known abbreviations that rarely need to be defined:</p>
                <ul>
                    <li><strong>DNA</strong> - deoxyribonucleic acid</li>
                    <li><strong>HIV</strong> - human immunodeficiency virus</li>
                    <li><strong>3M</strong> - Minnesota Mining and Manufacturing Company</li>
                    <li><strong>RCMP</strong> - Royal Canadian Mounted Police</li>
                </ul>
            </div>
            
            <p><strong>If in doubt about the correct abbreviation, use the long form.</strong></p>
        `,
        
        "1.03": `
            <p>In recent years there has been a trend toward the omission of periods in abbreviations. This is particularly true of scientific and technical writing, but the practice has been spreading in general writing as well.</p>
            
            <h3>Do NOT Use Periods With:</h3>
            
            <ul>
                <li><strong>Chemical symbols and mathematical abbreviations</strong>: H₂O, NaCl, cos, log, tan</li>
                <li><strong>SI symbols and units</strong>: cm, kg, L (see section 1.23)</li>
                <li><strong>Compass points</strong> (except with street addresses): winds NNW but King St. E.</li>
                <li><strong>Military rank abbreviations</strong> used by the Department of National Defence (see 1.07)</li>
                <li><strong>Short forms of words</strong>: lab, flu, vet, stereo, expo</li>
                <li><strong>Abbreviations or acronyms consisting exclusively of upper-case letters</strong> or ending in an upper-case letter (except personal names, legal references and most place names): NAFTA, PhD, YMCA, UN, GST, MiG, CTV</li>
            </ul>
            
            <h3>DO Use Periods With:</h3>
            
            <ul>
                <li><strong>Geographical abbreviations</strong>: B.C., P.E.I. (but not Canada Post two-character symbols)</li>
                <li><strong>Most lower-case abbreviations</strong>: a.m., p.m., e.g., i.e. (mph is one exception)</li>
                <li><strong>Single word abbreviations</strong>: Mr., Jr., Ltd., misc., pp., Nos.</li>
                <li><strong>Multi-word terms</strong>: Rev. ed., R.I.P., Ph. D. (space required after each element)</li>
                <li><strong>Personal name initials</strong>: Thelonius S. Monk, H. E. Hughes (space between each period and following initial or name)</li>
            </ul>
            
            <div class="key-principle">
                <h4>Important Note</h4>
                <p>If a sentence ends in an abbreviation taking a period, only one period is used.</p>
            </div>
            
            <div class="example-box">
                The meeting will start at 9:30 a.m.
            </div>
            
            <p>For further information on spacing, see section 7.02.</p>
        `,
        
        "1.04": `
            <h3>Standard Plurals (Add s, no apostrophe)</h3>
            <p>Add an <strong>s</strong> without an apostrophe for most abbreviations:</p>
            <div class="example-box">
                ADMs, PCBs, CAs, MPs, 747s, BMWs
            </div>
            
            <h3>Plurals with Apostrophe</h3>
            <p>Use an apostrophe + s for numerical aircraft names ending in a single letter:</p>
            <div class="example-box">
                727-100C's, 747B's, 727-100's
            </div>
            
            <p>Use an apostrophe + s when confusion might arise:</p>
            <div class="example-box">
                c.o.d.'s, Q's and A's, SIN's
            </div>
            
            <p>Add apostrophe + s for abbreviations containing more than one period:</p>
            <div class="example-box">
                G.M.'s, Gens., pts.
            </div>
            
            <h3>Irregular Plurals</h3>
            <p>The plurals of Mr. and Mrs. are irregular:</p>
            <ul>
                <li>Mr. → <strong>Messrs.</strong></li>
                <li>Mrs. → <strong>Mmes.</strong></li>
            </ul>
            
            <h3>Bibliographic Abbreviations</h3>
            <p>Special plurals for bibliographic references:</p>
            <ul>
                <li>l. (line) → ll. (lines)</li>
                <li>p. (page) → pp. (pages)</li>
                <li>f. (and the one following) → ff. (and those following)</li>
                <li>c., ch. (chapter) → c., ch. (chapters)</li>
                <li>MS (manuscript) → MSS (manuscripts)</li>
            </ul>
            
            <p>But:</p>
            <ul>
                <li>s. (section) → ss. (sections)</li>
                <li>subs. (subsection) → subss. (subsections)</li>
            </ul>
            
            <div class="warning-box">
                <h4>SI/Metric Symbols</h4>
                <p>SI/metric symbols maintain the same form for both singular and plural and are written without periods, except at the end of a sentence:</p>
                <div class="example-box">
                    5 cm (NOT 5 cms)<br>
                    The boxer weighed only 75 kg.
                </div>
            </div>
        `,
        
        "1.05": `
            <p>In general, an abbreviation is capitalized or hyphenated if the unabbreviated word or words are so treated:</p>
            
            <div class="example-box">
                Lt.-Gov. → Lieutenant-Governor<br>
                MLA → Member of the Legislative Assembly<br>
                UBC → University of British Columbia
            </div>
            
            <h3>Special Capitalization Rule</h3>
            <p>When an abbreviation is formed from letters most or all of which are part of a single word, it is capitalized, even though the full term is not:</p>
            
            <div class="example-box">
                <strong>ACTH</strong> → adrenocorticotrophic hormone<br>
                <strong>DNA</strong> → deoxyribonucleic acid<br>
                <strong>ESP</strong> → extrasensory perception<br>
                <strong>TV</strong> → television
            </div>
			`,
            
            // ================================================
// COMPLETE CHAPTER 1 CONTENT - PART 2
// Sections 1.06 through 1.15
// ================================================

// ADD THESE TO THE contents OBJECT in getSectionContent():

        "1.06": `
            <p>Use the following abbreviations for non-military titles preceding or following personal names:</p>
            
            <div class="example-box">
                Mr., Mrs., Ms., Messrs., Mmes.<br>
                Dr., Hon., Rt. Hon.<br>
                Msgr., St., Prof., Rev.<br>
                Esq., Jr., Sr.
            </div>
            
            <div class="key-principle">
                <h4>Usage of Ms.</h4>
                <p>Use Ms. when referring to a woman unless a preference for Mrs. has been indicated. Although not an abbreviation, Ms. is written with a period, by analogy with Mr. and Mrs.</p>
                <p><strong>Note:</strong> Miss is not an abbreviation and does not take a period.</p>
            </div>
            
            <div class="warning-box">
                <h4>Important Rule</h4>
                <p>Do NOT use Mr., Mrs., Ms., Dr. or Esq. with any other abbreviated title or with an abbreviation for an academic degree.</p>
            </div>
            
            <h3>Examples</h3>
            
            <div class="example-box example-incorrect">
                <div class="example-label">✗ Incorrect</div>
                Dr. John Smith, Ph.D.
            </div>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                Dr. John Smith<br>
                <em>OR</em><br>
                John Smith, Ph.D.
            </div>
            
            <div class="example-box example-incorrect">
                <div class="example-label">✗ Incorrect</div>
                Mr. William Jones, Esq.
            </div>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                Mr. William Jones<br>
                <em>OR</em><br>
                William Jones, Esq.
            </div>
        `,
        
        "1.07": `
            <p>The Department of National Defence uses abbreviations for military ranks that are written without periods.</p>
            
            <h3>Common Military Rank Abbreviations</h3>
            
            <div class="example-box">
                <strong>Gen</strong> - General<br>
                <strong>Lt</strong> - Lieutenant<br>
                <strong>Col</strong> - Colonel<br>
                <strong>Maj</strong> - Major<br>
                <strong>Capt</strong> - Captain<br>
                <strong>Sgt</strong> - Sergeant<br>
                <strong>Cpl</strong> - Corporal<br>
                <strong>Pte</strong> - Private
            </div>
            
            <p><strong>Note:</strong> In formal military documents, consult the appropriate military style guide for complete lists and usage rules.</p>
        `,
        
        "1.08": `
            <h3>University Degrees</h3>
            <p>Common academic degree abbreviations:</p>
            
            <div class="example-box">
                <strong>B.A.</strong> - Bachelor of Arts<br>
                <strong>B.Sc.</strong> - Bachelor of Science<br>
                <strong>M.A.</strong> - Master of Arts<br>
                <strong>M.Sc.</strong> - Master of Science<br>
                <strong>M.B.A.</strong> - Master of Business Administration<br>
                <strong>Ph.D.</strong> - Doctor of Philosophy<br>
                <strong>LL.B.</strong> - Bachelor of Laws<br>
                <strong>LL.M.</strong> - Master of Laws<br>
                <strong>M.D.</strong> - Doctor of Medicine
            </div>
            
            <h3>Professional Designations</h3>
            <p>Examples include:</p>
            
            <div class="example-box">
                <strong>C.A.</strong> - Chartered Accountant<br>
                <strong>P.Eng.</strong> - Professional Engineer<br>
                <strong>C.M.A.</strong> - Certified Management Accountant
            </div>
            
            <h3>Honours and Awards</h3>
            <p>Canadian honours and military decorations:</p>
            
            <div class="example-box">
                <strong>C.C.</strong> - Companion of the Order of Canada<br>
                <strong>O.C.</strong> - Officer of the Order of Canada<br>
                <strong>C.M.</strong> - Member of the Order of Canada<br>
                <strong>V.C.</strong> - Victoria Cross<br>
                <strong>O.M.</strong> - Order of Merit
            </div>
            
            <div class="key-principle">
                <h4>Order of Precedence</h4>
                <p>When multiple designations follow a name, list them in order of precedence: military decorations and honours first, then university degrees, then professional designations, then memberships.</p>
            </div>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct Order</div>
                Jane Smith, V.C., Ph.D., P.Eng.
            </div>
        `,
        
        "1.09": `
            <p>Generally spell out names of countries, provinces, and territories in text.</p>
            
            <h3>When to Abbreviate Geographical Names</h3>
            <ul>
                <li>In addresses and lists</li>
                <li>When space is limited</li>
                <li>After well-known city names when needed for clarity</li>
            </ul>
            
            <h3>Canadian Provinces and Territories</h3>
            <p>Two sets of abbreviations exist:</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Province/Territory</th>
                        <th>Traditional</th>
                        <th>Canada Post</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Alberta</td><td>Alta.</td><td>AB</td></tr>
                    <tr><td>British Columbia</td><td>B.C.</td><td>BC</td></tr>
                    <tr><td>Manitoba</td><td>Man.</td><td>MB</td></tr>
                    <tr><td>New Brunswick</td><td>N.B.</td><td>NB</td></tr>
                    <tr><td>Newfoundland and Labrador</td><td>Nfld.</td><td>NF</td></tr>
                    <tr><td>Northwest Territories</td><td>N.W.T.</td><td>NT</td></tr>
                    <tr><td>Nova Scotia</td><td>N.S.</td><td>NS</td></tr>
                    <tr><td>Ontario</td><td>Ont.</td><td>ON</td></tr>
                    <tr><td>Prince Edward Island</td><td>P.E.I.</td><td>PE</td></tr>
                    <tr><td>Quebec</td><td>Que.</td><td>QC</td></tr>
                    <tr><td>Saskatchewan</td><td>Sask.</td><td>SK</td></tr>
                    <tr><td>Yukon Territory</td><td>Y.T.</td><td>YT</td></tr>
                </tbody>
            </table>
            
            <div class="key-principle">
                <h4>Usage Guidelines</h4>
                <p>Use <strong>traditional abbreviations</strong> for general purposes. Use <strong>Canada Post symbols</strong> only for mailing addresses.</p>
            </div>
            
            <div class="warning-box">
                <h4>Do NOT Abbreviate</h4>
                <p>Do not abbreviate words such as County, Fort, Mount, North, Point, Island, Port and Saint used as part of a proper noun, unless the official name shows the abbreviated form:</p>
                <ul>
                    <li>Mount Robson, B.C.</li>
                    <li>Fort Garry</li>
                    <li>Sable Island</li>
                    <li>St. John's, Nfld. (official spelling uses abbreviation)</li>
                    <li>Saint John, N.B. (official spelling uses full word)</li>
                    <li>Point Pelee</li>
                </ul>
            </div>
            
            <p>It is not necessary to use the provincial abbreviation after the names of well-known cities such as Vancouver, Winnipeg, Toronto, Ottawa and Fredericton. However, since the same name is often shared by several places, add the appropriate abbreviation in cases where doubt could arise.</p>
        `,
        
        "1.10": `
            <h3>Streets and Buildings</h3>
            
            <p>Words such as <em>Street, Avenue, Place, Road, Square, Boulevard, Terrace, Drive, Court</em> and <em>Building</em> are <strong>spelled out in general writing</strong> but may be abbreviated in footnotes, endnotes, sidenotes, tables and addresses.</p>
            
            <div class="example-box">
                He worked at the Journal Building.<br>
                Get off at Queen Street Station.
            </div>
            
            <div class="warning-box">
                <h4>Important Rule</h4>
                <p>If the word forms part of a longer name, do NOT abbreviate it under any circumstances.</p>
            </div>
            
            <h3>Points of the Compass</h3>
            
            <p>Abbreviate compass directions as follows:</p>
            
            <div class="example-box">
                <strong>N, S, E, W</strong><br>
                <strong>NE, NW, SE, SW</strong><br>
                <strong>NNW, ESE</strong> (and other combinations)
            </div>
            
            <h3>Usage Rules for Compass Points</h3>
            
            <ul>
                <li>In general writing, the abbreviations NE, NW, SE and SW may be used to denote town and city divisions</li>
                <li>The words north, south, east and west should always be spelled out in running text</li>
            </ul>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                NW Toronto<br>
                Ottawa east
            </div>
            
            <h3>In Street Addresses</h3>
            
            <p>In street addresses, abbreviated compass directions are NOT followed by a period:</p>
            
            <div class="example-box">
                75 BOOTH ST N
            </div>
            
            <p>Do NOT abbreviate words such as East, West, Southeast, Northwest when they appear BEFORE a street name:</p>
            
            <div class="example-box">
                150 East 52nd Street<br>
                111 Southeast Central Park Avenue
            </div>
        `,
        
        "1.11": `
            <p>Do NOT abbreviate the words <em>latitude</em> and <em>longitude</em> when used alone or in ordinary prose:</p>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                What is the latitude of the Tropic of Cancer?
            </div>
            
            <div class="example-box">
                The wreck was found at 36°7'25" north latitude and 15°24'00" west longitude.
            </div>
            
            <h3>In Technical Work</h3>
            
            <p>In technical work and when lists of co-ordinates are given, use the abbreviations <strong>lat.</strong> and <strong>long.</strong>:</p>
            
            <div class="example-box">
                lat. 42°15'30" N &nbsp;&nbsp; long. 89°17'45" W<br>
                lat. 18°40'16" S &nbsp;&nbsp; long. 20°19'22" E
            </div>
        `,
        
        "1.12": `
            <p>Capitalize, but do NOT abbreviate, parts of a document when followed by a number or letter:</p>
            
            <div class="example-box">
                Part 4, Table 14, Appendix C
            </div>
            
            <p>Smaller subdivisions such as <em>paragraph, line, page</em> and <em>verse</em> are also written in full but are NOT capitalized except in main headings.</p>
            
            <h3>In Footnotes, Endnotes, Bibliographies and Indexes</h3>
            
            <p>Words referring to parts of a publication should, in the interest of conciseness, be abbreviated:</p>
            
            <div class="example-box">
                <strong>abr.</strong> - abridged, abridgment<br>
                <strong>bk., bks.</strong> - book(s)<br>
                <strong>bull.</strong> - bulletin<br>
                <strong>c., ch.</strong> - chapter(s)<br>
                <strong>ed., eds.</strong> - edition(s), editor(s)<br>
                <strong>fig.</strong> - figure<br>
                <strong>fwd.</strong> - foreword<br>
                <strong>jour.</strong> - journal<br>
                <strong>mag.</strong> - magazine<br>
                <strong>pt., pts.</strong> - part(s)<br>
                <strong>ser.</strong> - series<br>
                <strong>supp.</strong> - supplement<br>
                <strong>vol., vols.</strong> - volume(s)
            </div>
        `,
        
        "1.13": `
            <p>Beware of confusing and misusing the following abbreviations:</p>
            
            <table>
                <thead>
                    <tr>
                        <th>Abbreviation</th>
                        <th>Meaning</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><strong>e.g.</strong></td><td>for example</td></tr>
                    <tr><td><strong>i.e.</strong></td><td>that is, specifically, namely</td></tr>
                    <tr><td><strong>etc.</strong></td><td>and so on</td></tr>
                    <tr><td><strong>et al.</strong></td><td>and others</td></tr>
                    <tr><td><strong>c., ca.</strong></td><td>about, approximately</td></tr>
                    <tr><td><strong>q.v.</strong></td><td>see this word (in cross-references)</td></tr>
                </tbody>
            </table>
            
            <div class="warning-box">
                <h4>Not Abbreviations!</h4>
                <p>Note that the following Latin terms are NOT abbreviations and are never followed by a period unless they are placed at the end of a sentence:</p>
                <div class="example-box">
                    ad hoc, et, ex, idem, in, infra, par, per, pro, re, sic, supra, via
                </div>
            </div>
        `,
        
        "1.14": `
            <p>There is a vast array of technical and scientific abbreviations such as those for mathematical ratios and operations, physical quantities and constants or statistical formulas and notations.</p>
            
            <h3>Biology</h3>
            
            <p>The Latin name for a genus is not abbreviated if used alone. When used with the species name, it is abbreviated as of the second reference. The species name is NOT abbreviated:</p>
            
            <div class="example-box">
                <strong>Clematis</strong> (genus)<br>
                <strong>Clematis virginiana</strong> (full scientific name at first reference)<br>
                <strong>C. virginiana</strong> (second and subsequent references)
            </div>
            
            <h3>Chemistry</h3>
            
            <p>In symbols for chemical elements, compounds and formulas, use subscript, not superscript, numerals:</p>
            
            <div class="example-box">
                H₂SO₄, SO₂
            </div>
            
            <p><strong>Note:</strong> Most unabridged dictionaries list such abbreviations. People working in specific disciplines should consult the appropriate manuals in their field.</p>
        `,
        
        "1.15": `
            <p>The following is a list of terms often abbreviated in the names of companies or business corporations. The abbreviated forms may be freely used in footnotes, tables or bibliographic references.</p>
            
            <div class="warning-box">
                <h4>Avoid in Body Text</h4>
                <p>Avoid using Assoc., Bros., Co. and Corp. within the body of your text.</p>
            </div>
            
            <h3>Common Corporate Abbreviations</h3>
            
            <div class="example-box">
                <strong>Ltd.</strong> - Limited<br>
                <strong>Inc.</strong> - Incorporated<br>
                <strong>Corp.</strong> - Corporation<br>
                <strong>Co.</strong> - Company<br>
                <strong>Bros.</strong> - Brothers<br>
                <strong>Assoc.</strong> - Associates, Association<br>
                <strong>&</strong> - and (in business names only)
            </div>
            
            <div class="key-principle">
                <h4>Usage Guidelines</h4>
                <p>Use the organization's preferred abbreviation or acronym. Respect the organization's capitalization and spacing preferences.</p>
            </div>
            
            <div class="example-box example-correct">
                <div class="example-label">✓ Correct</div>
                Smith & Sons Ltd. announced new products.
            </div>
        `,

"1.16": `
    <p>An acronym is a word formed from the initial letters or groups of letters of words in a set phrase or series of words. It is pronounced as a word:</p>
    
    <ul>
        <li><strong>NATO</strong> - North Atlantic Treaty Organization</li>
        <li><strong>radar</strong> - radio detecting and ranging</li>
        <li><strong>scuba</strong> - self-contained underwater breathing apparatus</li>
        <li><strong>laser</strong> - light amplification by stimulated emission of radiation</li>
    </ul>
    
    <p>An initialism is a group of initial letters used as an abbreviation for a name or expression. Each letter is pronounced separately:</p>
    
    <ul>
        <li><strong>CBC</strong> - Canadian Broadcasting Corporation</li>
        <li><strong>RCMP</strong> - Royal Canadian Mounted Police</li>
        <li><strong>GDP</strong> - gross domestic product</li>
        <li><strong>VIP</strong> - very important person</li>
    </ul>
    
    <div class="key-principle">
        <h4>Capitalization Rules</h4>
        <p>Use upper-case letters for acronyms or initialisms in their entirety, even if some of the component words or their parts are not normally capitalized—unless the organization concerned prefers lower case.</p>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        <strong>CAA</strong> - Canadian Automobile Association<br>
        <strong>FORTRAN</strong> - formula translation<br>
        <strong>CISTI</strong> - Canada Institute for Scientific and Technical Information
    </div>
    
    <h4>Special Cases</h4>
    
    <p><strong>Company acronyms:</strong> Acronyms of company names formed by using more than the initial letters usually have only the first letter capitalized:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        <strong>Alcan</strong> - Aluminum Company of Canada<br>
        <strong>Inco</strong> - International Nickel Company<br>
        <strong>Nabisco</strong> - National Biscuit Company<br>
        <strong>Nortel</strong> - Northern Telecom Ltd.<br>
        <strong>Stelco</strong> - Steel Company of Canada Ltd.
    </div>
    
    <p><strong>Common-noun acronyms:</strong> Acronyms treated as full-fledged words are written entirely in lower case without periods:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        radar, laser, scuba, sonar
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Important</div>
        <p>When using acronyms or initialisms such as <strong>SIN</strong> (social insurance number), <strong>PIN</strong> (personal identification number) or <strong>ISBN</strong> (International Standard Book Number), do not repeat the word "number".</p>
    </div>
    
    <div class="example-box example-incorrect">
        <div class="example-label">✗ Incorrect</div>
        Enter your SIN number
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        Enter your SIN<br>
        Enter your social insurance number
    </div>
`,

"1.17": `
    <h4>Number Symbol</h4>
    
    <p>When abbreviating the words "number" or "numbers" within the body of a text, use <strong>No.</strong> or <strong>Nos.</strong> but not the symbol <strong>#</strong>, which is generally reserved for tabular and statistical material.</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        Nos. 56-86 are missing.
    </div>
    
    <div class="example-box example-incorrect">
        <div class="example-label">✗ Incorrect</div>
        #56-86 are missing. (in running text)
    </div>
    
    <h4>Percent Symbol</h4>
    
    <p>Use the percent sign (%) in economic, financial, statistical or other documents where figures are abundant. In material of a general nature containing isolated references to percentages, the term is usually written out, except when used adjectivally.</p>
    
    <div class="key-principle">
        <h4>When to Use %</h4>
        <ul>
            <li>Technical and statistical documents</li>
            <li>Financial reports</li>
            <li>Economic analyses</li>
            <li>When used adjectivally (no space between numeral and %)</li>
        </ul>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        <strong>General text:</strong> The rate increased by 15 percent<br>
        <strong>Adjectival use:</strong> a 15% bond<br>
        <strong>Technical context:</strong> Growth rate: 3.5%
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Note</div>
        <p>When using the % symbol, there is no space between the numeral and the symbol: <strong>15%</strong> not <strong>15 %</strong></p>
    </div>
`,

"1.18": `
    <p>The ampersand (&) is properly used only when it forms part of a corporate name.</p>
    
    <div class="key-principle">
        <h4>Critical Rule</h4>
        <p>Use the ampersand ONLY in official company names where it appears as part of the legal name. Otherwise, always spell out "and".</p>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct - Corporate Names</div>
        The publisher was Ginn & Co.<br>
        The case is being defended by Collins, Smith, White & Jones.<br>
        AT&T Corp. announced new services.
    </div>
    
    <h4>Government Departments</h4>
    
    <p>Do NOT use the ampersand in federal department legal or applied titles:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        The Department of Public Works and Government Services<br>
        The Department of Indian Affairs and Northern Development
    </div>
    
    <div class="example-box example-incorrect">
        <div class="example-label">✗ Incorrect</div>
        The Department of Public Works & Government Services<br>
        The Department of Indian Affairs & Northern Development
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Common Mistakes</div>
        <ul>
            <li>Using & in general writing: "research & development" ✗</li>
            <li>Using & in government documents ✗</li>
            <li>Using & instead of "and" for convenience ✗</li>
        </ul>
    </div>
`,

"1.19": `
    <p>When it is necessary to distinguish dollar amounts in one currency from those in another, use the appropriate symbol with the figure in question.</p>
    
    <div class="key-principle">
        <h4>Currency Symbols</h4>
        <p>Use standard currency codes to distinguish between different dollar currencies:</p>
        <ul>
            <li><strong>C$</strong> or <strong>CAN$</strong> - Canadian dollars</li>
            <li><strong>US$</strong> - United States dollars</li>
            <li><strong>A$</strong> or <strong>AUD$</strong> - Australian dollars</li>
            <li><strong>NZ$</strong> - New Zealand dollars</li>
        </ul>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        The loan will be repaid in eighty instalments of C$650 (or CAN$650) each.<br><br>
        Please enclose a cheque in the amount of US$100.<br><br>
        The price is A$50 for Australian customers.
    </div>
    
    <h4>General Dollar Symbol</h4>
    
    <p>When the currency is clear from context (e.g., in Canadian documents discussing Canadian amounts), use the simple $ symbol:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Example</div>
        The total cost is $5,250.
    </div>
    
    <div class="note-box">
        <div class="note-label">📝 Note</div>
        <p>See sections 5.11 and 5.26 for further information on representing monetary units and amounts.</p>
    </div>
`,

"1.20": `
    <h4>Months</h4>
    
    <p>Always spell out the names of the months in the body of your text and in footnotes.</p>
    
    <div class="key-principle">
        <h4>When to Abbreviate Months</h4>
        <p>Months may be abbreviated ONLY in:</p>
        <ul>
            <li>Tabular matter</li>
            <li>Citations and references</li>
            <li>Forms</li>
            <li>Sidenotes</li>
        </ul>
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Special Rules</div>
        <ul>
            <li><strong>May</strong> should not be abbreviated</li>
            <li><strong>June</strong> and <strong>July</strong> are shortened only in military writing</li>
        </ul>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct - Body Text</div>
        The meeting was held on September 15, 2024.<br>
        We received the report in January.
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct - Tables/Forms</div>
        Jan., Feb., Mar., Apr., May, Jun. (military only), Jul. (military only), Aug., Sept., Oct., Nov., Dec.
    </div>
    
    <h4>Days of the Week</h4>
    
    <p>The names of the days of the week are not abbreviated, except in tables.</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct - Running Text</div>
        The conference begins on Monday and ends on Friday.
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct - Tables Only</div>
        Mon., Tue., Wed., Thu., Fri., Sat., Sun.
    </div>
`,

"1.21": `
    <h4>Time of Day</h4>
    
    <p>Present exact time as follows:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct Formats</div>
        11 a.m. or 11:00 a.m.<br>
        1 p.m. or 1:00 p.m.<br>
        3:30 p.m.<br>
        8:05 a.m.
    </div>
    
    <div class="key-principle">
        <h4>Formatting Rules</h4>
        <ul>
            <li>Use lowercase letters with periods: a.m., p.m.</li>
            <li>Include a space before a.m./p.m.</li>
            <li>For on-the-hour times, you may omit ":00"</li>
            <li>Always use colons between hours and minutes</li>
        </ul>
    </div>
    
    <h4>Elapsed Time</h4>
    
    <p>For elapsed time, use colons, periods and no spaces:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct Format</div>
        2:30:21.65<br>
        <em>(hours:minutes:seconds.tenths.hundredths)</em>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        The race was completed in 1:45:32.18<br>
        Total elapsed time: 3:22:15
    </div>
    
    <div class="note-box">
        <div class="note-label">📝 Reference</div>
        <p>See sections 5.12 and 5.13 for additional information on representing time.</p>
    </div>
`,

"1.22": `
    <p>Time zones are abbreviated when used with a specific time. Note that capitals are used, without periods. Otherwise they are written out in full.</p>
    
    <div class="key-principle">
        <h4>Formatting Rules</h4>
        <ul>
            <li>Use ALL CAPITALS for time zone abbreviations</li>
            <li>NO periods in abbreviations</li>
            <li>Spell out when not used with a specific time</li>
        </ul>
    </div>
    
    <h4>Canadian Time Zones</h4>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ With Specific Times</div>
        4:30 p.m. EST (Eastern Standard Time)<br>
        7:15 a.m. MST (Mountain Standard Time)<br>
        9:00 a.m. PST (Pacific Standard Time)<br>
        2:30 p.m. AST (Atlantic Standard Time)<br>
        1:00 p.m. CST (Central Standard Time)<br>
        12:30 p.m. NST (Newfoundland Standard Time)
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Written Out</div>
        The office operates on Pacific standard time.<br>
        We observe daylight saving time from March to November.
    </div>
    
    <h4>Daylight Saving Time</h4>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Abbreviations</div>
        EDT (Eastern Daylight Time)<br>
        MDT (Mountain Daylight Time)<br>
        PDT (Pacific Daylight Time)<br>
        ADT (Atlantic Daylight Time)<br>
        CDT (Central Daylight Time)
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Note</div>
        <p>When writing out "daylight saving time," use "saving" (singular), not "savings".</p>
    </div>
`,

"1.23": `
    <p>The International System of Units (SI), which has replaced other metric systems and is now used in Canada and many other countries, is a decimal-based system that includes units for physical quantities.</p>
    
    <h4>Seven Base Units in SI</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Unit Name</th>
                    <th>Symbol</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>length</td>
                    <td>metre</td>
                    <td>m</td>
                </tr>
                <tr>
                    <td>mass</td>
                    <td>kilogram</td>
                    <td>kg</td>
                </tr>
                <tr>
                    <td>time</td>
                    <td>second</td>
                    <td>s</td>
                </tr>
                <tr>
                    <td>electric current</td>
                    <td>ampere</td>
                    <td>A</td>
                </tr>
                <tr>
                    <td>thermodynamic temperature</td>
                    <td>kelvin</td>
                    <td>K</td>
                </tr>
                <tr>
                    <td>amount of substance</td>
                    <td>mole</td>
                    <td>mol</td>
                </tr>
                <tr>
                    <td>luminous intensity</td>
                    <td>candela</td>
                    <td>cd</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="key-principle">
        <h4>Capitalization Rules</h4>
        <p>When the symbol is used, its initial letter is capitalized if named after a scientist. When written in full, however, the unit name is in lower case.</p>
        <p><strong>Exception:</strong> Celsius takes an initial capital whether written in full or as a symbol.</p>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        H for henry (unit is lowercase, symbol is uppercase)<br>
        F for farad (unit is lowercase, symbol is uppercase)<br>
        °C for degree Celsius (both uppercase)
    </div>
    
    <h4>Derived Units</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>coulomb</td>
                    <td>C</td>
                    <td>quantity of electricity, electric charge</td>
                </tr>
                <tr>
                    <td>degree Celsius</td>
                    <td>°C</td>
                    <td>Celsius temperature</td>
                </tr>
                <tr>
                    <td>farad</td>
                    <td>F</td>
                    <td>capacitance</td>
                </tr>
                <tr>
                    <td>gray</td>
                    <td>Gy</td>
                    <td>absorbed dose of ionizing radiation</td>
                </tr>
                <tr>
                    <td>henry</td>
                    <td>H</td>
                    <td>inductance</td>
                </tr>
                <tr>
                    <td>hertz</td>
                    <td>Hz</td>
                    <td>frequency</td>
                </tr>
                <tr>
                    <td>joule</td>
                    <td>J</td>
                    <td>energy, work, quantity of heat</td>
                </tr>
                <tr>
                    <td>lumen</td>
                    <td>lm</td>
                    <td>luminous flux</td>
                </tr>
                <tr>
                    <td>lux</td>
                    <td>lx</td>
                    <td>illuminance</td>
                </tr>
                <tr>
                    <td>newton</td>
                    <td>N</td>
                    <td>force</td>
                </tr>
                <tr>
                    <td>ohm</td>
                    <td>Ω</td>
                    <td>electric resistance</td>
                </tr>
                <tr>
                    <td>pascal</td>
                    <td>Pa</td>
                    <td>pressure, stress</td>
                </tr>
                <tr>
                    <td>radian</td>
                    <td>rad</td>
                    <td>plane angle</td>
                </tr>
                <tr>
                    <td>siemens</td>
                    <td>S</td>
                    <td>electric conductance</td>
                </tr>
                <tr>
                    <td>sievert</td>
                    <td>Sv</td>
                    <td>dose equivalent of ionizing radiation</td>
                </tr>
                <tr>
                    <td>steradian</td>
                    <td>sr</td>
                    <td>solid angle</td>
                </tr>
                <tr>
                    <td>tesla</td>
                    <td>T</td>
                    <td>magnetic flux density</td>
                </tr>
                <tr>
                    <td>volt</td>
                    <td>V</td>
                    <td>electric potential, potential difference</td>
                </tr>
                <tr>
                    <td>watt</td>
                    <td>W</td>
                    <td>power, radiant flux</td>
                </tr>
                <tr>
                    <td>weber</td>
                    <td>Wb</td>
                    <td>magnetic flux</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <h4>Multiples and Submultiples</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Factor</th>
                    <th>Prefix</th>
                    <th>Symbol</th>
                    <th>Factor</th>
                    <th>Prefix</th>
                    <th>Symbol</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>10²⁴</td>
                    <td>yotta</td>
                    <td>Y</td>
                    <td>10⁻¹</td>
                    <td>deci</td>
                    <td>d</td>
                </tr>
                <tr>
                    <td>10²¹</td>
                    <td>zetta</td>
                    <td>Z</td>
                    <td>10⁻²</td>
                    <td>centi</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>10¹⁸</td>
                    <td>exa</td>
                    <td>E</td>
                    <td>10⁻³</td>
                    <td>milli</td>
                    <td>m</td>
                </tr>
                <tr>
                    <td>10¹⁵</td>
                    <td>peta</td>
                    <td>P</td>
                    <td>10⁻⁶</td>
                    <td>micro</td>
                    <td>μ</td>
                </tr>
                <tr>
                    <td>10¹²</td>
                    <td>tera</td>
                    <td>T</td>
                    <td>10⁻⁹</td>
                    <td>nano</td>
                    <td>n</td>
                </tr>
                <tr>
                    <td>10⁹</td>
                    <td>giga</td>
                    <td>G</td>
                    <td>10⁻¹²</td>
                    <td>pico</td>
                    <td>p</td>
                </tr>
                <tr>
                    <td>10⁶</td>
                    <td>mega</td>
                    <td>M</td>
                    <td>10⁻¹⁵</td>
                    <td>femto</td>
                    <td>f</td>
                </tr>
                <tr>
                    <td>10³</td>
                    <td>kilo</td>
                    <td>k</td>
                    <td>10⁻¹⁸</td>
                    <td>atto</td>
                    <td>a</td>
                </tr>
                <tr>
                    <td>10²</td>
                    <td>hecto</td>
                    <td>h</td>
                    <td>10⁻²¹</td>
                    <td>zepto</td>
                    <td>z</td>
                </tr>
                <tr>
                    <td>10¹</td>
                    <td>deca</td>
                    <td>da</td>
                    <td>10⁻²⁴</td>
                    <td>yocto</td>
                    <td>y</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="key-principle">
        <h4>Using Prefixes</h4>
        <ul>
            <li>Prefix and unit names are always spelled as one word: <strong>centimetre, kilogram, hectolitre</strong></li>
            <li>When symbols are used, run them together: <strong>5 cm, 4 kg, 7 hL</strong></li>
        </ul>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Examples</div>
        centimetre (not centi metre)<br>
        decagram (not deca gram)<br>
        hectolitre (not hecto litre)<br>
        kilopascal (not kilo pascal)
    </div>
    
    <h4>Spacing Rules</h4>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Important Spacing Rules</div>
        <ul>
            <li>When a symbol consists entirely of letters, leave a FULL SPACE between quantity and symbol: <strong>45 kg</strong> not 45kg</li>
            <li>When the symbol includes a non-letter character as well as a letter, leave NO SPACE: <strong>32°C</strong> not 32° C or 32 °C</li>
        </ul>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        45 kg, 100 m, 250 mL (space before symbol)<br>
        32°C, 45° (no space before degree symbol)
    </div>
    
    <h4>Additional Units Approved for Use with SI</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Quantity</th>
                    <th>Unit Name</th>
                    <th>Symbol</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td rowspan="4">time</td>
                    <td>minute</td>
                    <td>min</td>
                </tr>
                <tr>
                    <td>hour</td>
                    <td>h</td>
                </tr>
                <tr>
                    <td>day</td>
                    <td>d</td>
                </tr>
                <tr>
                    <td>year</td>
                    <td>a</td>
                </tr>
                <tr>
                    <td rowspan="4">plane angle</td>
                    <td>degree</td>
                    <td>°</td>
                </tr>
                <tr>
                    <td>minute</td>
                    <td>'</td>
                </tr>
                <tr>
                    <td>second</td>
                    <td>"</td>
                </tr>
                <tr>
                    <td>revolution</td>
                    <td>r</td>
                </tr>
                <tr>
                    <td>area</td>
                    <td>hectare</td>
                    <td>ha</td>
                </tr>
                <tr>
                    <td>volume</td>
                    <td>litre</td>
                    <td>L</td>
                </tr>
                <tr>
                    <td>mass</td>
                    <td>metric ton, tonne</td>
                    <td>t</td>
                </tr>
                <tr>
                    <td>linear density</td>
                    <td>tex</td>
                    <td>tex</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Note</div>
        <p>There is no standard symbol for <strong>week</strong> or <strong>month</strong>. These units should therefore always be spelled out in technical writing.</p>
    </div>
    
    <h4>Using Oblique (/) with SI Symbols</h4>
    
    <p>When a unit symbol is combined with a symbol for time, or with a derived unit implying a division, an oblique (/) separates the two:</p>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Correct</div>
        80 km/h (not 80 kmh or 80 kph)<br>
        1800 r/min (not 1800 rpm)<br>
        50 A/m (not 50 Am)<br>
        200 J/kg (not 200 Jkg)
    </div>
    
    <h4>Common Mistakes to Avoid</h4>
    
    <div class="example-box example-incorrect">
        <div class="example-label">✗ Never Use These</div>
        cc or cu. cm for cubic centimetre (use cm³)<br>
        kilo for kilogram (use kg)<br>
        amp for ampere (use A)<br>
        kph for kilometres per hour (use km/h)
    </div>
    
    <div class="note-box">
        <div class="note-label">📚 Reference</div>
        <p>More detailed information on the International System of Units (SI) can be found in the National Standard of Canada, <em>Canadian Metric Practice Guide</em> (CAN/CSA-Z234.1-89).</p>
    </div>
`,

"1.24": `
    <p>Abbreviations for imperial weights and measures take the same form for singular and plural. Area and volume in this system are usually expressed by means of the abbreviations <strong>sq.</strong> and <strong>cu.</strong> rather than a superscript numeral.</p>
    
    <div class="key-principle">
        <h4>Spacing Rule</h4>
        <p>Leave a space between <strong>sq.</strong> or <strong>cu.</strong> and the abbreviation that follows it.</p>
    </div>
    
    <h4>Common Imperial Abbreviations</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Measurement</th>
                    <th>Abbreviation</th>
                    <th>Example</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>foot/feet</td>
                    <td>ft.</td>
                    <td>1 ft., 10 ft.</td>
                </tr>
                <tr>
                    <td>inch/inches</td>
                    <td>in.</td>
                    <td>17 in.</td>
                </tr>
                <tr>
                    <td>yard/yards</td>
                    <td>yd.</td>
                    <td>38 yd.</td>
                </tr>
                <tr>
                    <td>mile/miles</td>
                    <td>mi.</td>
                    <td>1 mi., 100 mi.</td>
                </tr>
                <tr>
                    <td>ounce/ounces</td>
                    <td>oz.</td>
                    <td>4 oz.</td>
                </tr>
                <tr>
                    <td>pound/pounds</td>
                    <td>lb.</td>
                    <td>5 lb.</td>
                </tr>
                <tr>
                    <td>gallon/gallons</td>
                    <td>gal.</td>
                    <td>4 gal.</td>
                </tr>
                <tr>
                    <td>square feet</td>
                    <td>sq. ft.</td>
                    <td>100 sq. ft.</td>
                </tr>
                <tr>
                    <td>cubic yards</td>
                    <td>cu. yd.</td>
                    <td>20 cu. yd.</td>
                </tr>
                <tr>
                    <td>miles per hour</td>
                    <td>mph</td>
                    <td>55 mph</td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ Complete Examples</div>
        The room measures 12 ft. by 15 ft.<br>
        The package weighs 5 lb. 8 oz.<br>
        The speed limit is 55 mph.<br>
        We need 100 sq. ft. of carpet.<br>
        The container holds 20 cu. yd. of material.
    </div>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Important</div>
        <p>Note that imperial abbreviations take the same form for both singular and plural: 1 ft. and 10 ft. (not 10 fts.)</p>
    </div>
    
    <div class="note-box">
        <div class="note-label">📝 Canadian Context</div>
        <p>While Canada officially uses the metric system, imperial measurements are still commonly used in certain contexts (construction, some manufacturing, etc.). Always clarify which system you're using to avoid confusion.</p>
    </div>
`,

"1.25": `
    <p>Terms are often abbreviated for the purpose of conserving space in routine business correspondence. The following are common abbreviations used in tables and on business forms.</p>
    
    <div class="warning-box">
        <div class="warning-label">⚠ Usage Guidelines</div>
        <p>These abbreviations are appropriate for forms, tables, and routine business documents. In formal business writing, spell out the full terms.</p>
    </div>
    
    <h4>Common Business Abbreviations</h4>
    
    <div class="table-responsive">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Abbreviation</th>
                    <th>Full Term</th>
                    <th>Abbreviation</th>
                    <th>Full Term</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>acct.</td>
                    <td>account</td>
                    <td>bal.</td>
                    <td>balance</td>
                </tr>
                <tr>
                    <td>Assn.</td>
                    <td>Association</td>
                    <td>bldg.</td>
                    <td>building</td>
                </tr>
                <tr>
                    <td>CEO</td>
                    <td>chief executive officer</td>
                    <td>dis.</td>
                    <td>discount</td>
                </tr>
                <tr>
                    <td>cont.</td>
                    <td>continued</td>
                    <td>dtd.</td>
                    <td>dated</td>
                </tr>
                <tr>
                    <td>ea.</td>
                    <td>each</td>
                    <td>fwd.</td>
                    <td>forward</td>
                </tr>
                <tr>
                    <td>FY</td>
                    <td>fiscal year</td>
                    <td>G.M.</td>
                    <td>general manager</td>
                </tr>
                <tr>
                    <td>gr.</td>
                    <td>gross</td>
                    <td>hdlg.</td>
                    <td>handling</td>
                </tr>
                <tr>
                    <td>ins.</td>
                    <td>insurance</td>
                    <td>max.</td>
                    <td>maximum</td>
                </tr>
                <tr>
                    <td>Ltd.</td>
                    <td>Limited</td>
                    <td>n.d.</td>
                    <td>no date</td>
                </tr>
                <tr>
                    <td>min.</td>
                    <td>minimum</td>
                    <td>pd.</td>
                    <td>paid</td>
                </tr>
                <tr>
                    <td>oz.</td>
                    <td>ounce(s)</td>
                    <td>recd.</td>
                    <td>received</td>
                </tr>
                <tr>
                    <td>qty.</td>
                    <td>quantity</td>
                    <td>treas.</td>
                    <td>treasury, treasurer</td>
                </tr>
                <tr>
                    <td>sec.</td>
                    <td>secretary</td>
                    <td>V.P.</td>
                    <td>vice-president</td>
                </tr>
                <tr>
                    <td>whsle.</td>
                    <td>wholesale</td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
    
    <h4>Usage Examples</h4>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ On Forms and Tables</div>
        <strong>Invoice Details:</strong><br>
        Qty. 100 ea. @ $5.00<br>
        Dis. 10%<br>
        Bal. $450.00<br>
        Dtd. March 15, 2024
    </div>
    
    <div class="example-box example-correct">
        <div class="example-label">✓ In Business Documents</div>
        <strong>Meeting Attendees:</strong><br>
        J. Smith, CEO<br>
        M. Johnson, V.P. Sales<br>
        R. Williams, G.M.<br>
        S. Brown, Treas.
    </div>
    
    <div class="key-principle">
        <h4>When to Use Business Abbreviations</h4>
        <ul>
            <li>✓ Forms and order blanks</li>
            <li>✓ Tables and charts</li>
            <li>✓ Internal memos (when space is limited)</li>
            <li>✓ Financial documents and invoices</li>
            <li>✗ Formal business letters</li>
            <li>✗ Contracts and legal documents</li>
            <li>✗ External communications to clients</li>
        </ul>
    </div>
    
    <div class="note-box">
        <div class="note-label">📝 Professional Tip</div>
        <p>When in doubt, spell it out. Abbreviations save space but can reduce clarity. Use them judiciously and only when your audience will understand them immediately.</p>
    </div>
`
    };
    
    return contents[sectionId] || `<p>Content for section ${sectionId} is being prepared...</p>`;
}

// Update progress bar
function updateProgress() {
    const totalSections = chapterData.sections.length;
    const progressPercent = Math.round(((currentSection + 1) / totalSections) * 100);
    
    document.getElementById('progressText').textContent = 
        `Section ${currentSection + 1} of ${totalSections}`;
    document.getElementById('progressPercent').textContent = `${progressPercent}%`;
    
    const progressBar = document.getElementById('chapterProgressBar');
    progressBar.style.width = `${progressPercent}%`;
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
    
    // Next/Quiz button
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
