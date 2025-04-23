import { useState, useEffect } from "react";

const useListNavigation = (list, onClose, onSelectItem) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (list && list.length > 0) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(null);
    }
  }, [list]);

  const handleKeyDown = (event) => {
    if (!list || list.length === 0) return;

    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) =>
        prevIndex < list.length - 1 ? prevIndex + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : list.length - 1
      );
    } else if (event.key === "Enter") {
      const selected = list[selectedIndex];
      if (selected) {
        setSelectedItem(selected);
        if (onSelectItem) onSelectItem(selected);
        if (onClose) onClose(false);
      }
    }
  };
  useEffect(() => {
    if (list && list.length > 0 && selectedIndex < list.length) {
      setSelectedItem(list[selectedIndex]);
    }
  }, [selectedIndex, list]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [list, onSelectItem, onClose]);

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

// import { useState, useEffect } from "react";

// const useListNavigation = (list, onClose, onSelectItem) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     setSelectedIndex(0);
//   }, [list]);

//   const handleKeyDown = (event) => {
//     if (!list || list.length === 0) return;

//     if (event.key === "ArrowDown") {
//       setSelectedIndex((prevIndex) =>
//         prevIndex < list.length - 1 ? prevIndex + 1 : prevIndex
//       );
//     } else if (event.key === "ArrowUp") {
//       setSelectedIndex((prevIndex) =>
//         prevIndex > 0 ? prevIndex - 1 : prevIndex
//       );
//     } else if (event.key === "Enter") {
//       const selected = list[selectedIndex];
//       setSelectedItem(selected || null);
//       if (selected && onSelectItem) {
//         onSelectItem(selected);
//       }
//       if (selected && onClose) {
//         onClose(false);
//       }
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [list, selectedIndex]);

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
