"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { useIndicatorPosition } from "@/app/hooks/useIndicatorPosition";
import { useNavbarShrink } from "@/app/hooks/useNavbarShrink";
import { useMobileNavAutoHide } from "@/app/hooks/useMobileNavAutoHide";
import ThemeToggle from "../ThemeToggle";

export default function Navbar() {
  const activeSection = useActiveSection();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Auto-hide functionality for mobile navbar
  const { isVisible: isMobileNavVisible, showAndStartTimer } = useMobileNavAutoHide({
    hideDelay: 10000, // 10 seconds
    scrollThreshold: 10 // Lower threshold for better responsiveness
  });
  
  const {
    isExpanded,
    handleMouseEnter,
    handleMouseLeave,
    getContainerClasses,
    getNavClasses,
    getBackgroundOpacity,
    getGlowOpacity,
    getListPadding,
  } = useNavbarShrink({ threshold: 50 });
  
  const { navRef, indicatorStyle, setLinkRef } = useIndicatorPosition(
    activeSection,
    isExpanded
  );

  const containerClasses = getContainerClasses();
  const navClasses = getNavClasses();
  const backgroundOpacity = getBackgroundOpacity();
  const glowOpacity = getGlowOpacity();
  const listPadding = getListPadding();

  const getLinkClass = (sectionId: string): string => {
    return activeSection === sectionId
      ? "text-midnight-900 font-medium px-6 py-2.5 rounded-xl transition-all duration-300 relative z-10 text-sm"
      : "text-foreground/80 hover:text-foreground font-medium px-6 py-2.5 rounded-xl transition-all duration-300 relative z-10 text-sm tracking-wide hover:scale-105 hover:bg-white/5";
  };

  const getMobileLinkClass = (sectionId: string): string => {
    return activeSection === sectionId
      ? "block w-full text-left px-4 py-3 text-foreground font-medium bg-foreground/15 rounded-lg transition-all duration-300"
      : "block w-full text-left px-4 py-3 text-foreground/80 hover:text-foreground hover:bg-foreground/10 font-medium rounded-lg transition-all duration-300";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Show navbar when menu is toggled
    showAndStartTimer();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <div
        className={`hidden md:flex fixed left-0 right-0 z-50 justify-center ${containerClasses.position} ${containerClasses.transition}`}
      >
        <nav
          ref={navRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`relative rounded-2xl backdrop-blur-2xl border border-white/20 overflow-hidden group ${navClasses.scale} ${navClasses.shadow} ${navClasses.transition}`}
          style={{
            background: `
              linear-gradient(135deg, rgba(255, 255, 255, ${backgroundOpacity.primary}) 0%, rgba(255, 255, 255, ${backgroundOpacity.secondary}) 50%, rgba(255, 255, 255, ${backgroundOpacity.tertiary}) 100%),
              radial-gradient(circle at 50% 0%, rgba(255, 255, 255, ${backgroundOpacity.radial}) 0%, transparent 50%)
            `,
          }}
        >
          <div 
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, rgba(255, 255, 255, ${parseInt(glowOpacity)/100}), transparent)`
            }}
          />

          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Indicador deslizante */}
          <div
            className="absolute top-2.5 bottom-2.5 rounded-xl transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              background: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%),
                radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.8) 100%)
              `,
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent" />
          </div>

          <ul className={`flex items-center gap-2 relative z-10 ${listPadding}`}>
            <li>
              <Link
                href="/"
                className={getLinkClass("home")}
                ref={setLinkRef("home")}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#proyectos"
                className={getLinkClass("proyectos")}
                ref={setLinkRef("proyectos")}
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                href="/#habilidades"
                className={getLinkClass("habilidades")}
                ref={setLinkRef("habilidades")}
              >
                Habilidades
              </Link>
            </li>
            <li>
              <Link
                href="/#contacto"
                className={getLinkClass("contacto")}
                ref={setLinkRef("contacto")}
              >
                Contacto
              </Link>
            </li>
            <li className="ml-1 pl-1 sm:ml-2 sm:pl-2 border-l border-foreground/15 flex items-center">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <div className={`md:hidden fixed top-6 right-4 z-50 transition-all duration-300 ${
        isMobileNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
      }`}>
        <button
          onClick={toggleMobileMenu}
          className="relative w-12 h-12 rounded-xl backdrop-blur-2xl border border-foreground/15 bg-background/25 flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <div className="flex flex-col space-y-1.5">
            <span 
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>

        {/* Mobile Menu */}
        <div 
          className={`absolute top-16 right-0 w-48 rounded-2xl backdrop-blur-2xl border border-foreground/15 overflow-hidden transition-all duration-300 bg-background/80 ${
            isMobileMenuOpen 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <nav className="p-2">
            <Link
              href="/"
              className={getMobileLinkClass("home")}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/#proyectos"
              className={getMobileLinkClass("proyectos")}
              onClick={closeMobileMenu}
            >
              Proyectos
            </Link>
            <Link
              href="/#habilidades"
              className={getMobileLinkClass("habilidades")}
              onClick={closeMobileMenu}
            >
              Habilidades
            </Link>
            <Link
              href="/#contacto"
              className={getMobileLinkClass("contacto")}
              onClick={closeMobileMenu}
            >
              Contacto
            </Link>
            <div className="mt-2 pt-2 border-t border-foreground/15 px-4 flex justify-between items-center">
              <span className="text-sm font-medium text-foreground/80">Tema</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay para cerrar el menu mobile */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
}