import { useState, useEffect } from "react";

const useListNavigation = (list) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setSelectedIndex(0);
  }, [list]);

  const handleKeyDown = (event) => {
    if (!list || list.length === 0) return;

    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < list.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (event.key === "Enter") {
      setSelectedItem(list[selectedIndex] || null);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [list, selectedIndex]);

  const changeIndex = (item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  };

  return {
    selectedIndex,
    selectedItem,
    changeIndex,
  };
};

export default useListNavigation;
