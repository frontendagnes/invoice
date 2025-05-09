// useAddCostForm.js
import { useEffect, useState } from "react";
import { validate, validateContractor } from "./validate";
import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../assets/utility/StateProvider";

function useAddCostForm() {
  const [{ user, contractors }, dispatch] = useStateValue();
  const { loading, errorFirestore, getData, addDocument, findDocumentByField } =
    useFirestore("invoices");

  const [number, setNumber] = useState("");
  const [contractor, setContractor] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [nip, setNip] = useState("");
  const [test, setTest] = useState("");
  const [isViewTips, setIsViewTips] = useState(false);

  useEffect(() => {
    getHints();
  }, [user, dispatch]);

  const getHints = async () => {
    if (user) {
      await getData("contractors", "SET_CONTRACTORS");
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const msg = validate(number, contractor, date, amount, test);
    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    const data = {
      number,
      contractor,
      date,
      amount: parseFloat(amount, 10),
      nip,
    };
    await addDocument(data, "costs");
    dispatch({ type: "ALERT_SUCCESS", item: "Koszt został dodany poprawnie" });
    setNumber("");
    setContractor("");
    setDate("");
    setAmount("");
    setNip("");
  };

  const addContractor = async (e) => {
    e.preventDefault();
    const msg = validateContractor(contractor, nip, test);
    if (msg) {
      dispatch({ type: "ALERT__ERROR", item: msg });
      return;
    }
    const existingContractor = contractors.some(
      (item) => String(item.data.nip) === String(nip)
    );

    if (existingContractor) {
      dispatch({
        type: "ALERT__ERROR",
        item: `Kontrahent o tym NIPie ${nip} już istnieje`,
      });
      return;
    }
    const data = { contractor, nip };
    await addDocument(data, "contractors");
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Kontrahent został dodany poprawnie",
    });
  };

  return {
    number,
    contractor,
    date,
    amount,
    nip,
    test,
    isViewTips,
    loading,
    errorFirestore,
    contractors,
    setNumber,
    setContractor,
    setDate,
    setAmount,
    setNip,
    setTest,
    setIsViewTips,
    handleClick,
    addContractor,
    getHints,
  };
}

export default useAddCostForm;
