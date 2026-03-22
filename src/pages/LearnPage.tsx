import { Link } from "react-router-dom";

interface Rule {
  title: string;
  icon: string;
  description: string;
  tips: string[];
  color: string;
}

const rules: Rule[] = [
  {
    title: "The Master Rule: Pick the Safest Option",
    icon: "shield",
    description:
      "When in doubt, choose the option that prioritizes safety. Slow down, yield, be cautious. Eliminate any option that suggests speeding up, honking continuously, or ignoring hazards.",
    tips: [
      '"Reduce speed" almost always beats "maintain speed"',
      '"Observe and be cautious" beats "ignore and continue"',
      '"Yield" beats "force your way through"',
    ],
    color: "bg-primary",
  },
  {
    title: "True/False Strategy",
    icon: "fact_check",
    description:
      "About 120 questions are true/false. Statements about safety rules being important, following regulations, or being cautious are almost always TRUE. Extreme statements with \"never\" or \"always\" can go either way — check if they match common sense.",
    tips: [
      '"Following traffic rules prevents accidents" → TRUE',
      '"You should always check mirrors before changing lanes" → TRUE',
      '"It is ok to exceed speed limit when road is empty" → FALSE',
    ],
    color: "bg-primary-container",
  },
  {
    title: '"When encountering..." → Slow Down & Yield',
    icon: "emoji_people",
    description:
      "About 40 questions start with \"When encountering...\" (pedestrians, animals, emergency vehicles, school buses). The answer is virtually always: reduce speed, yield, keep distance, or stop.",
    tips: [
      "Encountering pedestrians → Slow down, let them pass",
      "Encountering animals → Reduce speed, don't honk",
      "Encountering emergency vehicles → Pull over and yield",
    ],
    color: "bg-tertiary-fixed",
  },
  {
    title: '"Continuously honk" is ALWAYS Wrong',
    icon: "volume_off",
    description:
      "If any option says \"continuously honk the horn\" or \"keep honking,\" it is always wrong. Brief honking may be acceptable, but continuous is never the answer.",
    tips: [
      "Brief horn tap to alert = sometimes acceptable",
      "Continuous honking = always wrong, no exceptions",
    ],
    color: "bg-error-container",
  },
  {
    title: '"Speed up" is ALWAYS Wrong',
    icon: "speed",
    description:
      'In any hazard or encounter scenario, an option that says "speed up," "accelerate," or "rush through" is always wrong.',
    tips: [
      '"Speed up to pass quickly" → Always wrong',
      '"Accelerate through the intersection" → Always wrong',
      "The correct action is always to slow down or stop",
    ],
    color: "bg-error-container",
  },
  {
    title: "Speed Limits — Only 5 Numbers to Memorize",
    icon: "123",
    description:
      "Motorway: 120 km/h max. Urban/city roads: 50 km/h in residential areas. Construction/school zones: 30 km/h. Sharp curves and bad weather: 30 km/h. Minimum motorway speed: 70 km/h.",
    tips: [
      "Motorway max: 120 km/h",
      "Urban residential: 50 km/h",
      "School/construction zone: 30 km/h",
      "Minimum speed on motorway: 70 km/h",
    ],
    color: "bg-secondary-container",
  },
  {
    title: "Stopping & Safety Distances",
    icon: "social_distance",
    description:
      "At 100 km/h the safe following distance is 50 meters (or 100m in bad conditions). At 60 km/h, safe following is 30 meters. The emergency stopping zone is marked at 50m.",
    tips: [
      "100 km/h → 50m following distance",
      "Bad weather → double the distance to 100m",
      "60 km/h → 30m following distance",
    ],
    color: "bg-secondary-container",
  },
  {
    title: "Night Driving = Low Beam",
    icon: "dark_mode",
    description:
      "When following or meeting another vehicle at night, always switch to low beam (dipped headlights). High beam blinds other drivers.",
    tips: [
      "Following another car → low beam",
      "Oncoming traffic → low beam",
      "Empty road with no traffic → high beam is fine",
    ],
    color: "bg-surface-container-highest",
  },
  {
    title: "Indicator Rules",
    icon: "turn_slight_right",
    description:
      "Signal before you act: 100m before turning on highways, 30m in cities. Left indicator to start overtaking, right indicator when returning to lane. (Remember: Pakistan drives on the LEFT.)",
    tips: [
      "Highway turn: signal 100m before",
      "City turn: signal 30m before",
      "Overtake: left signal out, right signal to return",
    ],
    color: "bg-primary-fixed",
  },
  {
    title: "Overtaking Rules",
    icon: "swap_horiz",
    description:
      "Always overtake from the RIGHT side in Pakistan (left-hand traffic). Never overtake on curves, bridges, intersections, or in bad visibility. Let faster vehicles overtake you — don't block them.",
    tips: [
      "Overtake from the RIGHT side",
      "Never overtake near intersections or curves",
      "If someone is overtaking you, slow down and let them",
    ],
    color: "bg-primary-fixed",
  },
  {
    title: '"All of the above" Pattern',
    icon: "select_all",
    description:
      'When "All of the above" is an option and multiple choices seem correct, it is very likely the answer. This appears in about 15-20 questions.',
    tips: [
      "If options A, B, C each seem partly right → pick D (All of the above)",
      "But verify — if any single option is clearly wrong, eliminate it",
    ],
    color: "bg-surface-container-highest",
  },
  {
    title: "Pakistan Drives on the LEFT",
    icon: "directions_car",
    description:
      "All rules derive from left-hand traffic. Overtake from right, keep left on multi-lane roads, right-hand drive vehicles.",
    tips: [
      "Slow traffic stays in leftmost lane",
      "Fast/overtaking in right lane",
      "Roundabouts go clockwise (give way to traffic from right)",
    ],
    color: "bg-surface-container-highest",
  },
  {
    title: "Motorway Restrictions",
    icon: "block",
    description:
      "No pedestrians, cyclists, tractors, or animal carts on motorways. No reversing, no U-turns. Learner drivers are not allowed. Minimum speed is 70 km/h.",
    tips: [
      "No slow vehicles (tractors, rickshaws, carts)",
      "No pedestrians or cyclists",
      "No U-turns or reversing",
      "Learner permit holders not allowed",
    ],
    color: "bg-tertiary-fixed",
  },
  {
    title: "Arrow Traffic Lights = Literal Direction",
    icon: "traffic",
    description:
      "When a traffic light has a green arrow pointing left, you can go left. A red arrow in a direction = cannot go that way. Flashing yellow = proceed with caution.",
    tips: [
      "Green arrow = go in that direction",
      "Red arrow = stop for that direction",
      "Flashing yellow = slow down and proceed carefully",
    ],
    color: "bg-tertiary-fixed",
  },
  {
    title: "Tyre Burst / Emergency: Hold the Steering",
    icon: "emergency",
    description:
      "If a tyre bursts, firmly hold the steering wheel, gradually slow down, and pull over. Do NOT slam the brakes or turn sharply.",
    tips: [
      "Hold steering firmly with both hands",
      "Gradually ease off the accelerator",
      "Do NOT slam brakes — you'll lose control",
      "Signal and slowly pull to the side",
    ],
    color: "bg-error-container",
  },
];

