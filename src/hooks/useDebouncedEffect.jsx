// useDebouncedEffect.js
import { useEffect, useRef } from "react";

/**
 * Hook wykonujący efekt z debouncingiem.
 * @param {Function} effect Funkcja do wykonania
 * @param {Array} deps Lista zależności
 * @param {number} delay Czas opóźnienia w ms
 */
function useDebouncedEffect(effect, deps, delay) {
  const handler = useRef();

  useEffect(() => {
    if (handler.current) {
      clearTimeout(handler.current);
    }

    handler.current = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [...deps, delay]);
}

export default useDebouncedEffect;
