import { Link, useLocation, Navigate } from "react-router-dom";
import type { QuizResult, OptionKey } from "../types";

const OPTION_DISPLAY: Record<OptionKey, string> = { a: "A", b: "B", c: "C", d: "D" };

export default function ResultsPage() {
  const location = useLocation();
  const result = (location.state as { result?: QuizResult })?.result;

  if (!result) return <Navigate to="/dashboard" replace />;

  const passed = result.score >= 60;
  const dashOffset = 465 - (465 * result.score) / 100;

  return (
    <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
      {/* Score banner */}
      <section className="relative overflow-hidden bg-mesh-gradient rounded-[2rem] p-8 md:p-12 mb-12 text-center">
        <div className="relative z-10">
          <span className="inline-flex items-center px-4 py-1.5 rounded-[0.75rem] bg-primary/10 text-primary font-headline font-bold text-sm tracking-wide mb-4">
            TEST COMPLETED
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface mb-4 tracking-tight">
            {passed ? "You Passed!" : "Keep Practicing!"}
          </h1>
          <p className="text-lg text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
            {passed
              ? "Great work! You demonstrated a strong understanding of road safety."
              : "You need 60% to pass. Review the questions below and try again."}
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="relative w-40 h-40 flex items-center justify-center bg-surface-container-lowest rounded-[9999px] shadow-sm">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  className="text-surface-container-high"
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="74"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  fill="transparent"
                  r="74"
                  stroke="url(#score-gradient)"
                  strokeDasharray="465"
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  strokeWidth="12"
                />
                <defs>
                  <linearGradient
                    id="score-gradient"
                    x1="0%"
                    x2="100%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop offset="0%" style={{ stopColor: "#004c31" }} />
                    <stop offset="100%" style={{ stopColor: "#006644" }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <span className="block text-4xl font-headline font-extrabold text-primary">
                  {result.score}%
                </span>
                <span className="text-xs uppercase tracking-widest text-secondary">
                  Score
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 text-left">
              <div className="px-4 border-l-2 border-primary-fixed">
                <p className="text-2xl font-headline font-bold text-on-surface">
                  {result.correct}
                </p>
                <p className="text-xs text-secondary">Correct</p>
              </div>
              <div className="px-4 border-l-2 border-tertiary-fixed">
                <p className="text-2xl font-headline font-bold text-on-surface">
                  {result.incorrect}
                </p>
                <p className="text-xs text-secondary">Incorrect</p>
              </div>
              <div className="px-4 border-l-2 border-outline-variant">
                <p className="text-2xl font-headline font-bold text-on-surface">
                  {result.skipped}
                </p>
                <p className="text-xs text-secondary">Skipped</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
        <Link
          to="/mock-test"
          className="bg-primary text-on-primary px-10 py-4 rounded-[0.75rem] font-headline font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">refresh</span>
          Retake Test
        </Link>
        <Link
          to="/dashboard"
          className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-[0.75rem] font-headline font-bold text-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">dashboard</span>
          Go to Dashboard
        </Link>
      </div>

      {/* Detailed review */}
      <div className="space-y-8">
        <h2 className="font-headline text-3xl font-extrabold tracking-tight">
          Detailed Review
        </h2>
        <div className="grid gap-6">
          {result.questions.map((q, i) => {
            const userAnswer = result.answers[q.id];
            const isCorrect = userAnswer === q.correct_option;
            const wasSkipped = !userAnswer;

            return (
              <div
                key={q.id}
                className="bg-surface-container-lowest p-6 rounded-[2rem] border border-outline-variant/10"
              >
                <div className="flex items-start gap-5">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-[0.75rem] flex items-center justify-center ${
                      wasSkipped
                        ? "bg-surface-container-highest text-outline"
                        : isCorrect
                          ? "bg-primary-fixed text-on-primary-fixed"
                          : "bg-error-container text-on-error-container"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {wasSkipped ? "remove" : isCorrect ? "check" : "close"}
                    </span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                        Question {String(i + 1).padStart(2, "0")}
                      </span>
                      {q.image && (
                        <img
                          src={q.image}
                          alt="sign"
                          className="w-12 h-12 object-contain rounded"
                        />
                      )}
                    </div>
                    <h3 className="font-headline font-bold text-xl text-on-surface mb-4">
                      {q.question}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {(["a", "b", "c", "d"] as OptionKey[]).map((key) => {
                        const isThisCorrect = key === q.correct_option;
                        const isThisSelected = key === userAnswer;

                        let style =
                          "bg-surface-container-low text-secondary";
                        if (isThisCorrect) {
                          style =
                            "bg-primary-fixed text-on-primary-fixed font-medium";
                        } else if (isThisSelected && !isThisCorrect) {
                          style =
                            "bg-error-container text-on-error-container font-medium";
                        }

                        return (
                          <div
                            key={key}
                            className={`p-4 rounded-[0.75rem] ${style} flex items-center gap-3`}
                          >
                            <span className="material-symbols-outlined text-sm">
                              {isThisSelected
                                ? "radio_button_checked"
                                : "radio_button_unchecked"}
                            </span>
                            <span className="font-bold mr-1">{OPTION_DISPLAY[key]}.</span>
                            {q.options[key]}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
