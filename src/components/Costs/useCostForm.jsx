import { useEffect, useState } from "react";
import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../state/StateProvider";
import { validate, validateContractor } from "./AddCost/validate";
import { checkNipDuplicate } from "../../utility/functions";
const initialFormState = {
  number: "",
  contractor: "",
  date: "",
  amount: 0,
  nip: "",
};
function useCostForm(setIsViewAddCost) {
  const [{ user, contractors }, dispatch] = useStateValue();
  const { loading, errorFirestore, getData, addDocument } =
    useFirestore("invoices");

  const [test, setTest] = useState("");
  const [isViewTips, setIsViewTips] = useState(false);
  const [errors, setErrors] = useState({});
  const [formState, setFormState] = useState(initialFormState);

  useEffect(() => {
    if (user) {
      getData("contractors", "SET_CONTRACTORS");
    }
  }, [user]);

  const handleClick = async (e) => {
    e.preventDefault();
    setErrors({});
    const msg = validate(
      formState.number,
      formState.contractor,
      formState.date,
      formState.amount,
      formState.nip,
      test
    );
    if (msg) {
      setErrors(msg);
      return;
    }

    await addDocument(formState, "costs");
    setIsViewAddCost(false);
    dispatch({ type: "ALERT_SUCCESS", item: "Koszt został dodany poprawnie" });
    setFormState(initialFormState);
  };

  const addContractor = async (e) => {
    e.preventDefault();
    setErrors({});
    setTest("");
    const msg = validateContractor(formState.contractor, formState.nip, test);
    if (msg) {
      setErrors(msg);
      return;
    }
    if (checkNipDuplicate(formState.nip, contractors)) {
      setErrors((prev) => ({
        ...prev,
        nip: "Kontrahent o tym NIP-ie już istnieje.",
      }));
      return;
    }
    const data = { contractor: formState.contractor, nip: formState.nip };
    await addDocument(data, "contractors");
    dispatch({
      type: "ALERT_SUCCESS",
      item: "Kontrahent został dodany poprawnie",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    // Logika usuwania błędów
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleChangeTip = (e) => {
    const { name } = e.target;
    const newValue = e.target.value;
    setFormState((prev) => ({ ...prev, contractor: newValue }));
    if (newValue.trim() !== "") {
      setIsViewTips(true);
    } else {
      setIsViewTips(false);
    }
    // Na bieżąco usuwaj błędy danego pola
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleSelectContractor = (selectedContractor) => {
    setFormState((prev) => ({
      ...prev,
      contractor: selectedContractor.data.contractor,
      nip: selectedContractor.data.nip,
    }));
  };

  return {
    errors,
    handleSelectContractor,
    handleChange,
    formState,
    test,
    isViewTips,
    loading,
    errorFirestore,
    contractors,
    setFormState,
    setTest,
    setIsViewTips,
    handleClick,
    addContractor,
    handleChangeTip,
  };
}

export default useCostForm;
