# Architecture Specification: VeritasAI Essay Signal Analyzer

**Stitch Design Source of Truth ID:** `7139261289792174650`  
**Design System Name:** Alexandria  
**Application Target:** College Admissions Essay AI Signal & Diagnostic Analyzer  

---

## 1. System Overview & Core Philosophy

VeritasAI is an advanced web application designed for analyzing college admissions essays and identifying specific passages, sentences, or phrases that exhibit statistical signals associated with machine-written or machine-polished text.

### Key Architectural Constraints & Non-Negotiables
1. **No Chatbot Wrapper:** The application explicitly avoids calling an LLM endpoint (e.g. OpenAI ChatGPT) with a prompt asking "Is this AI?".
2. **No Single "AI Percentage" Verdict:** The interface rejects giant percentage scores (e.g., "73% AI"). Instead, it presents passage-level signal distribution, review priority, and passage-level evidence.
3. **Mixed Human + Machine Writing Support:** Real admissions essays often contain original human drafting combined with localized AI polishing. Individual sentences carry independent diagnostic levels (Unflagged, Low Signal / Yellow, Moderate Signal / Orange, High Signal / Red).
4. **Decoupled API/Service Layer (`analysisService.ts`):** UI components consume a clean service abstraction. The mock heuristic backend can be replaced with a real PyTorch / HuggingFace FastAPI microservice without modifying frontend components.

---

## 2. Directory & Component Structure

```
c:\Users\yashk\OneDrive\Desktop\callus proj 2
├── app/
│   ├── layout.tsx                # Root layout (Navbar, Footer, Google Fonts)
│   ├── globals.css               # Design system rules, Google fonts, signal utilities
│   ├── page.tsx                  # Main Analyzer route (Input -> Loading -> Results)
│   ├── methodology/page.tsx      # Methodology & Statistical Signals screen
│   ├── dataset/page.tsx          # Dataset Transparency & Provenance screen
│   ├── evaluation/page.tsx       # Benchmark Evaluation & 3 Confident Failures
│   └── limitations/page.tsx      # Limitations & Ethical AI Charter screen
├── components/
│   ├── Navbar.tsx                # Top navigation header (Stitch theme)
│   ├── Footer.tsx                # Universal footer with ethics links
│   ├── EssayInputView.tsx        # Screen 1: Essay editor, toolbar, live insights sidebar
│   ├── LoadingStateView.tsx      # Screen 1 -> 2 transition: 6-step diagnostic progress
│   ├── AnalysisResultsView.tsx   # Screen 2: Split 7-col Document View + 5-col Evidence Panel
│   ├── MethodologyView.tsx       # Smoothness & Burstiness visual comparison charts
│   ├── DatasetView.tsx           # 1.2M document bento card & limitations
│   ├── EvaluationView.tsx        # Metrics + "Three Essays We Got Confidently Wrong"
│   └── LimitationsView.tsx       # Ethical Charter & L2 ESL writer protection rules
├── lib/
│   ├── types.ts                  # TypeScript interfaces (AnalysisResult, SentenceAnalysis, etc.)
│   ├── mockData.ts               # Deterministic sample essays (Stitch demo essay)
│   └── analysisService.ts        # Modular detection engine & service abstraction
├── tailwind.config.ts            # Stitch Alexandria design tokens (colors, fonts, radii)
├── ARCHITECTURE.md               # Technical architecture documentation (this file)
└── README.md                     # Project overview and run instructions
```

---

## 3. Design System & Token Architecture

The UI adheres strictly to the **Stitch Design ID `7139261289792174650`** tokens ("Alexandria"):

### Colors
* **Primary (Deep Navy):** `#031635`, `#1a2b4b`
* **Background & Surfaces:** `#f7f9fb` (Paper minimal background), `#ffffff` (Container lowest surface)
* **Diagnostic Signaling Palette:**
  * **Low Signal (Yellow):** `#f9e287` background / `#dcc66e` border / class `.signal-yellow`
  * **Medium Signal (Orange):** `#ffdcc5` background / `#ffb783` border / class `.signal-orange`
  * **High Signal (Red):** `#ffdad6` background / `#ba1a1a` border / class `.signal-red`
  * **Active Selection Highlight:** class `.signal-active` (`outline: 2px solid #031635`, `#d8e2ff` background)

### Typography
* **Primary Display & Reading Body:** `Noto Serif` (18px, generous line-height 32px for editorial reading)
* **UI Controls, Navigation & Headers:** `Hanken Grotesk` (contemporary clean sans-serif)
* **Analytical Data & Metrics:** `JetBrains Mono` (precision technical font)

---

## 4. Detection Pipeline & Service Abstraction (`lib/analysisService.ts`)

The service abstraction exposes three primary functions:

```typescript
export async function analyzeEssay(rawText: string): Promise<AnalysisResult>;
export function getPassageEvidence(result: AnalysisResult, sentenceId: string): SentenceAnalysis | null;
```

### Statistical Signals Computed
1. **Vocabulary Complexity (Perplexity):** Measures token sequence predictability. Low perplexity indicates highly smooth, expected word transitions.
2. **Sentence Rhythm (Burstiness):** Measures variance in sentence length. Uniform lengths indicate machine pacing; spiky lengths indicate authentic human drafting.
3. **Transitional Tropes:** Detects formulaic academic bridging phrases (e.g., *"Furthermore, it is imperative to consider"*, *"tapestry of"*, *"multifaceted dimensions"*).
4. **Reference Comparison:** Compares sentence statistics against a baseline of 1.2M admissions essays.

---

## 5. Passage Selection & State Flow

```
[User Pastes Essay]
        │
        ▼
[Click "Run Diagnostic Analysis"]
        │
        ▼
[LoadingStateView (6-Step Progress)]
        │
        ▼
[AnalysisResultsView Rendered]
  ├── Left: Document View (7 Cols)
  │     └── Click Sentence [s3]
  │             │
  │             ▼
  │     [setSelectedSentenceId('s3')]
  │             │
  └─────────────┼──────────────┐
                ▼              ▼
   [Highlight Sentence]  [Evidence Panel Updates (5 Cols)]
   - `.signal-active`     - Show Flagged Passage Quote
   - Ring #031635         - Display Perplexity/Burstiness
                          - Render Tropes & Explanation
```

---

## 6. Integration Guide for Real Backend Engine

To replace the demo heuristic engine with a production backend (e.g. Python FastAPI server running a RoBERTa / DeBERTa detection model):

1. Open `lib/analysisService.ts`.
2. Update `analyzeEssay` to perform an HTTP `POST` request to the microservice endpoint:
   ```typescript
   export async function analyzeEssay(rawText: string): Promise<AnalysisResult> {
     const response = await fetch('https://api.veritas.ai/v1/analyze', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ essay: rawText }),
     });
     return await response.json();
   }
   ```
3. Because all UI components consume `AnalysisResult` via standard props, zero UI component changes will be required.

---

## 7. Ethical Governance & False-Positive Mitigation

The architecture enforces strict safety guardrails:
* **Mandatory Human-in-the-Loop:** Detector metrics must never execute automated administrative decisions.
* **L2 / ESL Writer Risk Disclosure:** Explicit warnings regarding false positive elevated rates in non-native English writers due to structured grammar usage.
* **Empirical Transparency:** Includes public post-mortems of false positives ("Three Essays We Got Confidently Wrong").
