import { Link, useSearchParams, Navigate } from "react-router-dom";

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  // If mode param is set, redirect to QuizPage
  if (searchParams.get("mode") === "practice") {
    return <Navigate to={`/quiz?mode=practice&category=${searchParams.get("category") || ""}`} replace />;
  }

  const categories = [
    {
      title: "All Questions",
      icon: "menu_book",
      desc: "Practice all 350 questions at your own pace with instant feedback.",
      count: "350 questions",
      link: "/quiz?mode=practice",
      color: "bg-primary",
      dark: true,
    },
    {
      title: "Traffic Signs Only",
      icon: "signpost",
      desc: "Focus on sign recognition questions with images.",
      count: "58 questions",
      link: "/quiz?mode=practice&category=signs",
      color: "bg-tertiary-fixed",
    },
    {
      title: "Quick 20",
      icon: "bolt",
      desc: "A casual 20-question practice round. No timer.",
      count: "20 questions",
      link: "/quiz?mode=practice",
      color: "bg-secondary-container",
    },
  ];

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="mb-12">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-2 tracking-tight">
          Practice Mode
        </h1>
        <p className="text-secondary font-medium text-lg">
          Study at your own pace. See the correct answer after each question.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.title}
            to={cat.link}
            className="bg-surface-container-lowest p-8 rounded-[2rem] hover:shadow-xl transition-all group block"
          >
            <div
              className={`w-16 h-16 rounded-[1rem] ${cat.color} mb-6 flex items-center justify-center ${
                cat.dark ? "text-on-primary" : ""
              } group-hover:scale-110 transition-transform`}
            >
              <span className="material-symbols-outlined text-4xl">
                {cat.icon}
              </span>
            </div>
            <h3 className="font-headline font-bold text-2xl mb-3">
              {cat.title}
            </h3>
            <p className="text-on-surface-variant leading-relaxed mb-4">
              {cat.desc}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-primary uppercase tracking-tight">
                {cat.count}
              </span>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-16 bg-surface-container-low rounded-[2rem] p-8 md:p-10">
        <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">
          How Practice Mode Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[9999px] bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-1">Read & Answer</h4>
              <p className="text-sm text-secondary">
                Read each question and select your answer.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[9999px] bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-1">
                Instant Feedback
              </h4>
              <p className="text-sm text-secondary">
                See the correct answer highlighted immediately.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-[9999px] bg-primary text-on-primary flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-on-surface mb-1">Learn & Move On</h4>
              <p className="text-sm text-secondary">
                Review the answer, then proceed to the next question.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
