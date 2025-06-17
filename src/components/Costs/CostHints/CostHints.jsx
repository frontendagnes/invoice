import { useCallback, useMemo, useRef, useEffect } from "react";
import "./costHints.css";

//components
import useListNavigation from "../../../hooks/useListNavigation";

function CostHints(props) {
  const { data, setNip, value, setValue, setIsViewTips } = props;
  const listContainerRef = useRef(null);

  const handleItemSelected = useCallback(
    (item) => {
      if (item?.data) {
        setNip(item.data.nip);
        setValue(item.data.contractor);
        setIsViewTips(false);
      }
    },
    [ setNip, setValue, setIsViewTips]
  );
  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.data.contractor.toLowerCase().includes(value.toLowerCase()) ||
        item.data.nip.toLowerCase().includes(value.toLowerCase())
    );
  }, [data, value]);

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
    if (listContainerRef.current && selectedIndex !== null && data.length > 0) {
      const activeElement = listContainerRef.current.querySelector(
        `.costHinst__item.active`
      );
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [selectedIndex, data]);

  const showData = useMemo(() => {
    if (filteredData.length === 0) {
      return (
        <div className="costHinst__no-results">
          Żaden element nie odpowiada wyszukiwanemu kryterium
        </div>
      );
    }

    return filteredData.map((item, index) => (
      <div
        key={item.id}
        className={`costHinst__item ${index === selectedIndex ? "active" : ""}`}
        onClick={() => handleClick(item, index)}
      >
        {item.data.contractor} {item.data.nip}
      </div>
    ));
  }, [data, value, selectedIndex, handleClick]);
  return (
    <div className="costHinst">
      <div className="costHinst__constainer" ref={listContainerRef}>
        {showData}
      </div>
    </div>
  );
}

export default CostHints;
