🛡️ VeritasAI

Statistical Admissions Essay Diagnostics

VeritasAI is a backend-driven admissions essay analysis platform designed to provide statistical writing diagnostics rather than claiming to determine whether a person or an AI wrote a document.

The system analyzes essays at the sentence level and combines multiple measurable signals, including:

Vocabulary smoothness / perplexity

Sentence rhythm / burstiness

Formulaic phrasing

Lexical predictability

Vocabulary diversity

Repeated-word behavior

Repeated n-gram behavior

The result is an evidence-oriented diagnostic report containing sentence-level scores, signal categories, review priority, and overall signal distribution.

⚠️ Important: VeritasAI is a statistical diagnostic system. It does not establish human or AI authorship with certainty.

📑 Table of Contents

Features

Architecture

Technology Stack

Project Structure

How the Analysis Works

Installation

Environment Verification

Running the Backend

API

Testing

Signal Framework

Scoring and Review Priority

Frontend Integration

Troubleshooting

Development Workflow

Detector Evaluation

Responsible Use

Limitations

Future Improvements

Production Checklist

Project Status

License

✨ Features

1. Sentence-Level Analysis

VeritasAI preserves submitted sentence text and analyzes each sentence independently.

Each sentence receives:

Sentence ID

Sentence index

Paragraph index

Original sentence text

Overall signal score

Primary diagnostic category

Individual signal evidence

Summary explanation

Example:

s3
Eventually, I learned that understanding why something breaks
can be more valuable than simply making it work.

2. Vocabulary Smoothness / Perplexity

VeritasAI uses a local language model to calculate token-level perplexity.

This provides information about how predictable or variable wording is under the selected language model.

Perplexity is treated as statistical evidence, not proof of AI authorship.

3. Sentence Rhythm / Burstiness

The system compares sentence lengths across the essay.

It considers:

Sentence word count

Essay-level sentence-length distribution

Coefficient of variation

Sentence rhythm variation

This helps identify unusually uniform or unusual sentence-length patterns.

4. Formulaic Phrasing

VeritasAI checks configured phrases and patterns that may represent common transitional or academic phrasing.

This signal is supplementary evidence.

A formulaic phrase by itself does not indicate machine-generated writing.

5. Lexical Predictability

The system evaluates lexical behavior using measurements such as:

Type-token ratio / vocabulary diversity

Repeated content-word ratio

Repeated trigram ratio

These provide additional statistical evidence about vocabulary variety and repetition.

6. Evidence-Based Results

Each analyzed sentence can contain multiple diagnostic signals.

A signal contains:

id
category
title
metricValue
flagLevel
description

This allows the frontend to explain why a passage received a particular score instead of displaying only a single unexplained number.

7. Review Priority

The document receives an overall review priority based on sentence-level flag levels.

Possible signal levels:

none
yellow
orange
red

The document-level distribution reports:

lowPct
mediumPct
highPct
normalPct

🏗️ Architecture

VeritasAI uses a layered architecture:

                    ┌──────────────────────┐
                    │      Frontend        │
                    │   Web Dashboard      │
                    └──────────┬───────────┘
                               │
                               │ HTTP / JSON
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │     API Routes       │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Analysis Pipeline   │
                    │   analyze_essay()    │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
       ┌────────────┐   ┌────────────┐   ┌────────────┐
       │ Perplexity │   │ Burstiness │   │   Tropes   │
       └────────────┘   └────────────┘   └────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │ Lexical Features &   │
                    │ Combined Scoring     │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │    AnalysisResult    │
                    │     JSON Response    │
                    └──────────────────────┘

Request flow

User enters essay
       ↓
Frontend sends JSON
       ↓
POST /api/analyze
       ↓
FastAPI route
       ↓
analyze_essay()
       ↓
Text normalization
       ↓
Sentence extraction
       ↓
Statistical analysis
       ↓
Sentence-level scoring
       ↓
Document classification
       ↓
AnalysisResult
       ↓
Frontend dashboard

🧰 Technology Stack

Backend

Technology

Purpose

Python 3.11

Backend runtime

FastAPI

REST API

Uvicorn

ASGI server

Pydantic

Request/response models

PyTorch

Machine-learning computation

Hugging Face Transformers

Language-model analysis

Tokenizers

Text tokenization

Analysis Layer

Component

Purpose

Local language model

Perplexity

Sentence-length statistics

