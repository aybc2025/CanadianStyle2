// ===================================
// Chapter 1 Expanded Quiz - 25 Questions
// Covers ALL sections (1.01-1.25)
// ===================================

const chapter1ExpandedQuiz = {
    chapterId: 1,
    title: "Abbreviations",
    questions: [
        // ===== Section 1.02 - General Guidelines =====
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

        // ===== Section 1.03 - Periods =====
        {
            id: 2,
            section: "1.03",
            type: "true-false",
            question: "Abbreviations of single words generally take periods (e.g., govt., dept., Sept.).",
            options: ["True", "False"],
            correctAnswer: 0,
            explanation: "True. Abbreviations of single words generally take periods. Examples include govt., dept., Sept., etc."
        },

        // ===== Section 1.04 - Plurals =====
        {
            id: 3,
            section: "1.04",
            type: "single",
            question: "What is the correct plural form of 'p.' (page)?",
            options: [
                "p.s",
                "ps.",
                "pp.",
                "p.'s"
            ],
            correctAnswer: 2,
            explanation: "The correct plural of p. (page) is pp. (pages). Other examples: l. → ll. (lines), f. → ff. (following pages)."
        },

        // ===== Section 1.04 - SI Symbols =====
        {
            id: 4,
            section: "1.04",
            type: "true-false",
            question: "SI/metric symbols should take a plural 's' when representing multiple units (e.g., 5 cms, 75 kgs).",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. SI/metric symbols maintain the same form for both singular and plural: 5 cm (not 5 cms), 75 kg (not 75 kgs)."
        },

        // ===== Section 1.06 - Titles =====
        {
            id: 5,
            section: "1.06",
            type: "single",
            question: "What is the correct plural form of 'Mr.'?",
            options: [
                "Mr.s",
                "Mrs.",
                "Messrs.",
                "Misters"
            ],
            correctAnswer: 2,
            explanation: "The plural of Mr. is Messrs. This is used when addressing multiple men. Similarly, the plural of Mrs. is Mmes."
        },

        // ===== Section 1.07 - Military Abbreviations =====
        {
            id: 6,
            section: "1.07",
            type: "single",
            question: "How should you write a military rank like 'Lieutenant-Colonel'?",
            options: [
                "Lt. Col.",
                "Lt.-Col.",
                "LtCol",
                "Lt Col"
            ],
            correctAnswer: 1,
            explanation: "Military ranks with hyphens in the full form retain the hyphen in abbreviation: Lt.-Col. (Lieutenant-Colonel), Lt.-Cmdr. (Lieutenant-Commander)."
        },

        // ===== Section 1.08 - Academic Degrees =====
        {
            id: 7,
            section: "1.08",
            type: "true-false",
            question: "It is correct to write 'Dr. Jane Smith, Ph.D.' when listing someone with a doctorate.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Use either the title (Dr. Jane Smith) OR the degree (Jane Smith, Ph.D.), but not both together. They represent the same credential."
        },

        // ===== Section 1.09 - Geographical Names =====
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

        // ===== Section 1.10 - Addresses =====
        {
            id: 9,
            section: "1.10",
            type: "single",
            question: "What is the correct way to abbreviate 'Street' in an address?",
            options: [
                "Str.",
                "St.",
                "Strt.",
                "S."
            ],
            correctAnswer: 1,
            explanation: "The standard abbreviation for Street in addresses is St. Other common abbreviations: Ave. (Avenue), Rd. (Road), Blvd. (Boulevard)."
        },

        // ===== Section 1.11 - Latitude and Longitude =====
        {
            id: 10,
            section: "1.11",
            type: "single",
            question: "How should degrees of latitude be written?",
            options: [
                "45 degrees N",
                "45° N.",
                "45°N",
                "45 deg. N"
            ],
            correctAnswer: 2,
            explanation: "Latitude and longitude are written with the degree symbol directly attached to the number, followed by the direction with no space: 45°N, 75°W."
        },

        // ===== Section 1.12 - Parts of a Book =====
        {
            id: 11,
            section: "1.12",
            type: "single",
            question: "What is the correct abbreviation for 'chapter' when citing specific chapters?",
            options: [
                "chapt.",
                "chap.",
                "ch.",
                "c."
            ],
            correctAnswer: 2,
            explanation: "The standard abbreviation for chapter is ch. or c. Example: See ch. 3, p. 45."
        },

        // ===== Section 1.13 - Latin Terms =====
        {
            id: 12,
            section: "1.13",
            type: "single",
            question: "What does the abbreviation 'i.e.' mean?",
            options: [
                "for example",
                "that is",
                "and so forth",
                "compare"
            ],
            correctAnswer: 1,
            explanation: "i.e. means 'that is' (Latin: id est). It's used to clarify or rephrase. For 'for example,' use e.g. (exempli gratia)."
        },

        // ===== Section 1.13 - Latin Terms =====
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

        // ===== Section 1.14 - Scientific Terms =====
        {
            id: 14,
            section: "1.14",
            type: "true-false",
            question: "Scientific abbreviations like DNA, RNA, and DNA should be spelled out on first use.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Well-established scientific abbreviations like DNA, RNA, pH, and IQ are so widely recognized that they don't need to be spelled out."
        },

        // ===== Section 1.15 - Corporate Names =====
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

        // ===== Section 1.16 - Acronyms and Initialisms =====
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

        // ===== Section 1.16 - SIN/PIN Rule =====
        {
            id: 17,
            section: "1.16",
            type: "true-false",
            question: "It is correct to write 'Enter your PIN number' when asking for a personal identification number.",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. This creates redundancy since PIN already means 'Personal Identification Number.' Write either 'Enter your PIN' or 'Enter your personal identification number,' but not both."
        },

        // ===== Section 1.17 - Number Symbol =====
        {
            id: 18,
            section: "1.17",
            type: "single",
            question: "How should you abbreviate 'numbers' in body text?",
            options: [
                "Use # symbol",
                "Use No. or Nos.",
                "Use Num. or Nums.",
                "Use N or Ns"
            ],
            correctAnswer: 1,
            explanation: "In body text, use No. for 'number' and Nos. for 'numbers.' The # symbol is reserved for tabular and statistical material. Example: Nos. 56-86 are missing."
        },

        // ===== Section 1.17 - Percent Symbol =====
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

        // ===== Section 1.18 - Ampersand =====
        {
            id: 20,
            section: "1.18",
            type: "true-false",
            question: "The ampersand (&) should be used in federal department names like 'Public Works & Government Services.'",
            options: ["True", "False"],
            correctAnswer: 1,
            explanation: "False. Do NOT use the ampersand in federal department names. Write 'Public Works and Government Services.' Use & only when it's part of an official corporate name (e.g., AT&T, Smith & Jones)."
        },

        // ===== Section 1.19 - Monetary Units =====
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

        // ===== Section 1.20 - Months =====
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

        // ===== Section 1.21 - Time of Day =====
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

        // ===== Section 1.22 - Time Zones =====
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

        // ===== Section 1.23 - SI System =====
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

        // ===== Section 1.23 - SI Prefixes =====
        {
            id: 26,
            section: "1.23",
            type: "single",
            question: "What does the prefix 'kilo' (k) represent in the SI system?",
            options: [
                "10²",
                "10³",
                "10⁶",
                "10⁹"
            ],
            correctAnswer: 1,
            explanation: "Kilo (k) represents 10³ or 1,000. Other common prefixes: mega (M) = 10⁶, giga (G) = 10⁹, milli (m) = 10⁻³, micro (μ) = 10⁻⁶."
        },

        // ===== Section 1.23 - SI Derived Units =====
        {
            id: 27,
            section: "1.23",
            type: "single",
            question: "Which derived SI unit is used to measure pressure?",
            options: [
                "newton (N)",
                "pascal (Pa)",
                "joule (J)",
                "watt (W)"
            ],
            correctAnswer: 1,
            explanation: "Pascal (Pa) is the SI unit for pressure and stress. Newton (N) is force, joule (J) is energy, and watt (W) is power."
        },

        // ===== Section 1.23 - Combined Units =====
        {
            id: 28,
            section: "1.23",
            type: "single",
            question: "What is the correct way to write 'kilometres per hour'?",
            options: [
                "kmh or kph",
                "km/h",
                "k/h",
                "km-h"
            ],
            correctAnswer: 1,
            explanation: "When combining SI symbols with time or division, use an oblique (/): km/h (not kmh or kph). Other examples: r/min (not rpm), J/kg (not Jkg)."
        },

        // ===== Section 1.24 - Imperial System =====
        {
            id: 29,
            section: "1.24",
            type: "single",
            question: "How should you write 'square feet' using imperial abbreviations?",
            options: [
                "ft²",
                "sq. ft.",
                "sq.ft",
                "sqft"
            ],
            correctAnswer: 1,
            explanation: "In the imperial system, use 'sq.' for square and 'cu.' for cubic, with a space before the unit: 100 sq. ft., 20 cu. yd. Note the space between sq./cu. and the following abbreviation."
        },

        // ===== Section 1.25 - Business Terms =====
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

// Export for use in quiz.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = chapter1ExpandedQuiz;
}
