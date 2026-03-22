import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  const navLink = (path: string, label: string) => (
    <Link
      to={path}
      onClick={() => setMenuOpen(false)}
      className={`block ${
        isActive(path)
          ? "text-primary border-b-2 border-primary"
          : "text-secondary hover:text-primary"
      } pb-1 font-manrope font-bold text-lg transition-colors`}
    >
      {label}
    </Link>
  );

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-md">
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
        <Link to="/">
          <img src="/logo.png" alt="PakDrive" className="h-9" />
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLink("/dashboard", "Dashboard")}
          {navLink("/practice", "Practice")}
          {navLink("/signs", "Road Signs")}
          {navLink("/mock-test", "Mock Test")}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="hidden md:block bg-primary text-on-primary font-bold px-6 py-2.5 rounded-[0.75rem] active:scale-95 duration-150 transition-all shadow-sm"
          >
            Get Started
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-[0.5rem] hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-on-surface">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-t border-outline-variant/20 px-6 py-4 flex flex-col gap-4">
          {navLink("/dashboard", "Dashboard")}
          {navLink("/practice", "Practice")}
          {navLink("/signs", "Road Signs")}
          {navLink("/mock-test", "Mock Test")}
          {navLink("/learn", "Study Guide")}
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="block bg-primary text-on-primary font-bold px-6 py-3 rounded-[0.75rem] text-center active:scale-95 transition-all"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