Burstiness

Lexical statistics

Vocabulary/repetition analysis

Formulaic phrase detection

Tropes/formulaic phrasing

Combined statistical scoring

Sentence/document diagnostics

Frontend

The frontend communicates with the FastAPI backend through HTTP/JSON and presents:

Diagnostic overview

Review priority

Signal distribution

Sentence-level passages

Individual diagnostic evidence

Ethics / limitations information

📁 Project Structure

The backend structure described by the project is:

backend/
│
├── app/
│   ├── main.py
│   │
│   ├── models.py
│   │
│   ├── api/
│   │   └── routes.py
│   │
│   └── analysis/
│       ├── text.py
│       ├── pipeline.py
│       ├── perplexity.py
│       ├── features.py
│       ├── tropes.py
│       └── evidence.py
│
├── requirements.txt
├── test_pipeline.py
├── request.json
├── response.json
└── .venv/

Important modules

app/main.py

Creates the FastAPI application, configures CORS, registers routes, and exposes the health endpoint.

app/api/routes.py

Contains HTTP endpoints.

Main analysis endpoint:

POST /api/analyze

app/analysis/text.py

Responsible for:

Text normalization

Sentence boundary detection

Sentence extraction

Word tokenization

Paragraph indexing

Basic document statistics

A key design requirement is that sentence text is taken directly from normalized source text rather than reconstructed by joining tokens.

app/analysis/pipeline.py

Coordinates the complete analysis:

raw essay
    ↓
sentence extraction
    ↓
document statistics
    ↓
per-sentence analysis
    ↓
signal generation
    ↓
combined scoring
    ↓
document classification
    ↓
AnalysisResult

app/analysis/perplexity.py

Calculates language-model perplexity and produces the associated signal.

app/analysis/features.py

Calculates lexical features.

app/analysis/tropes.py

Detects configured formulaic phrases.

app/analysis/evidence.py

Builds diagnostic evidence and explanations.

app/models.py

Defines Pydantic request and response models.

🔬 How the Analysis Works

Step 1 — Input Validation

The API accepts:

{
  "essay": "...",
  "model_id": "custom"
}

Empty essays are rejected.

Very short essays are also rejected because they do not provide enough observations for meaningful document-level statistical interpretation.

Current minimum:

20 words

Step 2 — Text Normalization

The input is normalized without intentionally removing spaces inside sentences.

The normalization process handles:

CRLF line endings

CR line endings

Non-breaking spaces

Leading/trailing line whitespace

Repeated blank lines

Sentence text is extracted from direct character slices of the normalized document.

Step 3 — Sentence Boundary Detection

Sentence boundaries are detected using punctuation such as:

.
!
?

followed by whitespace or the end of the document.

Sentence spans are then used to obtain the actual sentence text.

This prevents sentence output from being reconstructed from tokenized words.

Step 4 — Sentence Features

For every sentence, VeritasAI calculates several independent signals:

Sentence
   │
   ├── Perplexity
   ├── Burstiness
   ├── Formulaic phrases
   └── Lexical predictability

Step 5 — Combined Score

The independent signals are combined into a sentence-level score.

The score is constrained to:

0.0 → 1.0

The result is then assigned a flag level according to the project's configured thresholds.

Step 6 — Document Classification

After all sentences are analyzed, VeritasAI calculates:

Signal distribution

Review priority

Reading time

Complexity

Summary message

The final object is returned as an AnalysisResult.

💻 Installation

For a complete installation guide, keep the project's installation.md alongside this README.

The short version is below.

🍎 macOS

1. Enter the backend

cd "/path/to/type2/backend"

2. Create the virtual environment

python3.11 -m venv .venv

3. Activate it

source .venv/bin/activate

4. Verify Python

which python
python -c "import sys; print(sys.executable)"

The path should contain:

backend/.venv/bin/python

5. Install dependencies

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

6. Verify PyTorch

python -c "import torch; print(torch.__version__)"

Expected project version:

2.8.0

7. Verify Transformers

python -c "import transformers; print(transformers.__version__)"

Expected project version:

4.55.4

🪟 Windows

Open PowerShell.

1. Enter the backend

cd "C:\path\to\type2\backend"

2. Create the virtual environment

py -3.11 -m venv .venv

3. Activate it

.\.venv\Scripts\Activate.ps1

If PowerShell blocks activation:

Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

Then:

