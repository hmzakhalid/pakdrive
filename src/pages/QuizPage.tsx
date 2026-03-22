import { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useQuestions,
  useStats,
  pickQuestions,
  formatTime,
  computeResult,
} from "../hooks/useQuiz";
import type { Question, OptionKey, QuizResult } from "../types";

const OPTION_LABELS: OptionKey[] = ["a", "b", "c", "d"];
const OPTION_DISPLAY: Record<OptionKey, string> = { a: "A", b: "B", c: "C", d: "D" };

export default function QuizPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") === "practice" ? "practice" : "mock";
  const categoryParam = searchParams.get("category");

  const { questions: allQuestions, loading } = useQuestions();
  const { recordResult } = useStats();

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, OptionKey>>({});
  const [timeLeft, setTimeLeft] = useState(mode === "mock" ? 20 * 60 : 0);
  const [startTime] = useState(Date.now());
  const [showAnswer, setShowAnswer] = useState(false);
  const [finished, setFinished] = useState(false);

  // Initialize questions
  useEffect(() => {
    if (allQuestions.length === 0) return;

    let pool = allQuestions;
    if (categoryParam === "signs") {
      pool = allQuestions.filter((q) => q.image);
    }

    if (mode === "mock") {
      setQuizQuestions(pickQuestions(pool, 20));
      setTimeLeft(20 * 60);
    } else {
      setQuizQuestions(pickQuestions(pool, pool.length));
    }
    setCurrentIndex(0);
    setAnswers({});
    setShowAnswer(false);
    setFinished(false);
  }, [allQuestions, mode, categoryParam]);

  // Timer for mock mode
  useEffect(() => {
    if (mode !== "mock" || finished) return;
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timeLeft, finished]);

  const currentQ = quizQuestions[currentIndex];

  const handleSelect = (key: OptionKey) => {
    if (mode === "practice" && showAnswer) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
    if (mode === "practice") {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
      setShowAnswer(mode === "practice" && answers[quizQuestions[currentIndex - 1]?.id] !== undefined);
    }
  };

  const handleFinish = useCallback(() => {
    if (finished) return;
    setFinished(true);
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const result: QuizResult = computeResult(quizQuestions, answers, timeTaken);
    recordResult(result);

    navigate("/results", { state: { result } });
  }, [finished, startTime, quizQuestions, answers, recordResult, navigate]);

  if (loading) {
    return (
      <main className="pt-24 pb-12 px-4 md:px-6 max-w-5xl mx-auto min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <span className="material-symbols-outlined text-6xl text-primary animate-spin">
            progress_activity
          </span>
          <p className="text-secondary font-medium">Loading questions...</p>
        </div>
      </main>
    );
  }

  if (!currentQ) return null;

  const selectedAnswer = answers[currentQ.id];
  const progressPercent =
    ((currentIndex + 1) / quizQuestions.length) * 100;

  return (
    <main className="pt-24 pb-12 px-4 md:px-6 max-w-5xl mx-auto">
      {/* Header */}
      <section className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1 max-w-md">
          <div className="flex justify-between items-end mb-3">
            <div>
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                {mode === "mock" ? "Mock Test" : "Practice Mode"}
              </span>
              <h2 className="text-3xl font-extrabold font-headline text-primary mt-1">
                Question {currentIndex + 1}{" "}
                <span className="text-outline font-medium text-xl">
                  of {quizQuestions.length}
                </span>
              </h2>
            </div>
          </div>
          <div className="h-3 w-full bg-surface-container-high rounded-[9999px] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary-container rounded-[9999px] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {mode === "mock" && (
          <div className="flex items-center gap-4 bg-surface-container-lowest px-6 py-4 rounded-[0.75rem] shadow-[0_8px_24px_rgba(25,28,30,0.04)] border border-outline-variant/20">
            <div className="flex items-center justify-center w-12 h-12 rounded-[9999px] bg-tertiary-fixed text-on-tertiary-fixed">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <div>
              <p className="text-xs font-bold text-secondary uppercase tracking-widest">
                Remaining Time
              </p>
              <p className="text-2xl font-bold font-headline tabular-nums">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-surface-container-lowest p-4 sm:p-8 md:p-10 rounded-[0.75rem] shadow-[0_8px_24px_rgba(25,28,30,0.04)]">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-headline leading-tight text-on-surface mb-6 sm:mb-8">
              {currentQ.question}
            </h1>
            <div className="space-y-4">
              {OPTION_LABELS.map((key) => {
                const text = currentQ.options[key];
                const isSelected = selectedAnswer === key;
                const isCorrect = key === currentQ.correct_option;

                let optionStyle =
                  "bg-surface-container-highest hover:bg-surface-container-high";
                let circleStyle =
                  "bg-surface-container-lowest text-primary border border-outline-variant/30 group-hover:bg-primary group-hover:text-white";
                let textStyle =
                  "text-on-surface-variant group-hover:text-on-surface";

                if (mode === "practice" && showAnswer) {
                  if (isCorrect) {
                    optionStyle = "bg-primary-fixed ring-2 ring-primary ring-offset-2";
                    circleStyle = "bg-primary text-on-primary";
                    textStyle = "text-on-primary-fixed font-bold";
                  } else if (isSelected && !isCorrect) {
                    optionStyle = "bg-error-container ring-2 ring-error ring-offset-2";
                    circleStyle = "bg-error text-on-error";
                    textStyle = "text-on-error-container font-bold";
                  }
                } else if (isSelected) {
                  optionStyle = "bg-primary-fixed ring-2 ring-primary ring-offset-2";
                  circleStyle = "bg-primary text-on-primary";
                  textStyle = "text-on-primary-fixed font-bold";
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleSelect(key)}
                    disabled={mode === "practice" && showAnswer}
                    className={`w-full text-left p-3 sm:p-5 rounded-[0.75rem] transition-all flex items-center group ${optionStyle}`}
                  >
                    <span
                      className={`w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 flex items-center justify-center rounded-[9999px] font-bold mr-3 sm:mr-4 text-sm sm:text-base transition-all ${circleStyle}`}
                    >
                      {OPTION_DISPLAY[key]}
                    </span>
                    <span className={`font-medium transition-colors text-sm sm:text-base ${textStyle}`}>
                      {text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-2 pt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 rounded-[0.75rem] font-bold text-primary hover:bg-primary/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {currentIndex === quizQuestions.length - 1 || mode === "mock" ? (
              <div className="flex gap-2 sm:gap-3">
                {currentIndex < quizQuestions.length - 1 && (
                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 rounded-[0.75rem] bg-secondary-container text-on-secondary-container font-bold transition-all active:scale-95 text-sm sm:text-base"
                  >
                    Next
                    <span className="material-symbols-outlined text-xl">
                      arrow_forward
                    </span>
                  </button>
                )}
                <button
                  onClick={handleFinish}
                  className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-3 sm:py-4 rounded-[0.75rem] bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 text-sm sm:text-base"
                >
                  <span className="hidden sm:inline">Finish</span> Test
                  <span className="material-symbols-outlined text-xl">done_all</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleNext}
                className="flex items-center gap-1 sm:gap-2 px-4 sm:px-8 py-3 sm:py-4 rounded-[0.75rem] bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95 text-sm sm:text-base"
              >
                Next
                <span className="material-symbols-outlined text-xl">
                  arrow_forward
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Side panel */}
        <div className="lg:col-span-5 space-y-6">
          {currentQ.image && (
            <div className="bg-surface-container-low p-6 rounded-[0.75rem]">
              <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">
                Visual Reference
              </h3>
              <div className="bg-surface-container-lowest p-6 rounded-[0.75rem] flex items-center justify-center shadow-inner">
                <img
                  alt="Traffic sign"
                  className="max-w-full max-h-48 object-contain"
                  src={currentQ.image}
                />
              </div>
            </div>
          )}

          {/* Question navigator */}
          <div className="bg-surface-container-low p-6 rounded-[0.75rem]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary mb-4">
              Question Navigator
            </h3>
            <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto">
              {quizQuestions.map((q, i) => {
                const answered = answers[q.id] !== undefined;
                const isCurrent = i === currentIndex;
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentIndex(i);
                      if (mode === "practice") {
                        setShowAnswer(answers[q.id] !== undefined);
                      }
                    }}
                    className={`w-full aspect-square flex items-center justify-center rounded-[0.5rem] text-sm font-bold transition-all ${
                      isCurrent
                        ? "bg-primary text-on-primary scale-110"
                        : answered
                          ? "bg-primary-fixed text-on-primary-fixed"
                          : "bg-surface-container-highest text-on-surface-variant hover:bg-surface-container-high"
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
