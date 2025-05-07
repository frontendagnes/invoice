import { useState, useEffect } from "react";

const useListNavigationHorizonatl = (list, onClose, onSelectItem) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedIndex(0);
    }
  }, [list]);

  const handleKeyDown = (event) => {
    if (!list || list.length === 0) return;

    if (event.key === "ArrowRight") {
      setSelectedIndex((prevIndex) =>
        prevIndex < list.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowLeft") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : list.length - 1
      );
    } else if (event.key === "Enter") {
      const selected = list[selectedIndex];
      if (selected) {
        setSelectedItem(selected);
        if (onSelectItem) onSelectItem(selected); // klik przez klawiaturę
        if (onClose) onClose(); // zamknięcie np. submenu
      }
    }
  };

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedItem(list[selectedIndex]);
    }
  }, [selectedIndex, list]);

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

export default useListNavigationHorizonatl;
