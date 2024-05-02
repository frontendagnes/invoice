import React, { useState, useEffect } from "react";
import "./style.css";

import { useStateValue } from "@/assets/utility/StateProvider";
import { db, doc, setDoc, collection, addDoc } from "@/assets/utility/firebase";

//components
import Content from "./Content.jsx";

function InfoYear() {
  const [isYes, setIsYes] = useState(false);
  const [isInfo, setIsInfo] = useState(false);
  const [{ yearArray, user }, dispatch] = useStateValue();
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

  const updateNumber = async () => {
    const updateRef = doc(
      db,
      "invoices",
      user?.uid,
      "number",
      "YgYuBDoz5AisskTWslyB"
    );
    await setDoc(updateRef, { count: 1 })
      .then(() =>
        dispatch({
          type: "ALERT_SUCCESS",
          item: "Numer faktury został zresetowany",
        })
      )
      .catch((error) => {
        console.log(error.message);
        dispatch({ type: "ALERT__ERROR", item: error.message });
      });
  };
  const addData = async () => {
    dispatch({ type: "CLEAR_YEAR" });
    const docRef = doc(db, "invoices", user?.uid);
    const ref = collection(docRef, "years");

    try {
      await addDoc(ref, {
        year: nextYear,
      });

      dispatch({
        type: "ALERT_SUCCESS",
        item: "Rok został dodany prawidłowo",
      });
    } catch (error) {
      console.log("Błąd dodawania roku", error);
    }
  };

  const addCurrentYear = () => {
    if (yearArray.some((item) => item.data.year === nextYear)) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Taki Rok już znajduje się na liście odśwież stronę i spróbuj jeszcze raz",
      });
      return;
    }

    updateNumber();
    addData();
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
