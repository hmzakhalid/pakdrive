import { Link } from "react-router-dom";
import { useStats } from "../hooks/useQuiz";

export default function DashboardPage() {
  const { stats } = useStats();
  const progress = stats.totalAttempted
    ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100)
    : 0;
  const mastered = stats.masteredIds.length;
  const toGo = 350 - mastered;

  const dashOffset = 553 - (553 * progress) / 100;

  const categories = [
    {
      title: "Road Signs",
      icon: "signpost",
      color: "bg-primary-fixed",
      desc: "Visual guide to all traffic signs.",
      link: "/signs",
      progress: "58 sign questions",
    },
    {
      title: "Practice Mode",
      icon: "menu_book",
      color: "bg-secondary-container",
      desc: "Study questions at your own pace.",
      link: "/practice",
      progress: "350 questions",
    },
    {
      title: "Study Guide",
      icon: "school",
      color: "bg-tertiary-fixed",
      desc: "15 rules to pass the test.",
      link: "/learn",
      progress: "Master the patterns",
    },
    {
      title: "Mock Test",
      icon: "assignment",
      color: "bg-primary",
      desc: "Full timed exam simulation.",
      link: "/mock-test",
      progress: "20 question exam",
      dark: true,
    },
  ];

  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-10">
        <h1 className="font-headline text-4xl font-extrabold text-on-surface mb-2 tracking-tight">
          Your Dashboard
        </h1>
        <p className="text-secondary font-medium">
          {progress > 0
            ? `You're ${progress}% accurate across ${stats.totalAttempted} questions.`
            : "Start practicing to track your progress."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
        {/* Progress circle */}
        <div className="lg:col-span-4 bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_8px_24px_rgba(25,28,30,0.04)] flex flex-col items-center justify-center text-center">
          <h3 className="font-headline font-bold text-lg mb-6 text-on-surface">
            Overall Accuracy
          </h3>
          <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
              <circle
                className="text-surface-container-high"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
              />
              <circle
                className="text-primary"
                cx="96"
                cy="96"
                fill="transparent"
                r="88"
                stroke="currentColor"
                strokeDasharray="553"
                strokeDashoffset={dashOffset}
                strokeWidth="12"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-headline text-4xl font-extrabold text-primary">
                {progress}%
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-secondary">
                Accurate
              </span>
            </div>
          </div>
          <div className="mt-8 flex gap-4 text-left w-full justify-between px-2">
            <div>
              <p className="text-xs text-secondary font-bold uppercase tracking-wider">
                Mastered
              </p>
              <p className="text-xl font-headline font-bold text-on-surface">
                {mastered}
              </p>
            </div>
            <div className="border-l border-outline-variant/20 pl-4">
              <p className="text-xs text-secondary font-bold uppercase tracking-wider">
                To Go
              </p>
              <p className="text-xl font-headline font-bold text-on-surface">
                {toGo}
              </p>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* CTA banner */}
          <div className="relative overflow-hidden bg-primary rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 group">
            <div className="relative z-10 flex-1">
              <span className="inline-block px-3 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-bold rounded-[0.5rem] mb-4">
                QUICK START
              </span>
              <h2 className="font-headline text-3xl font-bold text-on-primary mb-2">
                Ready for a Mock Test?
              </h2>
              <p className="text-on-primary-container text-lg mb-6 max-w-md">
                Take a timed 20-question exam just like the real thing.
              </p>
              <Link
                to="/mock-test"
                className="inline-flex bg-surface-container-lowest text-primary px-8 py-3 rounded-[0.75rem] font-bold items-center gap-2 hover:bg-primary-fixed transition-all shadow-lg active:scale-95"
              >
                Start Mock Test
                <span className="material-symbols-outlined">play_arrow</span>
              </Link>
            </div>
            <div className="relative z-10 w-full md:w-1/3">
              <div className="bg-primary-container/50 backdrop-blur-md p-4 rounded-[0.5rem] border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <span className="material-symbols-outlined text-primary-fixed">
                    timer
                  </span>
                  <span className="text-on-primary text-sm font-medium">
                    20 min time limit
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary-fixed">
                    quiz
                  </span>
                  <span className="text-on-primary text-sm font-medium">
                    20 random questions
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
            <div className="bg-surface-container-low rounded-[2rem] p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-[0.75rem] bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  history
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Last Score
                </p>
                <p className="text-lg font-headline font-bold text-on-surface">
                  {stats.lastScore > 0 ? (
                    <>
                      {stats.lastScore}%{" "}
                      <span
                        className={`text-sm font-medium ml-1 ${stats.lastScore >= 60 ? "text-primary" : "text-error"}`}
                      >
                        {stats.lastScore >= 60 ? "Passed" : "Failed"}
                      </span>
                    </>
                  ) : (
                    "No tests yet"
                  )}
                </p>
              </div>
            </div>
            <div className="bg-surface-container-low rounded-[2rem] p-6 flex items-center gap-5">
              <div className="w-12 h-12 rounded-[0.75rem] bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase tracking-wider">
                  Tests Completed
                </p>
                <p className="text-lg font-headline font-bold text-on-surface">
                  {stats.testsCompleted}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <div className="mb-12">
        <h3 className="font-headline text-2xl font-bold text-on-surface mb-8">
          Practice Categories
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="bg-surface-container-lowest p-6 rounded-[2rem] hover:shadow-xl transition-all cursor-pointer group block"
            >
              <div
                className={`w-14 h-14 rounded-[0.75rem] ${cat.color} mb-4 flex items-center justify-center ${cat.dark ? "text-on-primary" : ""} group-hover:scale-110 transition-transform`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {cat.icon}
                </span>
              </div>
              <h4 className="font-headline font-bold text-lg mb-2">
                {cat.title}
              </h4>
              <p className="text-sm text-secondary leading-relaxed mb-4">
                {cat.desc}
              </p>
              <div className="text-xs font-bold text-primary uppercase tracking-tighter">
                {cat.progress}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
