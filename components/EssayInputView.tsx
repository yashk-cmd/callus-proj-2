"use client";

import React, { useId } from "react";
import { DEMO_RESULT_STITCH, SAMPLE_ESL_ESSAY_TEXT, SAMPLE_HUMAN_ESSAY_TEXT } from "@/lib/mockData";

interface EssayInputViewProps {
  essayText: string;
  setEssayText: (text: string) => void;
  onRunAnalysis: () => void;
}

function countSentences(text: string): number {
  if (!text.trim()) return 0;
  const matches = text.match(/[^.!?]*[.!?]+/g);
  return matches ? matches.length : (text.trim().length > 0 ? 1 : 0);
}

export function EssayInputView({ essayText, setEssayText, onRunAnalysis }: EssayInputViewProps) {
  const textareaId = useId();
  const trimmed = essayText.trim();
  const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;
  const sentenceCount = countSentences(trimmed);
  const readingTime = Math.max(0, Math.ceil(wordCount / 200));
  const complexity = wordCount > 500 ? "High" : wordCount > 200 ? "Standard" : "Low";

  const handleClear = () => setEssayText("");

  return (
    <div className="flex flex-1 max-w-container-max w-full mx-auto px-margin-mobile md:px-margin-desktop py-8 gap-8 md:gap-12 relative">
      {/* Left Column: Essay Input */}
      <main className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-reading-column">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h1 className="font-display-lg text-display-lg text-primary mb-2">Input Essay</h1>
              <p className="font-ui-body text-on-surface-variant" style={{ fontSize: '16px', lineHeight: '24px' }}>
                Paste your admissions text below for comprehensive diagnostic analysis.
              </p>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                onClick={() => setEssayText(DEMO_RESULT_STITCH.rawText)}
                className="text-xs font-bold uppercase tracking-wider bg-surface-container hover:bg-surface-container-high text-primary px-3 py-1.5 rounded border border-outline-variant transition-colors"
                title="Load Demo Mixed Essay"
              >
                Load Demo Essay
              </button>
              <button
                onClick={handleClear}
                className="p-2 text-on-surface-variant hover:text-primary transition-colors hover:bg-surface-container rounded"
                title="Clear Text"
                aria-label="Clear Text"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            </div>
          </div>

          {/* Quick Sample Presets */}
          <div className="mb-4 flex flex-wrap gap-2 text-xs font-sans text-on-surface-variant items-center">
            <span className="font-bold uppercase tracking-wider text-outline" style={{ fontSize: '12px' }}>Quick Samples:</span>
            <button
              onClick={() => setEssayText(DEMO_RESULT_STITCH.rawText)}
              className="hover:underline text-primary font-medium"
            >
              1. Mixed AI/Human
            </button>
            <span className="text-outline-variant">•</span>
            <button
              onClick={() => setEssayText(SAMPLE_ESL_ESSAY_TEXT)}
              className="hover:underline text-primary font-medium"
            >
              2. ESL Template Pattern
            </button>
            <span className="text-outline-variant">•</span>
            <button
              onClick={() => setEssayText(SAMPLE_HUMAN_ESSAY_TEXT)}
              className="hover:underline text-primary font-medium"
            >
              3. Authentic Human
            </button>
          </div>

          {/* Editor Container */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded shadow-sm flex flex-col" style={{ height: '560px', minHeight: '380px' }}>
            {/* Editor Toolbar */}
            <div className="border-b border-outline-variant p-2 flex items-center gap-2 bg-surface-container-low rounded-t">
              <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors" title="Bold">
                <span className="material-symbols-outlined text-[18px]">format_bold</span>
              </button>
              <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors" title="Italic">
                <span className="material-symbols-outlined text-[18px]">format_italic</span>
              </button>
              <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors" title="Copy">
                <span className="material-symbols-outlined text-[18px]">content_copy</span>
              </button>
              <div className="w-px h-6 bg-outline-variant mx-1 self-center"></div>
              <button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-surface-container rounded transition-colors" title="Bullet list">
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
              </button>

              <div className="ml-auto font-mono text-xs text-on-surface-variant px-2" style={{ fontSize: '14px' }}>
                {wordCount} words
              </div>
            </div>

            {/* Textarea */}
            <label htmlFor={textareaId} className="sr-only">Admissions Essay Input</label>
            <textarea
              id={textareaId}
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              className="w-full flex-1 p-6 md:p-8 bg-transparent border-none resize-none focus:ring-0 focus:outline-none"
              style={{
                fontFamily: "'Noto Serif', Georgia, serif",
                fontSize: '18px',
                lineHeight: '32px',
                color: '#191c1e',
              }}
              placeholder="Begin typing or paste your essay here. The analyzer works best with texts over 150 words to accurately gauge tone, rhythm, and thematic coherence..."
            />
          </div>
        </div>
      </main>

      {/* Right Column: Sidebar Insights */}
      <aside className="w-full md:w-64 lg:w-[320px] shrink-0 hidden md:flex flex-col gap-6">
        {/* Essay Insights Card */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6 border-b border-outline-variant pb-4">
            <span className="material-symbols-outlined text-primary text-2xl">monitoring</span>
            <h2 className="font-sans font-semibold text-primary" style={{ fontSize: '24px', lineHeight: '32px' }}>Essay Insights</h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center py-2">
              <span className="font-sans text-on-surface-variant" style={{ fontSize: '16px' }}>Word Count</span>
              <span className="font-mono font-bold text-primary" style={{ fontSize: '14px' }}>{wordCount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-sans text-on-surface-variant" style={{ fontSize: '16px' }}>Sentence Count</span>
              <span className="font-mono font-bold text-primary" style={{ fontSize: '14px' }}>{sentenceCount}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="font-sans text-on-surface-variant" style={{ fontSize: '16px' }}>Est. Reading Time</span>
              <span className="font-mono font-bold text-primary" style={{ fontSize: '14px' }}>{readingTime} min</span>
            </div>
            <div className="flex justify-between items-center py-2 border-t border-outline-variant pt-4 mt-2">
              <span className="font-sans text-on-surface-variant" style={{ fontSize: '16px' }}>Analysis Complexity</span>
              <span className="font-mono font-medium text-on-surface-variant" style={{ fontSize: '14px' }}>{complexity}</span>
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={onRunAnalysis}
          disabled={wordCount === 0}
          className="w-full py-4 rounded font-sans font-bold shadow-sm flex justify-center items-center gap-2 group active:scale-[0.98] transition-all cursor-pointer"
          style={{
            fontSize: '16px',
            backgroundColor: wordCount > 0 ? '#1a2b4b' : '#eceef0',
            color: wordCount > 0 ? '#ffffff' : '#75777f',
          }}
        >
          Run Diagnostic Analysis
          <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[20px]">
            arrow_forward
          </span>
        </button>

        {/* Contextual Info */}
        <div className="bg-surface-container-low rounded p-4 flex gap-3" style={{ borderLeft: '2px solid #031635' }}>
          <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
          <p className="font-sans text-xs leading-normal text-on-surface-variant">
            Your essay is analyzed against a proprietary scholarly framework. Data is processed in-memory and not stored permanently without permission.
          </p>
        </div>
      </aside>
    </div>
  );
}
