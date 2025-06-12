import { useState, useEffect, useCallback } from "react";

const useListNavigation = (list, onClose, onSelectItem) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedIndex((prevIndex) => {
        if (prevIndex === null || prevIndex >= list.length) {
          return 0;
        }
        return prevIndex;
      });
    } else {
      setSelectedIndex(null);
      setSelectedItem(null);
    }
  }, [list]);

  useEffect(() => {
    if (
      list &&
      list.length > 0 &&
      selectedIndex !== null &&
      selectedIndex < list.length
    ) {
      setSelectedItem(list[selectedIndex]);
    } else {
      setSelectedItem(null);
    }
  }, [selectedIndex, list]);

  const handleKeyDown = useCallback(
    (event) => {
      // Jeżeli lista jest pusta, to klawisze nawigacyjne nie powinny nic robić,
      // ale ESC nadal powinien zamykać podpowiedzi.
      if (!list || list.length === 0) {
        if (event.key === "Escape") {
          event.preventDefault();
          if (onClose) onClose(false);
        }
        return;
      }

      if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.key)) {
        event.preventDefault();
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex >= list.length - 1 ? 0 : prevIndex + 1
        );
      } else if (event.key === "ArrowUp") {
        setSelectedIndex((prevIndex) =>
          prevIndex === null || prevIndex <= 0 ? list.length - 1 : prevIndex - 1
        );
      } else if (event.key === "Enter") {
        const selected = list[selectedIndex];
        if (selected) {
          setSelectedItem(selected);
          if (onSelectItem) onSelectItem(selected);
          if (onClose) onClose(false);
        }
      } else if (event.key === "Escape") {
        if (onClose) onClose(false);
      }
    },
    [list, selectedIndex, onSelectItem, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const changeIndex = useCallback((item, index) => {
    setSelectedItem(item);
    setSelectedIndex(index);
  }, []); // Brak zależności, bo operuje na propach

  return {
    selectedIndex,
    selectedItem,
    changeIndex,
  };
};

export default useListNavigation;

// import { useState, useEffect } from "react";

// const useListNavigation = (list, onClose, onSelectItem) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     if (list && list.length > 0) {
//       setSelectedIndex(0);
//     } else {
//       setSelectedIndex(null);
//     }
//   }, [list]);

//   useEffect(() => {
//     if (list && list.length > 0 && selectedIndex < list.length) {
//       setSelectedItem(list[selectedIndex]);
//     }
//   }, [selectedIndex, list]);

//   const handleKeyDown = (event) => {
//     if (!list || list.length === 0) return;

//     if (["ArrowDown", "ArrowRight"].includes(event.key)) {
//       setSelectedIndex((prevIndex) =>
//         prevIndex < list.length - 1 ? prevIndex + 1 : 0
//       );
//     } else if (["ArrowUp", "ArrowLeft"].includes(event.key)) {
//       setSelectedIndex((prevIndex) =>
//         prevIndex > 0 ? prevIndex - 1 : list.length - 1
//       );
//     } else if (event.key === "Enter") {
//       const selected = list[selectedIndex];
//       if (selected) {
//         setSelectedItem(selected);
//         if (onSelectItem) onSelectItem(selected);
//         if (onClose) onClose(false);
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [list, selectedIndex, onSelectItem, onClose]);

//   const changeIndex = (item, index) => {
//     setSelectedItem(item);
//     setSelectedIndex(index);
//   };

//   return {
//     selectedIndex,
//     selectedItem,
//     changeIndex,
//   };
// };

// export default useListNavigation;
