import React, { useCallback, useMemo, useRef, useEffect } from "react";
import "./costHints.css";

//mui
import CloseIcon from "@mui/icons-material/Close";
//components
import useListNavigation from "../../hooks/useListNavigation";

function CostHints(props) {
  const { data, setContractor, setNip, value, setValue, setIsViewTips } = props;
  const listContainerRef = useRef(null);
  // const activeItemRef = useRef(null);

  const handleItemSelected = useCallback(
    (item) => {
      if (item?.data) {
        setContractor(item.data.contractor);
        setNip(item.data.nip);
        setValue(item.data.contractor);
        setIsViewTips(false);
      }
    },
    [setContractor, setNip, setValue, setIsViewTips]
  );
  const { selectedIndex, changeIndex } = useListNavigation(
    data,
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

  const filtredData = useMemo(() => {
    const filter = data.filter(
      (item) =>
        item.data.contractor.toLowerCase().includes(value.toLowerCase()) ||
        item.data.nip.toLowerCase().includes(value.toLowerCase())
    );

    if (filter.length === 0) {
      return (
        <div className="costHinst__no-results">
          Żaden element nie odpowiada wyszukiwanemu kryterium
        </div>
      );
    }

    return filter.map((item, index) => (
      <div
        key={item.id}
        // ref={index === selectedIndex ? activeItemRef : null}
        className={`costHinst__item ${index === selectedIndex ? "active" : ""}`}
        onClick={() => handleClick(item, index)}
      >
        {item.data.contractor} {item.data.nip}
      </div>
    ));
  }, [data, value, selectedIndex, handleClick]);
  return (
    <div className="costHinst">
      <span className="costHints__close" onClick={() => setIsViewTips(false)}>
        <CloseIcon />
      </span>
      <div className="costHints__container" ref={listContainerRef}>
        {filtredData}
      </div>
    </div>
  );
}

export default CostHints;
