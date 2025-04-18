import React, { useCallback, useMemo } from "react";
import "./costHints.css";

//mui
import CloseIcon from "@mui/icons-material/Close";
//components
import useListNavigation from "../../hooks/useListNavigation";

function CostHints(props) {
  const { data, setConstractor, setNip, value, setValue, setIsViewTips } =
    props;

  const handleItemSelected = useCallback(
    (item) => {
      if (item?.data) {
        setConstractor(item.data.contractor);
        setNip(item.data.nip);
        setValue(item.data.contractor);
        setIsViewTips(false);
      }
    },
    [setConstractor, setNip, setValue, setIsViewTips]
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
      {filtredData}
    </div>
  );
}

export default CostHints;
