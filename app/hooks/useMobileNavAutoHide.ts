"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface UseMobileNavAutoHideOptions {
  hideDelay?: number; // Time in ms before auto-hiding
  scrollThreshold?: number; // Scroll distance before hiding/showing
}

export function useMobileNavAutoHide(options: UseMobileNavAutoHideOptions = {}) {
  const { hideDelay = 10000, scrollThreshold = 10 } = options; // 10 seconds default
  
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Clear existing timer
  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current as unknown as number);
      hideTimerRef.current = null;
    }
  }, []);

  // Start hide timer
  const startHideTimer = useCallback(() => {
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, hideDelay) as unknown as NodeJS.Timeout;
  }, [hideDelay, clearHideTimer]);

  // Show navbar and start timer
  const showAndStartTimer = useCallback(() => {
    setIsVisible(true);
    startHideTimer();
  }, [startHideTimer]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDifference = currentScrollY - lastScrollYRef.current;

      // Only react to significant scroll changes
      if (Math.abs(scrollDifference) > scrollThreshold) {
        if (scrollDifference > 0) {
          // Scrolling down - hide immediately
          clearHideTimer();
          setIsVisible(false);
        } else {
          // Scrolling up - show and start timer
          showAndStartTimer();
        }

        lastScrollYRef.current = currentScrollY;
      }
    };

    // Initialize
    lastScrollYRef.current = window.scrollY;
    startHideTimer();

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearHideTimer();
    };
  }, [scrollThreshold, showAndStartTimer, startHideTimer, clearHideTimer]);

  // Manual show/hide functions
  const show = () => {
    clearHideTimer();
    setIsVisible(true);
  };

  const hide = () => {
    clearHideTimer();
    setIsVisible(false);
  };

  return {
    isVisible,
    show,
    hide,
    showAndStartTimer,
  };
}
