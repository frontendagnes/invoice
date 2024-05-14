import React from "react";
import "./costHinsts.css";

//mui
import CloseIcon from "@mui/icons-material/Close";

function CostHinsts(props) {
  const { data, setConstractor, setNip, value, setValue, setIsViewTips } = props;
  const handleClick = (con, nip) => {
    setConstractor(con);
    setNip(nip);
    setIsViewTips(false);
    setValue("")
  };

  const filtredData = () => {
    const filter = data.filter(
      (item) =>
        item.data.counterparty.toLowerCase().includes(value.toLowerCase()) ||
        item.data.nip.toLowerCase().includes(value.toLowerCase())
    );

    if (filter.length === 0) {
      return (
        <div className="costHinst__no-results">
          Żaden element nie odpowiada wyszukiwanemu kryterium
        </div>
      );
    }

    return filter.map((item) => (
      <div
        key={item.id}
        className="costHinst__item"
        onClick={() => handleClick(item.data.counterparty, item.data.nip)}
      >
        {item.data.counterparty} | {item.data.nip}
      </div>
    ));
  };
  return (
    <div className="costHinst">
      <span className="costHints__close" onClick={() => setIsViewTips(false)}>
        <CloseIcon />
      </span>
      {filtredData()}
    </div>
  );
}

export default CostHinsts;
