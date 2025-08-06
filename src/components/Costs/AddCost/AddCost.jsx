import { useRef } from "react";
import { useClickAway } from "react-use";
import "./AddCost.css";
import useCostForm from "../useCostForm.jsx";

//mui
import { TextField } from "@mui/material";

//components
import AntySpam from "../../AntySpam/AntySpam.jsx";
import FormButton from "../../Form/FormButton/FormButton.jsx";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";
import ValidationError from "../../ValidationError/ValidationError.jsx";
import AddContractor from "./AddContractor.jsx";
import HintsList from "../../HintsList/HintsList.jsx";
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
  } = useCostForm();

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
          {isViewTips && (
            <HintsList
              items={costHints}
              value={contractor}
              setIsViewTips={setIsViewTips}
              onSelect={(selectedContractor) => {
                setNip(selectedContractor.data.nip);
                setContractor(selectedContractor.data.contractor);
              }}
              filterCallback={(contractor, value) =>
                contractor.contractor
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                contractor.nip.toLowerCase().includes(value.toLowerCase())
              }
              renderItem={(contractor) => (
                <>
                  <div>{contractor.contractor}</div>
                  <div>{contractor.nip}</div>
                </>
              )}
            />
          )}
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
