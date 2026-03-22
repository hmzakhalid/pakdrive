import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import PracticePage from "./pages/PracticePage";
import SignsPage from "./pages/SignsPage";
import MockTestLanding from "./pages/MockTestLanding";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import LearnPage from "./pages/LearnPage";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/signs" element={<SignsPage />} />
          <Route path="/mock-test" element={<MockTestLanding />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/learn" element={<LearnPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
