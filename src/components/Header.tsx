import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { trackNavigationClicked } from "../lib/analytics";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { label: "The Book", href: "#book" },
    { label: "Excerpts", href: "#excerpts" },
    { label: "Recognition", href: "#recognition" },
    { label: "The Project", href: "#project" },
    { label: "About", href: "#about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    menuItems.forEach((item) => {
      const el = document.querySelector(item.href);
      if (el) observer.observe(el);
    });

    return () => {
      menuItems.forEach((item) => {
        const el = document.querySelector(item.href);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string,
    placement: "desktop_header" | "mobile_menu" | "brand",
  ) => {
    e.preventDefault();
    trackNavigationClicked({
      destination: href,
      label,
      placement,
    });
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
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 border-b ${
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
              onClick={(e) =>
                scrollToSection(e, "#root", "The Narrative Witness", "brand")
              }
              className="font-serif text-lg md:text-xl tracking-wider uppercase font-medium hover:opacity-75 transition-opacity duration-300"
            >
              The Narrative Witness
            </a>
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ash/80 mt-0.5 max-sm:hidden">
              Adoption, Relinquishment &amp; Literary Testimony
            </span>
          </div>

          {/* Desktop Nav */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-10">
            {menuItems.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  id={`nav-${item.label.toLowerCase()}`}
                  key={item.label}
                  href={item.href}
                  onClick={(e) =>
                    scrollToSection(
                      e,
                      item.href,
                      item.label,
                      "desktop_header",
                    )
                  }
                  className={`relative font-mono text-[10px] uppercase tracking-widest pb-1 transition-all duration-300 ${
                    isActive ? "text-ink font-semibold" : "text-ash hover:text-ink hover:italic"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeSectionUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
            <a
              id="nav-cta"
              href="#signup"
              onClick={(e) =>
                scrollToSection(e, "#signup", "Support", "desktop_header")
              }
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-ink hover:text-ash hover:italic border-b border-b-ink pb-0.5 transition-all duration-300"
            >
              Support <ArrowUpRight size={10} />
            </a>
          </nav>

          {/* Mobile Menu Trigger */}
          <button
            id="mobile-menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-[71] lg:hidden text-ink hover:text-ash transition-colors focus:outline-none"
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
            className="fixed inset-0 z-[60] flex h-[100dvh] flex-col justify-between overflow-y-auto bg-paper px-8 pb-10 pt-28 lg:hidden paper-grain"
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
                    onClick={(e) =>
                      scrollToSection(
                        e,
                        item.href,
                        item.label,
                        "mobile_menu",
                      )
                    }
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
                onClick={(e) =>
                  scrollToSection(
                    e,
                    "#signup",
                    "Register Support",
                    "mobile_menu",
                  )
                }
                className="w-full text-center py-4 bg-ink text-paper font-mono text-[10px] uppercase tracking-widest"
              >
                Register Support
              </a>
              <div className="text-center font-mono text-[9px] text-ash/65 tracking-[0.1em]">
                THE NARRATIVE WITNESS © 2026. ALL RIGHTS WITNESSED.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