export default function LearnPage() {
  return (
    <main className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      <div className="mb-12 text-center">
        <span className="inline-flex items-center px-4 py-1.5 rounded-[0.75rem] bg-primary/10 text-primary font-headline font-bold text-sm tracking-wide mb-4">
          STUDY GUIDE
        </span>
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface mb-4 tracking-tight">
          15 Rules to Pass the Test
        </h1>
        <p className="text-lg text-secondary max-w-2xl mx-auto leading-relaxed">
          Master these patterns and you can confidently answer all 350 questions.
          These rules cover recurring patterns in the NH&MP driving test.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            to="/mock-test"
            className="inline-flex bg-primary text-on-primary px-8 py-4 rounded-[0.75rem] font-bold text-lg items-center gap-2 hover:bg-primary-container transition-all active:scale-95 justify-center"
          >
            <span className="material-symbols-outlined">quiz</span>
            Take Mock Test
          </Link>
          <Link
            to="/practice?mode=practice"
            className="inline-flex bg-secondary-container text-on-secondary-container px-8 py-4 rounded-[0.75rem] font-bold text-lg items-center gap-2 hover:bg-surface-container-highest transition-all justify-center"
          >
            <span className="material-symbols-outlined">school</span>
            Practice All 350
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {rules.map((rule, i) => (
          <div
            key={i}
            className="bg-surface-container-lowest rounded-[2rem] p-6 md:p-8"
          >
            <div className="flex items-start gap-5">
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-[0.75rem] ${rule.color} flex items-center justify-center ${
                  rule.color === "bg-primary" || rule.color === "bg-primary-container"
                    ? "text-on-primary"
                    : ""
                }`}
              >
                <span className="material-symbols-outlined text-3xl">
                  {rule.icon}
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold text-secondary uppercase tracking-widest">
                    Rule {i + 1}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-xl text-on-surface mb-3">
                  {rule.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed mb-4">
                  {rule.description}
                </p>
                <div className="space-y-2">
                  {rule.tips.map((tip, j) => (
                    <div
                      key={j}
                      className="flex items-start gap-2 text-sm text-on-surface"
                    >
                      <span
                        className="material-symbols-outlined text-primary text-base mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      {tip}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