.\.venv\Scripts\Activate.ps1

4. Install dependencies

python -m pip install --upgrade pip
python -m pip install -r requirements.txt

5. Verify PyTorch

python -c "import torch; print(torch.__version__)"

Expected project version:

2.8.0

✅ Environment Verification

Before starting the server, verify that Python is coming from .venv.

macOS

which python
python -c "import sys; print(sys.executable)"

Windows

where.exe python
python -c "import sys; print(sys.executable)"

If the result points to a system installation instead of .venv, fix the environment before continuing.

macOS Python Alias Issue

If the shell reports:

python: aliased to /usr/bin/python3

run:

unalias python
hash -r

Then:

which python
python -c "import sys; print(sys.executable)"

It should point into:

backend/.venv/

▶️ Running the Backend

From the backend directory with .venv activated:

python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

The API will be available at:

http://127.0.0.1:8000

Interactive FastAPI documentation:

http://127.0.0.1:8000/docs

🔌 API

Health Check

Endpoint

GET /health

Request

curl http://127.0.0.1:8000/health

Response

{
  "status": "ok",
  "service": "veritasai"
}

Analyze Essay

Endpoint

POST /api/analyze

Content-Type

application/json

Request body

{
  "essay": "Your essay text goes here.",
  "model_id": "custom"
}

🧪 Example API Request

Create request.json:

{
  "essay": "I have always been fascinated by technology. When I was younger, I built small projects with whatever materials I could find. One experiment failed repeatedly, but the failure taught me to approach problems differently. Eventually, I learned that understanding why something breaks can be more valuable than simply making it work.",
  "model_id": "custom"
}

Send on macOS/Linux:

curl -s -X POST http://127.0.0.1:8000/api/analyze \
-H "Content-Type: application/json" \
--data-binary @request.json

Save response:

curl -s -X POST http://127.0.0.1:8000/api/analyze \
-H "Content-Type: application/json" \
--data-binary @request.json \
-o response.json

📦 Example Response Structure

The API returns an object similar to:

{
  "id": "VER-XXXXXXXXXXXX",
  "title": "Admissions Essay Analysis",
  "processedAt": "2026-08-12 16:45 UTC",
  "rawText": "Essay text...",
  "wordCount": 51,
  "sentenceCount": 4,
  "readingTimeMinutes": 1,
  "analysisComplexity": "Low",
  "reviewPriority": "LOW",
  "distribution": {
    "lowPct": 0,
    "mediumPct": 0,
    "highPct": 0,
    "normalPct": 100
  },
  "sentences": [],
  "summaryMessage": "..."
}

Each sentence contains fields such as:

{
  "id": "s0",
  "index": 0,
  "paragraphIndex": 0,
  "text": "I have always been fascinated by technology.",
  "flagLevel": "none",
  "signalScore": 0.0,
  "passageCategory": "smoothness",
  "signals": [],
  "summaryExplanation": "..."
}

📊 Signal Framework

VeritasAI currently uses four major diagnostic groups.

1. Smoothness

Based primarily on language-model perplexity.

Example:

Vocabulary Smoothness
Perplexity: 44.85

This is statistical evidence, not authorship proof.

2. Burstiness

Measures sentence rhythm and sentence-length variation.

Example:

Sentence Rhythm
1.14 / 10 (CV 0.285)

A sentence is evaluated relative to the essay's sentence-length distribution.

3. Tropes

Detects configured formulaic phrases.

Example:

Formulaic Phrasing
0 detected

This is supplementary evidence and should not be interpreted independently.

4. Predictability

Uses lexical measurements such as:

TTR
Repeated content-word ratio
Repeated trigram ratio

Example:

TTR 0.86 | repetition 0.167

🚦 Flag Levels

The system uses:

none
yellow
orange
red

These represent increasing levels of statistical signal under the configured thresholds.

They should not be described to users as:

human
AI
definitely AI
definitely human

Correct interpretation:

Statistical evidence requiring different levels of review

📈 Scoring and Review Priority

The sentence score is represented as:

0.0 → 1.0

The score is based on multiple independent signals.

The document then aggregates sentence-level flag levels to calculate a distribution.

Example:

Low Signal        4%
Medium Signal     0%
High Signal       0%
Natural/Unflagged 96%

The exact interpretation depends on the project's configured thresholds.

🌐 Frontend Integration

The frontend sends the essay to:

