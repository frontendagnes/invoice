import { useEffect, useState } from "react";

function usePrintMode() {
  const [isPrintMode, setIsPrintMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("print");
    const handleChange = (e) => setIsPrintMode(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isPrintMode;
}
 export default usePrintMode;