import { useEffect } from "react";

export function useClickOutside(ref, handler, additionalRefs = []) {
  useEffect(() => {
    const handleClick = (event) => {
      const clickedInsideMain = ref.current?.contains(event.target);
      const clickedInsideAdditional = additionalRefs.some(
        (r) => r.current && r.current.contains(event.target)
      );

      if (!clickedInsideMain && !clickedInsideAdditional) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", handleClick); // bubbling phase

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [ref, handler, additionalRefs]);
}