POST http://127.0.0.1:8000/api/analyze

with:

{
  "essay": "...",
  "model_id": "custom"
}

The frontend can render:

Document ID

Word Count

Sentence Count

Review Priority

Signal Distribution

Sentence Diagnostics

Each sentence can be displayed as an expandable diagnostic passage.

CORS

The FastAPI application supports local frontend development origins such as:

http://localhost:3000
http://127.0.0.1:3000

For production deployment, configure allowed origins for the actual deployed frontend domain.

🧪 Testing

1. Syntax Test

python -m py_compile app/analysis/pipeline.py

You can also compile:

python -m py_compile app/analysis/text.py

2. Pipeline Test

python test_pipeline.py

A successful test should preserve sentence text.

Expected example:

s0 'I have always been fascinated by technology.'
s1 'When I was younger, I built small projects with whatever materials I could find.'
s2 'One experiment failed repeatedly, but the failure taught me to approach problems differently.'
s3 'Eventually, I learned that understanding why something breaks can be more valuable than simply making it work.'

3. API Test

Start the server:

python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

Check:

curl http://127.0.0.1:8000/health

Then:

curl -s -X POST http://127.0.0.1:8000/api/analyze \
-H "Content-Type: application/json" \
--data-binary @request.json

4. Sentence Preservation Test

A key regression test is that sentence text must preserve spaces.

from app.analysis.text import extract_sentences

essay = (
    "Eventually, I learned that understanding why something "
    "breaks can be more valuable than simply making it work."
)

sentences = extract_sentences(essay)

print(repr(sentences[0].text))
print("understanding why" in sentences[0].text)
print("understandingwhy" in sentences[0].text)

Expected:

True
False

The system should preserve:

understanding why

rather than:

understandingwhy

🔧 Troubleshooting

ModuleNotFoundError: No module named 'torch'

First check:

which python
python -c "import sys; print(sys.executable)"

Then:

python -m pip show torch

The Python executable must point to:

backend/.venv/

If necessary on macOS:

.venv/bin/python -m pip install -r requirements.txt

Windows:

.\.venv\Scripts\python.exe -m pip install -r requirements.txt

source venv/bin/activate fails

The project uses:

.venv

Use:

source .venv/bin/activate

not:

source venv/bin/activate

Port 8000 is already in use

macOS

lsof -nP -iTCP:8000 -sTCP:LISTEN

Then kill the numeric PID:

kill -9 <PID>

Windows

netstat -ano | findstr :8000

Then:

taskkill /PID <PID> /F

Do not type the placeholder literally.

Transformers warning

You may see:

loss_type=None was set in the config but it is unrecognised.
Using the default loss: ForCausalLMLoss.

If analysis still completes successfully, this is a Transformers configuration warning rather than a Python import failure.

It should be cleaned up before production so logs remain clean and model configuration is explicit.

🔄 Development Workflow

Recommended workflow:

1. Activate .venv
        ↓
2. Install/update requirements
        ↓
3. Run syntax checks
        ↓
4. Run pipeline tests
        ↓
5. Start FastAPI
        ↓
6. Test /health
        ↓
7. Test /api/analyze
        ↓
8. Start frontend
        ↓
9. Test complete UI flow
        ↓
10. Evaluate detector quality

🧪 Detector Evaluation

Functional correctness and detector quality are different problems.

The fact that the API successfully returns:

Scores

Signals

Sentences

Distribution

does not prove that the detector can reliably distinguish writing patterns.

A proper evaluation should use multiple controlled datasets.

Dataset A — Human-written

Use genuinely human-authored essays.

Dataset B — AI-generated

Use newly generated essays without manually rewriting them.

Dataset C — Mixed

Combine human-written and AI-generated passages.

Dataset D — Edited AI

Use AI-generated writing that has been manually edited.

Compare:

Perplexity

Burstiness

Formulaic phrases

Lexical predictability

Combined score

Flag distribution

Review priority

Do not tune thresholds against a single essay.

⚖️ Responsible Use

VeritasAI should be used as a review-support system, not as an automatic authorship judge.

Statistical writing characteristics can occur in:

Human writing

AI-assisted writing

Edited writing

Academic writing

Technical writing

Highly polished writing

Non-native English writing

Therefore, a statistical signal should not automatically trigger:

Punishment

Rejection

An accusation of misconduct

The intended workflow is:

Statistical signal
       ↓
