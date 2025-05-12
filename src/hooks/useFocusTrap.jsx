import { useEffect } from "react";

function useFocusTrap(scopeRef, firstFocusableRef, lastFocusableRef, isOpen, onClickNo) {
  useEffect(() => {
    if (scopeRef.current && isOpen) {
      const focusableElements = scopeRef.current.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current =
          focusableElements[focusableElements.length - 1];
        if (firstFocusableRef.current) {
          firstFocusableRef.current.focus();
        }
      }
    }
  }, [scopeRef, isOpen, firstFocusableRef, lastFocusableRef]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClickNo?.(); // jeśli przekazano
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClickNo]);
  const handleKeyDown = (event) => {
    if (event.key === "Tab" && scopeRef.current && isOpen) {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          event.preventDefault();
          lastFocusableRef.current.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          event.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    }
  };

  return handleKeyDown;
}

export { useFocusTrap };
