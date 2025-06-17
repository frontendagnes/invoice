import { useState, useEffect } from "react";
import "./style.css";

import { useStateValue } from "@/utility/StateProvider";
import useFirestore from "@/api/useFirestore/useFirestore";
//components
import Content from "./Content.jsx";

const CURRENT_YEAR = new Date().getFullYear();

function InfoYear() {
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [{ yearArray }, dispatch] = useStateValue();
  const { INVOICE_COUNTER_DOCUMENT_ID } = import.meta.env;

  const { setDocument, addDocument } = useFirestore("invoices");

  const yearExists =
    Array.isArray(yearArray) &&
    yearArray.some((item) => item.data.year === CURRENT_YEAR);

  useEffect(() => {
    if (!Array.isArray(yearArray) || yearArray.length === 0) return;

    setShowInfo(!yearExists);
  }, [yearArray]);

  const resetInvoiceNumber = async () => {
    const data = {
      count: 1,
    };
    await setDocument("number", INVOICE_COUNTER_DOCUMENT_ID, data);
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Numer faktury został zresetowany",
    });
  };

  const addYearToDB = async () => {
    dispatch({ type: "CLEAR_YEAR" });
    await addDocument({ year: CURRENT_YEAR }, "years");
  };

  const handleAddYear = async () => {
    if (yearExists) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Taki Rok już znajduje się na liście. Odśwież stronę i spróbuj ponownie.",
      });
      return;
    }

    await resetInvoiceNumber();
    await addYearToDB();
  };

  // Jeżeli dane jeszcze się nie załadowały
  if (!Array.isArray(yearArray) || yearArray.length === 0) return null;

  if (!showInfo) return null;

  return (
    <div className="infoyear">
      {userConfirmed ? (
        <Content
          text="Operacja spowoduje reset numeru faktury i dodanie nowego roku do bazy. Jesteś pewien, że chcesz kontynuować?"
          handleClick={handleAddYear}
          handleClickNo={() => setUserConfirmed(false)}
          buttonYesTxt="Pewnie, dodaj rok"
        />
      ) : (
        <Content
          text="Cześć, to ja Fakturka 2.0. Wykryłam, że nie dodałeś/aś jeszcze aktualnego roku. Czy chcesz zrobić to teraz?"
          handleClick={() => setUserConfirmed(true)}
          handleClickNo={() => setShowInfo(false)}
          buttonYesTxt="Dodaj Rok"
        />
      )}
    </div>
  );
}

export default InfoYear;
