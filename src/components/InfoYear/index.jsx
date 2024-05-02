import React, { useState, useEffect } from "react";
import "./style.css";

import { useStateValue } from "@/assets/utility/StateProvider";

//components
import Content from "./Content.jsx";

function InfoYear() {
  const [isYes, setIsYes] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [{ yearArray }, dispatch] = useStateValue();
  const nextYear = new Date().getFullYear();

  useEffect(() => {
    if (
      yearArray.length > 0 &&
      !yearArray.some((item) => item.data.year === nextYear)
    ) {
      setIsInfo(true);
      return;
    }
    setIsInfo(false);
  }, [yearArray]);

  const updateNumber = () => {};
  const addData = () => {};

  const addCurrentYear = () => {
    addData();
    updateNumber();
    console.log("Dodałam rok");
  };

  if (isInfo) {
    return (
      <div className="infoyear">
        {isYes ? (
          <Content
            text="Operacja spowoduje reset numeru faktury i dodanie nowego roku do bazy. Jesteś pewien że chcesz kontynuować"
            handleClick={addCurrentYear}
            handleClickNo={() => setIsYes(false)}
            buttonYesTxt="Pewnie, dodaj rok"
          />
        ) : (
          <Content
            text="Cześć, to ja Fakturka 2.0, wykryłam, że nie dodałeś/aś jeszcze aktualnego roku czy chcesz zrobić to teraz?"
            handleClick={() => setIsYes(true)}
            handleClickNo={() => {
              setIsInfo(false);
            }}
            buttonYesTxt="Dodaj Rok"
          />
        )}
      </div>
    );
  }
}

export default InfoYear;
