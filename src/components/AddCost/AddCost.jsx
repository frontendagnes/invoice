import { useRef } from "react";
import "./AddCost.css";
import { useClickAway } from "react-use";
import useAddCostForm from "./useAddCostForm.jsx";

//mui
import { TextField } from "@mui/material";

//components
import AntySpam from "../AntySpam/AntySpam";
import NumericField from "../NumberComponents/NumericField/NumericField.jsx";
import CostHints from "../CostHints/CostHints.jsx";
import FormButton from "../Form/FormButton/FormButton.jsx";
import AddContractor from "./AddContractor.jsx";
import ValidationError from "../ValidationError/ValidationError.jsx";

function AddCost() {
  const {
    number,
    contractor,
    date,
    amount,
    nip,
    test,
    isViewTips,
    loading,
    errorFirestore,
    contractors: costHints,
    setNumber,
    setContractor,
    setDate,
    setAmount,
    setNip,
    setTest,
    setIsViewTips,
    handleClick,
    addContractor,
    handleChangeTip,
    handleChangeInput,
  } = useAddCostForm();

  const closeRef = useRef(null);
  useClickAway(closeRef, () => {
    setIsViewTips(false);
  });

  return (
    <form className="addcost">
      <AntySpam test={test} setTest={setTest} />
      <ValidationError text={errorFirestore} />
      <h2>Dodaj Koszt</h2>
      <AddContractor addContractor={addContractor} loading={loading} />
      <div className="addcost__wrapper">
        <div className="addcost__item" ref={closeRef}>
          <TextField
            label="Kontrahent"
            value={contractor}
            onChange={handleChangeTip}
            fullWidth
            helperText="Podaj nazwę Kontahenta"
          />
          {isViewTips ? (
            <CostHints
              data={costHints}
              value={contractor}
              setNip={setNip}
              setIsViewTips={setIsViewTips}
              setValue={setContractor}
            />
          ) : null}
        </div>
        <div className="addcost__item">
          <NumericField
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
            label="NIP"
            value={nip}
            onChange={handleChangeInput(setNip)}
            helperText="Podaj numer NIP"
          />
        </div>
        <div className="addcost__item">
          <TextField
            label="Numer Faktury"
            value={number}
            onChange={handleChangeInput(setNumber)}
            fullWidth
            helperText="Podaj numer faktury"
          />
        </div>
        <div className="addcost__item">
          <TextField
            label="Data faktury"
            value={date}
            onChange={handleChangeInput(setDate)}
            type="date"
            fullWidth
            helperText="Podaj datę faktury"
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="addcost__item">
          <NumericField
            label="Kwota Faktury"
            value={amount}
            onChange={handleChangeInput(setAmount)}
            helperText="Podaj kwotę brutto faktury"
            numeric
          />
        </div>
      </div>
      <FormButton
        text={loading ? "Dodaje..." : "Dodaj Koszt"}
        onClick={handleClick}
        disabled={loading}
      />
    </form>
  );
}

export default AddCost;
