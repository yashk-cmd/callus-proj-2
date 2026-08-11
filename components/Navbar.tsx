"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" || path === "/analyzer") {
      return pathname === "/" || pathname === "/analyzer";
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="bg-surface border-b border-outline-variant docked full-width top-0 flat no shadows sticky z-50">
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-16 max-w-container-max mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <span className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-primary tracking-tight">
            VeritasAI
          </span>
          <span className="hidden sm:inline-block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant bg-surface-container px-2 py-0.5 rounded border border-outline-variant">
            Admissions Research
          </span>
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-6 h-full font-ui-body text-ui-body">
          <Link
            href="/"
            className={`h-full flex items-center px-2 border-b-2 transition-colors duration-200 ${
              isActive("/")
                ? "text-primary border-primary font-bold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Analyzer
          </Link>
          <Link
            href="/methodology"
            className={`h-full flex items-center px-2 border-b-2 transition-colors duration-200 ${
              isActive("/methodology")
                ? "text-primary border-primary font-bold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Methodology
          </Link>
          <Link
            href="/dataset"
            className={`h-full flex items-center px-2 border-b-2 transition-colors duration-200 ${
              isActive("/dataset")
                ? "text-primary border-primary font-bold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Dataset
          </Link>
          <Link
            href="/evaluation"
            className={`h-full flex items-center px-2 border-b-2 transition-colors duration-200 ${
              isActive("/evaluation")
                ? "text-primary border-primary font-bold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Evaluation
          </Link>
          <Link
            href="/limitations"
            className={`h-full flex items-center px-2 border-b-2 transition-colors duration-200 ${
              isActive("/limitations")
                ? "text-primary border-primary font-bold"
                : "text-on-surface-variant border-transparent hover:text-primary"
            }`}
          >
            Limitations
          </Link>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/evaluation"
            className="hidden sm:block font-ui-body text-ui-body text-on-surface-variant hover:text-primary transition-colors cursor-pointer px-3 py-1.5"
          >
            Research Charter
          </Link>
          <Link
            href="/"
            className="bg-primary-container text-on-primary rounded px-5 py-2 font-label-caps text-label-caps hover:bg-opacity-90 transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            Analyze Essay
          </Link>
        </div>
      </div>
    </header>
  );
}
