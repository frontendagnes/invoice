import { useState, useEffect, useCallback } from "react";

const useDebouncedValue = (value, delay = 300) => {
  const [debounced, setDebounced] = useState(value);

  // Używamy useCallback, by memoizować funkcję, która ustawia debounced value
  const setDebouncedValue = useCallback(() => {
    setDebounced(value);
  }, [value]);

  useEffect(() => {
    const timeout = setTimeout(setDebouncedValue, delay);
    return () => clearTimeout(timeout);
  }, [value, delay, setDebouncedValue]);

  return debounced;
};

export default useDebouncedValue;
