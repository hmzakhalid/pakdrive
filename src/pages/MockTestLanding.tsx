import { Link } from "react-router-dom";

export default function MockTestLanding() {
  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-3xl mx-auto min-h-screen">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-primary rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center text-on-primary">
          <span className="material-symbols-outlined text-5xl">assignment</span>
        </div>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight">
          Mock Driving Test
        </h1>
        <p className="text-lg text-secondary max-w-lg mx-auto leading-relaxed">
          Simulate the real NH&MP theoretical driving exam. 20 random questions,
          20-minute time limit. You need 60% to pass.
        </p>
      </div>

      <div className="bg-surface-container-lowest rounded-[2rem] p-8 md:p-10 shadow-[0_8px_24px_rgba(25,28,30,0.04)] mb-8">
        <h2 className="font-headline font-bold text-xl text-on-surface mb-6">
          Test Details
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-[9999px] bg-primary-fixed text-on-primary-fixed mx-auto mb-3 flex items-center justify-center">
              <span className="material-symbols-outlined">quiz</span>
            </div>
            <p className="text-2xl font-headline font-bold text-on-surface">20</p>
            <p className="text-xs text-secondary font-medium">Questions</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-[9999px] bg-tertiary-fixed text-on-tertiary-fixed mx-auto mb-3 flex items-center justify-center">
              <span className="material-symbols-outlined">timer</span>
            </div>
            <p className="text-2xl font-headline font-bold text-on-surface">20</p>
            <p className="text-xs text-secondary font-medium">Minutes</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-[9999px] bg-secondary-container text-on-secondary-container mx-auto mb-3 flex items-center justify-center">
              <span className="material-symbols-outlined">percent</span>
            </div>
            <p className="text-2xl font-headline font-bold text-on-surface">60%</p>
            <p className="text-xs text-secondary font-medium">Pass Mark</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-[9999px] bg-surface-container-highest text-on-surface-variant mx-auto mb-3 flex items-center justify-center">
              <span className="material-symbols-outlined">shuffle</span>
            </div>
            <p className="text-2xl font-headline font-bold text-on-surface">Random</p>
            <p className="text-xs text-secondary font-medium">Selection</p>
          </div>
        </div>

        <div className="bg-surface-container-low rounded-[0.75rem] p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary mt-0.5">info</span>
            <div>
              <h4 className="font-bold text-on-surface text-sm mb-1">Before you start</h4>
              <ul className="text-sm text-secondary space-y-1">
                <li>• Questions are randomly selected from the full 350 question bank</li>
                <li>• The timer starts immediately when you begin</li>
                <li>• You can navigate between questions before submitting</li>
                <li>• Unanswered questions count as incorrect</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/quiz?mode=mock"
            className="bg-primary text-on-primary px-10 py-4 rounded-[0.75rem] font-headline font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <span className="material-symbols-outlined">play_arrow</span>
            Start Mock Test
          </Link>
          <Link
            to="/learn"
            className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-[0.75rem] font-headline font-bold text-lg hover:bg-opacity-80 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-symbols-outlined">school</span>
            Study First
          </Link>
        </div>
      </div>
    </main>
  );
}
