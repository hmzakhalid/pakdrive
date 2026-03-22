import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-surface-container-low w-full py-12 mt-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-6">
          <img src="/logo.png" alt="PakDrive" className="h-9" />
          <p className="text-secondary text-sm leading-relaxed max-w-sm">
            Empowering the next generation of safe Pakistani drivers with
            digital-first preparation tools. Not affiliated with NH&MP.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="font-manrope font-bold text-on-surface">
              Navigation
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/dashboard"
                  className="text-secondary hover:text-primary text-sm"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/practice"
                  className="text-secondary hover:text-primary text-sm"
                >
                  Practice
                </Link>
              </li>
              <li>
                <Link
                  to="/signs"
                  className="text-secondary hover:text-primary text-sm"
                >
                  Road Signs
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="font-manrope font-bold text-on-surface">
              Resources
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/mock-test"
                  className="text-primary hover:text-primary-container text-sm font-semibold"
                >
                  Take Mock Test
                </Link>
              </li>
              <li>
                <Link
                  to="/learn"
                  className="text-secondary hover:text-primary text-sm"
                >
                  Study Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-outline-variant/20 text-center">
        <p className="text-secondary text-sm">
          © {new Date().getFullYear()} PakDrive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
