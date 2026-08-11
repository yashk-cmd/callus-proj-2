"use client";

import React, { useState } from "react";
import { EssayInputView } from "@/components/EssayInputView";
import { LoadingStateView } from "@/components/LoadingStateView";
import { AnalysisResultsView } from "@/components/AnalysisResultsView";
import { DEMO_RESULT_STITCH } from "@/lib/mockData";
import { analyzeEssay } from "@/lib/analysisService";
import { AnalysisResult } from "@/lib/types";

export default function HomePage() {
  const [viewState, setViewState] = useState<"input" | "loading" | "results">("input");
  const [essayText, setEssayText] = useState<string>(DEMO_RESULT_STITCH.rawText);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(DEMO_RESULT_STITCH);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunAnalysis = () => {
    if (!essayText.trim()) return;
    setErrorMsg(null);
    setViewState("loading");
  };

  const handleLoadingComplete = async () => {
    try {
      const res = await analyzeEssay(essayText);
      setAnalysisResult(res);
      setViewState("results");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to analyze essay.");
      setViewState("input");
    }
  };

  const handleReset = () => {
    setViewState("input");
  };

  return (
    <div className="flex-1 flex flex-col">
      {errorMsg && (
        <div className="bg-error-container text-on-error-container p-4 text-center font-ui-body text-xs font-bold border-b border-error">
          {errorMsg}
        </div>
      )}

      {viewState === "input" && (
        <EssayInputView
          essayText={essayText}
          setEssayText={setEssayText}
          onRunAnalysis={handleRunAnalysis}
        />
      )}

      {viewState === "loading" && (
        <LoadingStateView onComplete={handleLoadingComplete} />
      )}

      {viewState === "results" && analysisResult && (
        <AnalysisResultsView result={analysisResult} onReset={handleReset} />
      )}
    </div>
  );
}
