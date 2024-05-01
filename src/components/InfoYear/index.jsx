import React, { useState, useEffect } from "react";
import "./style.css";

import { useStateValue } from "@/assets/utility/StateProvider";

//components
import Content from "./Content.jsx";
import Approve from "./Approve.jsx";

function InfoYear() {
  const [isYes, setIsYes] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [{ yearArray }, dispatch] = useStateValue();

  useEffect(() => {
    if (
      yearArray.length > 0 &&
      !yearArray.some((item) => item.data.year === 2024)
    ) {
      setIsInfo(true);
      return;
    }
    setIsInfo(false);
  }, [yearArray]);

  const addData = () => {
    // updateNumber
    console.log("Dodałam rok");
  };
  if (isInfo) {
    return (
      <div className="infoyear">
        {isYes ? (
          <Approve handleClickNo={() => setIsYes(false)} addData={addData} />
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
