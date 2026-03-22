import { useState, useEffect, useCallback } from "react";
import type { Question, OptionKey, QuizResult } from "../types";

const STORAGE_KEY = "pakdrive_stats";

interface Stats {
  totalAttempted: number;
  totalCorrect: number;
  testsCompleted: number;
  bestScore: number;
  lastScore: number;
  streak: number;
  lastDate: string;
  masteredIds: number[];
}

function loadStats(): Stats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Stats;
  } catch { /* ignore */ }
  return {
    totalAttempted: 0,
    totalCorrect: 0,
    testsCompleted: 0,
    bestScore: 0,
    lastScore: 0,
    streak: 0,
    lastDate: "",
    masteredIds: [],
  };
}

function saveStats(stats: Stats) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function useStats() {
  const [stats, setStats] = useState<Stats>(loadStats);

  const recordResult = useCallback((result: QuizResult) => {
    setStats((prev) => {
      const today = new Date().toISOString().slice(0, 10);
      const streak = prev.lastDate === today ? prev.streak : (
        isYesterday(prev.lastDate) ? prev.streak + 1 : 1
      );

      const correctIds = result.questions
        .filter((q) => result.answers[q.id] === q.correct_option)
        .map((q) => q.id);

      const masteredIds = [...new Set([...prev.masteredIds, ...correctIds])];

      const next: Stats = {
        totalAttempted: prev.totalAttempted + result.totalQuestions,
        totalCorrect: prev.totalCorrect + result.correct,
        testsCompleted: prev.testsCompleted + 1,
        bestScore: Math.max(prev.bestScore, result.score),
        lastScore: result.score,
        streak,
        lastDate: today,
        masteredIds,
      };
      saveStats(next);
      return next;
    });
  }, []);

  return { stats, recordResult };
}

function isYesterday(dateStr: string): boolean {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toISOString().slice(0, 10) === yesterday.toISOString().slice(0, 10);
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/questions.json")
      .then((r) => r.json())
      .then((data: Question[]) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return { questions, loading };
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pickQuestions(all: Question[], count: number): Question[] {
  return shuffleArray(all).slice(0, count);
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function computeResult(
  questions: Question[],
  answers: Record<number, OptionKey>,
  timeTaken: number
): QuizResult {
  let correct = 0;
  let incorrect = 0;
  let skipped = 0;

  for (const q of questions) {
    const ans = answers[q.id];
    if (!ans) skipped++;
    else if (ans === q.correct_option) correct++;
    else incorrect++;
  }

  return {
    totalQuestions: questions.length,
    correct,
    incorrect,
    skipped,
    score: Math.round((correct / questions.length) * 100),
    answers,
    questions,
    timeTaken,
  };
}
