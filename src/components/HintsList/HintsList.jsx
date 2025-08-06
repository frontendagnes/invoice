import { useCallback, useMemo, useRef, useEffect } from "react";
import "./HintsList.css";

import useListNavigation from "../../hooks/useListNavigation";

function HintsList({
  items,
  value,
  onSelect,
  setIsViewTips,
  filterCallback,
  renderItem,
  width="100%"
}) {
  const listContainerRef = useRef(null);

  const handleItemSelected = useCallback(
    (item) => {
      if (item) {
        onSelect(item);
        setIsViewTips(false);
      }
    },
    [onSelect, setIsViewTips]
  );

  const filteredData = useMemo(() => {
    if (!filterCallback) {
      return items.filter((item) =>
        JSON.stringify(item.data).toLowerCase().includes(value.toLowerCase())
      );
    }

    return items.filter((item) => filterCallback(item.data, value));
  }, [items, value, filterCallback]);

  const { selectedIndex, changeIndex } = useListNavigation(
    filteredData,
    setIsViewTips,
    handleItemSelected
  );

  const handleClick = useCallback(
    (item, index) => {
      changeIndex(item, index);
      handleItemSelected(item);
    },
    [changeIndex, handleItemSelected]
  );

  useEffect(() => {
    if (
      listContainerRef.current &&
      selectedIndex !== null &&
      items.length > 0
    ) {
      const activeElement = listContainerRef.current.querySelector(
        `.hintsList__item.active`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex, items]);

  if (filteredData.length === 0) return null;

  return (
    <div className="hintsList" style={{width: width}}>
      <div className="hintsList__container" ref={listContainerRef}>
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            className={`hintsList__item ${
              index === selectedIndex ? "active" : ""
            }`}
            onClick={() => handleClick(item, index)}
          >
            {renderItem(item.data)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HintsList;
