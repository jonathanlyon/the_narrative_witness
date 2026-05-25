import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "The Book", href: "#book" },
    { label: "Excerpts", href: "#excerpts" },
    { label: "Responses", href: "#responses" },
    { label: "The Project", href: "#project" },
    { label: "About", href: "#about" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-paper/95 backdrop-blur-md py-4 border-dust/40"
            : "bg-transparent py-6 border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
          <div className="flex flex-col">
            <a
              id="header-logo"
              href="#"
              onClick={(e) => scrollToSection(e, "#root")}
              className="font-serif text-lg md:text-xl tracking-wider uppercase font-medium hover:opacity-75 transition-opacity duration-300"
            >
              The Split Frame
            </a>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash/80 mt-0.5 max-sm:hidden">
              Adoption, Relinquishment &amp; Literary Testimony
            </span>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => (
              <a
                id={`nav-${item.label.toLowerCase()}`}
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="font-mono text-[10px] uppercase tracking-widest text-ash hover:text-ink hover:italic transition-all duration-300"
              >
                {item.label}
              </a>
            ))}
            <a
              id="nav-cta"
              href="#signup"
              onClick={(e) => scrollToSection(e, "#signup")}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink hover:text-ash hover:italic border-b border-b-ink pb-0.5 transition-all duration-300"
            >
              Sign Up <ArrowUpRight size={10} />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-ink hover:text-ash transition-colors focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-paper z-45 pt-28 px-8 flex flex-col justify-between pb-12 lg:hidden paper-grain"
          >
            <div className="flex flex-col gap-8">
              <span className="font-mono text-[9px] uppercase tracking-widest text-ash/50 border-b border-dust/40 pb-2">
                INDEX OF WORKS
              </span>
              <nav className="flex flex-col gap-6">
                {menuItems.map((item, idx) => (
                  <motion.a
                    id={`mobile-nav-${item.label.toLowerCase()}`}
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={item.href}
                    onClick={(e) => scrollToSection(e, item.href)}
                    className="font-serif text-3xl font-light hover:opacity-75 hover:italic tracking-wide text-ink list-none transition-all duration-300"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <a
                id="mobile-cta"
                href="#signup"
                onClick={(e) => scrollToSection(e, "#signup")}
                className="w-full text-center py-4 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest"
              >
                Join Pre-Launch
              </a>
              <div className="text-center font-mono text-[9px] text-ash/65 tracking-[0.1em]">
                THE SPLIT FRAME © 2026. ALL RIGHTS WITNESSED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
