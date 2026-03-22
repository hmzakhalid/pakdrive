export interface Question {
  id: number;
  question: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  correct_option: "a" | "b" | "c" | "d";
  image?: string;
}

export type OptionKey = "a" | "b" | "c" | "d";

export interface QuizState {
  questions: Question[];
  currentIndex: number;
  answers: Record<number, OptionKey>;
  startTime: number;
  mode: "practice" | "mock";
}

export interface QuizResult {
  totalQuestions: number;
  correct: number;
  incorrect: number;
  skipped: number;
  score: number;
  answers: Record<number, OptionKey>;
  questions: Question[];
  timeTaken: number;
}