Human review
       ↓
Contextual evidence
       ↓
Informed decision

Not:

High score
    ↓
"AI"
    ↓
Automatic rejection

⚠️ Limitations

1. Statistical signals are not proof

No individual signal establishes authorship.

2. Short text is unreliable

Short documents contain too few observations for strong statistical interpretation.

The current backend therefore requires a minimum text length for analysis.

3. Perplexity depends on the model

Perplexity values are meaningful only within the context of the language model and configuration used to calculate them.

4. Writing style varies naturally

A person can naturally produce highly predictable, formulaic, or uniform writing.

Likewise, AI-generated writing can be edited to resemble human writing.

5. Thresholds require validation

Score thresholds should be calibrated using representative evaluation data rather than arbitrary assumptions.

🚀 Future Improvements

Detection Quality

Larger evaluation datasets

Human/AI/mixed benchmark sets

Threshold calibration

ROC/PR analysis

Precision/recall measurement

False-positive analysis

False-negative analysis

Language Support

Multilingual models

Language-specific tokenization

Language-specific baselines

Analysis

Sentence-level embeddings

Stylometric features

Character-level statistics

Dependency patterns

More robust phrase detection

Reference-corpus comparison

Engineering

Automated test suite

CI/CD

Structured logging

Better exception handling

Model caching

Performance profiling

Batch analysis

Production configuration management

Frontend

Interactive evidence panel

Sentence highlighting

Signal explanations

Exportable reports

Comparison between revisions

Evaluation history

🛡️ Production Checklist

Before production deployment:

Validate detector against a representative dataset

Calibrate thresholds

Measure false positives

Measure false negatives

Remove development-only CORS origins

Remove debug logging

Resolve Transformers configuration warning

Add automated tests

Add production environment variables

Configure secure API access

Add rate limiting if required

Configure production logging

Test frontend/backend integration

Test large essays

Test malformed requests

Test empty input

Test very short input

Document known limitations

⚡ Quick Start

For an already configured development machine:

macOS

cd "/path/to/type2/backend"
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

Windows PowerShell

cd "C:\path\to\type2\backend"
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000

Then:

curl http://127.0.0.1:8000/health

Expected:

{
  "status": "ok",
  "service": "veritasai"
}

📌 Project Status

The current development implementation supports:

FastAPI backend

Pydantic request/response models

Sentence extraction

Text normalization

Perplexity analysis

Burstiness analysis

Formulaic phrase detection

Lexical feature analysis

Sentence-level scoring

Document-level distribution

Review priority

JSON API response

Health endpoint

Frontend dashboard integration

macOS installation documentation

Windows installation documentation

Large-scale detector evaluation

Threshold calibration

Production deployment hardening

📝 GitHub Repository Setup

After adding this README to the repository:

git status
git add README.md
git commit -m "docs: add comprehensive VeritasAI README"
git push origin main

Before pushing, check that you are not committing:

.venv/
.env
__pycache__/
*.pyc
node_modules/
.next/

A suitable .gitignore should contain:

# Python
.venv/
venv/
__pycache__/
*.py[cod]

# Environment
.env
.env.*

# Node
node_modules/
.next/

# macOS
.DS_Store

# Logs
*.log

# Generated API test files
response.json

Keep request.json only if you intentionally want it as a public example. Otherwise use a sanitized example file such as request.example.json.

🤝 Contributing

Fork the repository.

Create a feature branch:

git checkout -b feature/your-feature

Make your changes.

Run the relevant tests.

Commit:

git add .
git commit -m "feat: describe your change"

Push:

git push origin feature/your-feature

Open a Pull Request.

Commit style examples

feat: add lexical diversity metric
fix: preserve sentence whitespace
docs: update installation instructions
test: add sentence preservation regression test
refactor: simplify scoring pipeline

📄 License

Add the project's actual license here before publishing the repository.

If the project is not yet licensed, do not claim an open-source license without explicitly choosing one.

⚖️ Disclaimer

VeritasAI provides statistical diagnostics about writing characteristics.

It does not provide definitive authorship attribution and should not be represented as a system capable of proving that an essay was written by a human or generated by an AI system.

Results should be interpreted as signals for further review, not as definitive conclusions.

<div align="center">

🛡️ VeritasAI

Statistical diagnostics. Human judgment.

Built with Python · FastAPI · PyTorch · Transformers

</div>
