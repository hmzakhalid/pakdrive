import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuestions } from "../hooks/useQuiz";
import type { OptionKey } from "../types";

export default function SignsPage() {
  const { questions, loading } = useQuestions();
  const [revealedIds, setRevealedIds] = useState<Set<number>>(new Set());

  const signQuestions = questions.filter((q) => q.image);

  const toggleReveal = (id: number) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (loading) {
    return (
      <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-primary animate-spin">
          progress_activity
        </span>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-2 tracking-tight">
            Road Signs Gallery
          </h1>
          <p className="text-secondary font-medium">
            {signQuestions.length} traffic signs to study. Click any card to
            reveal the answer.
          </p>
        </div>
        <Link
          to="/practice?mode=practice&category=signs"
          className="inline-flex bg-primary text-on-primary px-6 py-3 rounded-[0.75rem] font-bold items-center gap-2 hover:bg-primary-container transition-all active:scale-95"
        >
          <span className="material-symbols-outlined">quiz</span>
          Practice Signs Quiz
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {signQuestions.map((q) => {
          const revealed = revealedIds.has(q.id);
          return (
            <button
              key={q.id}
              onClick={() => toggleReveal(q.id)}
              className="bg-surface-container-lowest rounded-[1.5rem] p-4 hover:shadow-lg transition-all group text-left"
            >
              <div className="bg-surface-container-low rounded-[0.75rem] p-3 flex items-center justify-center mb-3 aspect-square">
                <img
                  src={q.image}
                  alt={`Sign Q${q.id}`}
                  className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                />
              </div>
              <p className="text-xs font-bold text-secondary mb-1">Q{q.id}</p>
              <p className="text-sm font-medium text-on-surface leading-snug line-clamp-2">
                {q.question}
              </p>
              {revealed && (
                <div className="mt-2 px-3 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-[0.5rem] text-xs font-bold">
                  {q.correct_option.toUpperCase()}. {q.options[q.correct_option as OptionKey]}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </main>
  );
}
