/**
 * 09 - TOXIC COMMENT DETECTOR
 * Multi-Category Content Moderation Engine
 */

// Toxicity Category Lexicons with Weights
const toxicityCategories = {
    insult: {
        label: "Insult",
        weight: 30,
        words: ["stupid", "idiot", "fool", "dumb", "loser", "ugly", "useless", "jerk", "moron", "pathetic", "clown", "garbage"]
    },
    threat: {
        label: "Threat",
        weight: 45,
        words: ["kill", "hurt", "destroy", "attack", "punch", "smash", "find you", "hunt", "murder", "stab", "shoot", "revenge"]
    },
    offensive: {
        label: "Offensive Language",
        weight: 25,
        words: ["shut up", "trash", "hate you", "disgusting", "nasty", "gross", "scam", "cheat", "scumbag", "creep", "freak"]
    }
};

// Preset Samples
const sampleComments = {
    safe: "Great article! Thanks for sharing these insights, really learned a lot.",
    insult: "You are such an idiot and a total loser, nobody cares about your opinion.",
    threat: "Shut up or I will find you and hurt you badly!",
    offensive: "This content is absolute trash and disgusting, get out of here!"
};

// DOM Elements
const commentInput = document.getElementById('commentInput');
const charCount = document.getElementById('charCount');
const wordCount = document.getElementById('wordCount');
const analyzeBtn = document.getElementById('analyzeBtn');
const clearBtn = document.getElementById('clearBtn');
const presetButtons = document.querySelectorAll('.btn-preset');
const resultsSection = document.getElementById('resultsSection');

// Result Output Elements
const resultEmoji = document.getElementById('resultEmoji');
const resultTitle = document.getElementById('resultTitle');
const toxicityScoreEl = document.getElementById('toxicityScore');
const riskMeter = document.getElementById('riskMeter');
const detectedCategoriesEl = document.getElementById('detectedCategories');
const suspiciousWordsEl = document.getElementById('suspiciousWords');

// Counter Listener
commentInput.addEventListener('input', () => {
    const text = commentInput.value;
    charCount.textContent = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    wordCount.textContent = words;
});

// Preset Buttons Listener
presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-type');
        if (sampleComments[type]) {
            commentInput.value = sampleComments[type];
            commentInput.dispatchEvent(new Event('input'));
            analyzeComment();
        }
    });
});

// Action Buttons
analyzeBtn.addEventListener('click', analyzeComment);

clearBtn.addEventListener('click', () => {
    commentInput.value = '';
    commentInput.dispatchEvent(new Event('input'));
    resultsSection.classList.add('hidden');
});

/**
 * Main Toxicity Classification Logic
 */
function analyzeComment() {
    const text = commentInput.value.trim();
    if (!text) {
        alert('Please enter a comment to analyze!');
        return;
    }

    const lowerText = text.toLowerCase();
    let totalRiskPoints = 0;
    let detectedCategories = new Set();
    let flaggedWords = [];

    // Scan for keywords per category
    for (const catKey in toxicityCategories) {
        const category = toxicityCategories[catKey];
        category.words.forEach(word => {
            if (lowerText.includes(word)) {
                totalRiskPoints += category.weight;
                detectedCategories.add(category.label);
                flaggedWords.push(word);
            }
        });
    }

    // Caps ratio penalty (aggressive yelling)
    const alphaChars = text.replace(/[^a-zA-Z]/g, '');
    if (alphaChars.length > 8) {
        const uppercaseCount = text.replace(/[^A-Z]/g, '').length;
        const capsRatio = uppercaseCount / alphaChars.length;
        if (capsRatio > 0.5) {
            totalRiskPoints += 20;
            detectedCategories.add("Excessive Aggressive Caps");
        }
    }

    // Normalize score to percentage (0% to 100%)
    const finalToxicityScore = Math.min(totalRiskPoints, 100);
    const isToxic = finalToxicityScore >= 35;

    // Render Classification Card
    resultEmoji.textContent = isToxic ? '⚠️' : '🛡️';
    resultTitle.textContent = isToxic ? 'POTENTIALLY TOXIC' : 'SAFE COMMENT';
    resultTitle.className = `status-title ${isToxic ? 'status-toxic' : 'status-safe'}`;

    toxicityScoreEl.textContent = `${finalToxicityScore}%`;
    riskMeter.style.width = `${finalToxicityScore}%`;
    riskMeter.style.background = isToxic ? '#ef4444' : '#22c55e';

    // Render Categories
    detectedCategoriesEl.innerHTML = '';
    if (detectedCategories.size === 0) {
        detectedCategoriesEl.innerHTML = '<span class="no-tags">None (Clean Content)</span>';
    } else {
        detectedCategories.forEach(cat => {
            const span = document.createElement('span');
            span.className = 'tag tag-cat';
            span.textContent = cat;
            detectedCategoriesEl.appendChild(span);
        });
    }

    // Render Flagged Words
    suspiciousWordsEl.innerHTML = '';
    if (flaggedWords.length === 0) {
        suspiciousWordsEl.innerHTML = '<span class="no-tags">No offensive or toxic words found</span>';
    } else {
        const uniqueWords = [...new Set(flaggedWords)];
        uniqueWords.forEach(w => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = w;
            suspiciousWordsEl.appendChild(span);
        });
    }

    resultsSection.classList.remove('hidden');
}
