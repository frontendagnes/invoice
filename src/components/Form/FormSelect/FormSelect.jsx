import { useState } from "react";
import "./FormSelect.css";
//mui
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../assets/utility/StateProvider";
// components
import Tooltip from "../../Tooltip/Tooltip";
import FormButton from "../FormButton/FormButton";

function FormSelect({ seller }) {
  const { loading, updateSellerAll, updateSellerField } =
    useFirestore("invoices");
  const [{ user }, dispatch] = useStateValue();
  const [selectName, setSelectName] = useState("");
  const [select, setSelect] = useState("");

  const selectChange = (e) => {
    const fildesName = {
      name: "NAZWĘ",
      street: "ULICĘ",
      zipcode: "KOD POCZTOWY",
      town: "MIEJSCOWOŚĆ",
      nip: "NIP",
      all: "all",
      "": "",
    };
    const newValue = e.target.value;
    setSelect(newValue);
    setSelectName(fildesName[newValue] || "");
  };
  const updateSeller = async () => {
    if (!select) {
      dispatch({
        type: "ALERT__ERROR",
        item: "Nie wybrałeś/aś co chcesz aktualizować",
      });
    }

    const fieldsToUpdate = {
      name: seller.name,
      street: seller.street,
      zipcode: seller.zipcode,
      town: seller.town,
      nip: seller.nip,
    };

    if (select === "all") {
      await updateSellerAll(seller, user, "seller");
    } else if (fieldsToUpdate[select]) {
      await updateSellerField(select, fieldsToUpdate[select], user, "seller");
    }
    setSelect("");
  };
  return (
    <div className="formSelect">
      <FormControl fullWidth>
        <InputLabel>Wybierz co chcesz aktualizować</InputLabel>
        <Select
          name="seller-option"
          value={select}
          onChange={selectChange}
          label="Wybierz co chcesz aktualizować"
        >
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="name">Aktualizacja Nazwy</MenuItem>
          <MenuItem value="street">Aktualizacja Ulicy</MenuItem>
          <MenuItem value="zipcode">Aktualizacja Kodu</MenuItem>
          <MenuItem value="town">Aktualizacja Miejscowości</MenuItem>
          <MenuItem value="nip">Aktualizacja Nip-u</MenuItem>
          <MenuItem value="all">Aktualizuj Wszytkie Pola</MenuItem>
        </Select>
      </FormControl>
      <Tooltip text="UWAGA! Zmiany wprowadzone zostaną w dokumentach wystawionych od daty jej wporwadzenia, pozostałe dokumenty pozostaną bez zmian.">
        <FormButton
          text={
            loading ? `Aktualizuje ${selectName}` : `Aktualizuj ${selectName}`
          }
          styles={{
            marginTop: "20px",
          }}
          disabled={loading || selectName === ""}
          onClick={updateSeller}
        />
      </Tooltip>
    </div>
  );
}

export default FormSelect;
