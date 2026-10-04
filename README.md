# Project 9: Toxic Comment Detector

A beginner-friendly web application for **Content Moderation & Toxicity Analysis**, classifying comments into **Safe** or **Potentially Toxic** across three categories: **Insult**, **Threat**, and **Offensive Language**. Built for the college subject **Text and Speech Analysis**.

> ℹ️ **Educational Disclaimer:** This application is strictly an educational demonstration of rule-based content moderation concepts. It is not a production-grade AI moderation system and does not claim 100% accuracy.

---

## 📌 1. Title
**Toxic Comment Detector**

## 📝 2. Description
The **Toxic Comment Detector** evaluates online comments, social media posts, and user reviews for toxic speech patterns. Using a weighted dictionary matrix categorizing toxic triggers, aggressive capitalization, and profanities, it calculates a Toxicity Risk Score (%) and flags specific suspicious terms.

## 🎯 3. Objectives
* Understand Content Moderation algorithms in Social Media NLP.
* Categorize toxic speech into sub-classes (Insult, Threat, Offensive Language).
* Build rule-based risk weighting matrices for viva defense.
* Highlight flagged vocabulary and offer preset sample comments.

## ✨ 4. Features
* **Safe vs. Potentially Toxic Classification:** Flags comments as Safe 🛡️ or Potentially Toxic ⚠️.
* **Toxicity Score Meter:** Displays percentage toxicity level on a visual risk progress bar.
* **Multi-Category Tagging:** Detects specific categories: Insult, Threat, Offensive Language, and Aggressive Caps.
* **Flagged Suspicious Words:** Highlights exact trigger terms present in the input text.
* **Preset Sample Comments:** Presets for Safe, Insult, Threat, and Offensive comment scenarios.
* **Educational Disclaimer:** Clear banner emphasizing educational project scope.

## 🛠️ 5. Technologies Used
* **HTML5:** Input form controls and semantic document tags.
* **CSS3:** Dark-theme cybersecurity aesthetic, risk progress bars, and category badges.
* **JavaScript (ES6+):** Multi-category dictionary lookup, RegEx pattern matching, and dynamic DOM rendering.

## 🔬 6. How It Works
1. **Comment Tokenization & Normalization:** Converts comment text to lower-case.
2. **Category Weight Mapping:** Scans text against 3 category keyword matrices (Insult, Threat, Offensive Language).
3. **Aggressive Caps Penalty:** Evaluates upper-case ratio for aggressive shouting patterns.
4. **Risk Score Normalization:** Sums category weights into a normalized Toxicity Score (0–100%).

## 🧠 7. Algorithm & Logic Explanation (Viva Defense)
The moderation engine uses a **Multi-Category Weighted Keyword Scoring Pipeline**:

$$\text{Toxicity Score} = \min\left( \sum w_i + \text{CapsPenalty}, 100\% \right)$$

* **Insult Category ($w = 30$):** Words like *"stupid"*, *"idiot"*, *"loser"*, *"useless"*.
* **Threat Category ($w = 45$):** Words like *"kill"*, *"hurt"*, *"destroy"*, *"attack"*.
* **Offensive Language ($w = 25$):** Words like *"shut up"*, *"trash"*, *"disgusting"*.
* **Aggressive Caps Penalty ($+20$ pts):** Applied if uppercase character ratio exceeds 50%.

## 📥 8. Installation / Setup
No installation required.
1. Download or clone this folder:
   ```bash
   git clone <repository-url>
   cd 09-toxic-comment-detector
   ```

## 🚀 9. How to Run
Open `index.html` in any web browser.

* Double-click `index.html` or open via VS Code Live Server.

## 💡 10. Example Input & Output

### Example 1: Threat & Insult Comment
* **Input:** `"Shut up idiot or I will find you and hurt you!"`
* **Output:**
  * **Classification:** POTENTIALLY TOXIC ⚠️
  * **Toxicity Score:** 100%
  * **Categories:** Threat, Insult, Offensive Language
  * **Flagged Words:** `shut up`, `idiot`, `hurt`

### Example 2: Safe Comment
* **Input:** `"Great article! Thanks for sharing these insights."`
* **Output:**
  * **Classification:** SAFE COMMENT 🛡️
  * **Toxicity Score:** 0%
  * **Categories:** None (Clean Content)

## 📁 11. Project Structure
```
09-toxic-comment-detector/
├── index.html        # HTML form interface
├── style.css         # Dark theme & risk meter styles
├── script.js         # Toxicity rule engine & category lexicons
└── README.md         # Detailed documentation
```

## ⚠️ 12. Limitations
* Uses a fixed dictionary; novel slang or circumvention (e.g. leetspeak `k!ll`) requires expanded regex.
* Does not evaluate context or subtle sarcasm.

## 🔮 13. Future Enhancements
* Implement leetspeak normalization (e.g., convert `f00l` -> `fool`).
* Integrate ML transformer models (e.g., Perspective API / BERT).
* Support sentence-level toxicity breakdown.

## 📷 14. Screenshots
*(Add project screenshots here when uploading to GitHub)*

```
+-----------------------------------------------------------+
|                   Toxic Comment Detector                  |
| [You are an idiot and a total loser...]                  |
|                                                           |
| Result: POTENTIALLY TOXIC ⚠️ (Score: 60%)                |
| Categories: Insult | Flagged: idiot, loser                |
+-----------------------------------------------------------+
```

## 📜 15. License
This project is open-source under the [MIT License](LICENSE). Created for college coursework.
