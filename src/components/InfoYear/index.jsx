import React, { useState, useEffect } from "react";
import "./style.css";

import { useStateValue } from "@/assets/utility/StateProvider";
const addData = () => {
    // updateNumber
  console.log("Dodałam rok");
};
const Content = ({ text, handleClick, handleClickNo }) => {
  return (
    <div className="infoyear__content">
      <div className="infoyear__content--text">{text}</div>
      <div className="infoyear__content--buttons">
        <button
          type="button"
          onClick={handleClickNo}
          className="infoyear__buttonNo"
        >
          Ignoruj
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="infoyear__buttonYes"
        >
          Dodaj Rok
        </button>
      </div>
    </div>
  );
};

const Approve = ({ handleClickNo }) => {
  return (
    <Content
      text="Operacja spowoduje reset numeru faktury i dodanie nowego roku do bazy. Jesteś pewien że chcesz kontynuować"
      handleClick={addData}
      handleClickNo={handleClickNo}
    />
  );
};

function InfoYear() {
  const [isYes, setIsYes] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [{ yearArray }, dispatch] = useStateValue();

  useEffect(() => {
    if (
      yearArray.length > 0 &&
      !yearArray.some((item) => item.data.year === 2021)
    ) {
      setIsInfo(true);
      return;
    }
    setIsInfo(false);

  }, [yearArray]);

  if (isInfo) {
    return (
      <div className="infoyear">
        {isYes ? (
          <Approve handleClickNo={() => setIsYes(false)} />
        ) : (
          <Content
            text=" Cześć, to ja Fakturka 2.0, wykryłam, że nie dodałeś/aś jeszcze aktualnego roku czy chcesz zrobić to teraz?"
            handleClick={() => setIsYes(true)}
            handleClickNo={() => {
              setIsInfo(false);
            }}
          />
        )}
      </div>
    );
  }
}

export default InfoYear;
