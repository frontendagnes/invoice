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

function AddCost({ setIsViewAddCost }) {
  const {
    errors,
    handleSelectContractor,
    formState,
    handleChange,
    test,
    isViewTips,
    loading,
    errorFirestore,
    contractors: costHints,
    setTest,
    setIsViewTips,
    handleClick,
    addContractor,
    handleChangeTip,
  } = useCostForm(setIsViewAddCost);

  const closeRef = useRef(null);
  useClickAway(closeRef, () => {
    setIsViewTips(false);
  });

  const getFieldProps = (name) => ({
    name,
    value: formState[name],
    onChange: handleChange,
    fullWidth: true,
    error: Boolean(errors[name]),
    helperText: errors[name] || " ",
  });

  return (
    <form className="addcost" onSubmit={handleClick}>
      <AntySpam test={test} setTest={setTest} />
      <ValidationError text={errorFirestore} />
      {errors.test && <ValidationError text={errors.test} />}

      <h2>Dodaj Koszt</h2>
      <AddContractor addContractor={addContractor} loading={loading} />
      <div className="addcost__wrapper">
        <div className="addcost__item" ref={closeRef}>
          <TextField
            {...getFieldProps("contractor")}
            label="Podaj nazwę kontrahenta"
            onChange={handleChangeTip}
            inputProps={{ autoComplete: "off" }}
          />
          {isViewTips && (
            <HintsList
              items={costHints}
              value={formState.contractor}
              setIsViewTips={setIsViewTips}
              onSelect={handleSelectContractor}
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
            {...getFieldProps("nip")}
            label="Podaj NIP kontrahenta"
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
          />
        </div>
        <div className="addcost__item">
          <TextField {...getFieldProps("number")} label="Podaj numer faktury" />
        </div>
        <div className="addcost__item">
          <TextField
            {...getFieldProps("date")}
            label="Podaj datę faktury"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="addcost__item">
          <NumericField
            {...getFieldProps("amount")}
            label="Podaj kwotę brutto faktury"
            numeric
          />
        </div>
      </div>
      <div className="addcost__actions">
        <FormButton
          text={loading ? "Dodaje..." : "Dodaj Koszt"}
          type="submit"
          disabled={loading}
          styles={{ width: "100%", height: "56px" }}
        />
      </div>
    </form>
  );
}

export default AddCost;
