import { useCallback, useEffect, useMemo, useRef } from "react";
import "./ProductHints.css";
import useListNavigation from "../../../../hooks/useListNavigation";

function ProductHints(props) {
  const {
    value,
    products,
    setValue,
    setPrice,
    setIsViewTips,
    setSelectedProductId,
  } = props;
  const listContainerRef = useRef(null);

  const handleItemSelected = useCallback(
    (item) => {
      if (item?.data) {
        setValue(item.data.name);
        setPrice(item.data.price);
        setSelectedProductId(item.id);
        setIsViewTips(false)
      }
    },
    [setPrice, setValue, setIsViewTips, setSelectedProductId]
  );

  const filteredData = useMemo(() => {
    return products.filter((item) =>
      item.data.name.toLowerCase().includes(value.toLowerCase())
    );
  });

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
      products.length > 0
    ) {
      const activeElement = listContainerRef.current.querySelector(
        `.productHints__item.active`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex, products]);

  if (filteredData.length === 0) return null;
  return (
    <div className="productHints">
      <div className="productHints__container" ref={listContainerRef}>
        {filteredData.map((item, index) => (
          <div
            key={item.id}
            className={`productHints__item ${
              index === selectedIndex ? "active" : ""
            }`}
            onClick={() => handleClick(item, index)}
          >
            <div>{item.data.name} </div>
            <div>{item.data.quantity} szt </div>
            <div>{item.data.price} zł </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductHints;
