import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <main className="pt-24">
      {/* Hero */}
      <section className="relative px-6 md:px-12 py-16 md:py-28 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[0.75rem] text-xs font-semibold tracking-wide uppercase">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              NH&MP Official Guidelines
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-on-surface leading-[1.1] tracking-tight">
              Pass your NH&MP Driving Test{" "}
              <span className="text-primary italic">with confidence.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
              The ultimate preparation platform for Pakistani drivers. Master
              traffic rules, identify road signs, and ace your license test with
              our expert-designed simulations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-primary text-on-primary rounded-[0.75rem] font-bold text-lg shadow-lg hover:bg-primary-container transition-all active:scale-95 text-center"
              >
                Start Practicing for Free
              </Link>
              <Link
                to="/learn"
                className="px-8 py-4 bg-secondary-container text-on-secondary-container rounded-[0.75rem] font-bold text-lg hover:bg-surface-container-highest transition-all text-center"
              >
                View Study Guide
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <p className="text-sm font-medium text-on-surface-variant">
                <span className="text-primary font-bold">350</span> questions
                from the official NH&MP question bank
              </p>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="bg-surface-container-low rounded-[2rem] p-4 aspect-[4/5] relative overflow-hidden flex items-end">
              <img
                alt="Road ahead"
                className="absolute inset-0 w-full h-full object-cover rounded-[1.8rem]"
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1000&auto=format&fit=crop"
              />
              <div className="relative z-10 w-full bg-surface-container-lowest/90 backdrop-blur p-6 rounded-[1rem] shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-on-surface">
                    Practice Score
                  </span>
                  <span className="text-primary font-extrabold">100%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-high rounded-[9999px] overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container w-full" />
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-[0.75rem] text-[10px] font-bold uppercase">
                    Excellent
                  </div>
                  <div className="px-3 py-1 bg-surface-container-highest text-on-surface-variant rounded-[0.75rem] text-[10px] font-bold uppercase">
                    Ready for Test
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight">
              Everything you need to{" "}
              <span className="text-primary">Master the Road</span>
            </h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Designed to provide the most realistic licensing exam preparation
              available in Pakistan.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-surface-container-lowest p-8 rounded-[2rem] flex flex-col md:flex-row gap-8 items-center group hover:shadow-lg transition-all">
              <div className="space-y-4 flex-1">
                <div className="w-14 h-14 bg-primary rounded-[1rem] flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-3xl">
                    menu_book
                  </span>
                </div>
                <h3 className="text-2xl font-bold">350 Comprehensive MCQs</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  Complete bank of questions covering all categories: traffic
                  signs, road rules, and vehicle handling.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    Official NH&MP question bank
                  </li>
                  <li className="flex items-center gap-2 text-sm font-medium text-on-surface">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    50+ traffic sign images included
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full bg-surface-container-high rounded-[1rem] h-64 overflow-hidden relative">
                <div className="absolute inset-4 space-y-3">
                  <div className="p-3 bg-surface-container-lowest rounded-[0.5rem] shadow-sm border-l-4 border-primary">
                    <div className="w-2/3 h-2 bg-surface-container-high rounded mb-2" />
                    <div className="w-1/2 h-2 bg-surface-container-high rounded" />
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-[0.5rem] shadow-sm opacity-60">
                    <div className="w-3/4 h-2 bg-surface-container-high rounded mb-2" />
                    <div className="w-1/3 h-2 bg-surface-container-high rounded" />
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-[0.5rem] shadow-sm opacity-40">
                    <div className="w-1/2 h-2 bg-surface-container-high rounded mb-2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-primary p-8 rounded-[2rem] text-on-primary flex flex-col justify-between group hover:shadow-xl transition-all">
              <div className="space-y-4">
                <div className="w-14 h-14 bg-primary-container rounded-[1rem] flex items-center justify-center">
                  <span className="material-symbols-outlined text-3xl">
                    analytics
                  </span>
                </div>
                <h3 className="text-2xl font-bold">
                  Real-time Score Tracking
                </h3>
                <p className="text-on-primary-container/80 leading-relaxed">
                  Deep insights into your performance with local progress
                  tracking.
                </p>
              </div>
              <div className="mt-8 flex items-end gap-1">
                <div className="w-full h-12 bg-on-primary-container/20 rounded-t-lg group-hover:h-20 transition-all duration-500" />
                <div className="w-full h-24 bg-on-primary-container/40 rounded-t-lg group-hover:h-32 transition-all duration-500" />
                <div className="w-full h-32 bg-on-primary-container rounded-t-lg group-hover:h-40 transition-all duration-500" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
