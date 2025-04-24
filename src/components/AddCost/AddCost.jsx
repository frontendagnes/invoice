import React from "react";
import "./AddCost.css";

import useAddCostForm from "./useAddCostForm.jsx";
import useDebouncedEffect from "../../hooks/useDebouncedEffect.jsx"

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
      costHints,
      setNumber,
      setContractor,
      setDate,
      setAmount,
      setNip,
      setTest,
      setIsViewTips,
      handleClick,
      addContractor,
      getHints: fetchHints,
    } = useAddCostForm();

    useDebouncedEffect(
      () => {
        if (contractor && contractor.length >= 2) {
          fetchHints();
        }
      },
      [contractor],
      400
    );

  const handleChangeTip = (e) => {
    setContractor(e.target.value);
    setIsViewTips(true);
  };
  return (
    <form className="addcost" onClick={() => setIsViewTips(false)}>
      <AntySpam test={test} setTest={setTest} />
      <ValidationError text={errorFirestore} />
      <h2>Dodaj Koszt</h2>
      <AddContractor addContractor={addContractor} loading={loading} />
      <div className="addcost__wrapper">
        <div className="addcost__item">
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
              setContractor={setContractor}
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
            onChange={(e) => setNip(e.target.value)}
            helperText="Podaj numer NIP"
          />
        </div>
        <div className="addcost__item">
          <TextField
            label="Numer Faktury"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            fullWidth
            helperText="Podaj numer faktury"
          />
        </div>
        <div className="addcost__item">
          <TextField
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            fullWidth
            helperText="Podaj datę faktury"
          />
        </div>
        <div className="addcost__item">
          <NumericField
            label="Kwota Faktury"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            helperText="Podaj kwotę brutto faktury"
            numeric
          />
        </div>
      </div>
      <FormButton
        text={loading ? "Dodaje" : "Dodaj Koszt"}
        onClick={handleClick}
        disabled={loading}
      />
    </form>
  );
}

 export default AddCost
