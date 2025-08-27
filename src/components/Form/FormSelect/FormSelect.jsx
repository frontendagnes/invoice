import { useMemo, useState } from "react";
import "./FormSelect.css";

import useFirestore from "../../../api/useFirestore/useFirestore";
import { useStateValue } from "../../../state/StateProvider";
import useFieldValidation from "./useFieldValidation";
import { FIELD_CONFIG } from "./variables";
//mui
import { FormControl } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

// components
import Tooltip from "../../Tooltip/Tooltip";
import FormButton from "../FormButton/FormButton";

function FormSelect({ seller, originalSeller }) {
  const { loading, updateSellerAll, updateSellerField } =
    useFirestore("invoices");
  const [{ user }, dispatch] = useStateValue();
  const [selectName, setSelectName] = useState("");
  const [select, setSelect] = useState("");

  // Use custom hook for validation
  const { areAllFieldsChanged, isSelectedFieldChanged } = useFieldValidation(
    seller,
    originalSeller,
    select
  );

  // Memoized menu items
  const menuItems = useMemo(
    () => [
      { value: "None", label: "Nie wybieraj" },
      ...Object.entries(FIELD_CONFIG).map(([key, config]) => ({
        value: key,
        label: config.displayName,
      })),
    ],
    []
  );

  const selectChange = (e) => {
    const newValue = e.target.value;
    setSelect(newValue);
    setSelectName(FIELD_CONFIG[newValue]?.label || "");
  };

  const updateSeller = async () => {
    try {
      // Validation logic
      if (!select || select === "None") {
        dispatch({
          type: "ALERT__ERROR",
          item: "Nie wybrałeś co chcesz aktualizować.",
        });
        return;
      }

      if (select === "all" && !areAllFieldsChanged) {
        dispatch({
          type: "ALERT__ERROR",
          item: "Brak zmian we wszystkich polach.",
        });
        setSelect("");
        setSelectName("");
        return;
      }

      if (select !== "all" && !isSelectedFieldChanged) {
        dispatch({
          type: "ALERT__ERROR",
          item: `Brak zmian w polu "${selectName}".`,
        });
        setSelect("");
        setSelectName("");
        return;
      }

      // Perform update
      if (select === "all") {
        await updateSellerAll(seller, user, "seller");
      } else {
        await updateSellerField(select, seller[select], user, "seller");
      }

      dispatch({
        type: "ALERT_SUCCESS",
        item: `Pomyślnie zaktualizowano ${selectName}.`,
      });
    } catch (error) {
      dispatch({
        type: "ALERT__ERROR",
        item: `Błąd podczas aktualizacji: ${error.message}`,
      });
    } finally {
      // Cleanup state
      setSelect("");
      setSelectName("");
    }
  };

  // Memoized tooltip text
  const tooltipText = useMemo(() => {
    // 1. Default state (before selecting option)
    if (!select || select === "None") {
      return "UWAGA! Zmiany wprowadzone zostaną w dokumentach wystawionych od daty jej wprowadzenia, pozostałe dokumenty pozostaną bez zmian.";
    }
    // 2. Loading state
    if (loading) {
      return "Aktualizuję dane...";
    }
    // 3. Edit state (option selected, but no changes)
    if (select === "all" && !areAllFieldsChanged) {
      return "Brak zmian w żadnym z pól. Zaktualizuj dane, aby móc je zapisać.";
    }
    if (select !== "all" && !isSelectedFieldChanged) {
      return `Brak zmian w polu "${selectName}". Zaktualizuj to pole, aby móc je zapisać.`;
    }
    // 4. State after changes (changes made, button is active)
    return "UWAGA! Zmiany wprowadzone zostaną w dokumentach wystawionych od daty jej wprowadzenia, pozostałe dokumenty pozostaną bez zmian.";
  }, [
    select,
    loading,
    areAllFieldsChanged,
    isSelectedFieldChanged,
    selectName,
  ]);

  // Memoized button disabled state
  const isButtonDisabled = useMemo(() => {
    if (loading) return true;
    if (select === "None" || select === "") return true;
    if (select === "all" && !areAllFieldsChanged) return true;
    if (select !== "all" && !isSelectedFieldChanged) return true;
    return false;
  }, [loading, select, areAllFieldsChanged, isSelectedFieldChanged]);

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
          {menuItems.map(({ value, label }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tooltip text={tooltipText}>
        <FormButton
          text={
            loading ? `Aktualizuje ${selectName}` : `Aktualizuj ${selectName}`
          }
          styles={{
            marginTop: "20px",
          }}
          disabled={isButtonDisabled}
          onClick={updateSeller}
        />
      </Tooltip>
    </div>
  );
}

export default FormSelect;

// import { useState } from "react";
// import "./FormSelect.css";

// import useFirestore from "../../../api/useFirestore/useFirestore";
// import { useStateValue } from "../../../state/StateProvider";
// //mui
// import { FormControl } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";

// // components
// import Tooltip from "../../Tooltip/Tooltip";
// import FormButton from "../FormButton/FormButton";

// function FormSelect({ seller, originalSeller }) {
//   const { loading, updateSellerAll, updateSellerField } =
//     useFirestore("invoices");
//   const [{ user }, dispatch] = useStateValue();
//   const [selectName, setSelectName] = useState("");
//   const [select, setSelect] = useState("");

//   // Zmienna oblicza, czy zaszły jakiekolwiek zmiany we wszystkich polach
//   const areAllFieldsChanged =
//     seller.name !== originalSeller.name ||
//     seller.street !== originalSeller.street ||
//     seller.zipcode !== originalSeller.zipcode ||
//     seller.town !== originalSeller.town ||
//     seller.nip !== originalSeller.nip;

//   // Funkcja pomocnicza do sprawdzenia, czy wybrane pole zostało zmienione
//   const isSelectedFieldChanged = () => {
//     // Sprawdza, czy select jest poprawnym kluczem, a nie "None" lub "all"
//     if (select && select !== "all" && seller[select] !== undefined) {
//       return seller[select] !== originalSeller[select];
//     }
//     return false;
//   };

//   const selectChange = (e) => {
//     const fieldsName = {
//       name: "NAZWĘ",
//       street: "ULICĘ",
//       zipcode: "KOD POCZTOWY",
//       town: "MIEJSCOWOŚĆ",
//       nip: "NIP",
//       all: "wszystkie pola",
//       "": "",
//     };

//     const newValue = e.target.value;
//     setSelect(newValue);
//     setSelectName(fieldsName[newValue] || "");
//   };

//   const updateSeller = async () => {
//     if (!select || select === "None") {
//       dispatch({
//         type: "ALERT__ERROR",
//         item: "Nie wybrałeś co chcesz aktualizować.",
//       });
//       return;
//     }

//     if (select === "all" && !areAllFieldsChanged) {
//       dispatch({
//         type: "ALERT_INFO",
//         item: "Brak zmian we wszystkich polach.",
//       });
//       setSelect("");
//       setSelectName("");
//       return;
//     }

//     if (select !== "all" && !isSelectedFieldChanged()) {
//       dispatch({
//         type: "ALERT_INFO",
//         item: `Brak zmian w polu "${selectName}".`,
//       });
//       setSelect("");
//       setSelectName("");
//       return;
//     }

//     // Wywołanie aktualizacji tylko jeśli zaszły zmiany
//     if (select === "all") {
//       await updateSellerAll(seller, user, "seller");
//     } else {
//       await updateSellerField(select, seller[select], user, "seller");
//     }

//     dispatch({
//       type: "ALERT_SUCCESS",
//       item: `Pomyślnie zaktualizowano ${selectName}.`,
//     });

//     setSelect("");
//     setSelectName("");
//   };
//   const getTooltipText = () => {
//     // 1. Stan domyślny (przed wyborem opcji)
//     if (!select || select === "None") {
//       return "UWAGA! Zmiany wprowadzone zostaną w dokumentach wystawionych od daty jej wprowadzenia, pozostałe dokumenty pozostaną bez zmian.";
//     }
//     // 2. Stan ładowania
//     if (loading) {
//       return "Aktualizuję dane...";
//     }
//     // 3. Stan edycji (wybrano opcję, ale bez zmian)
//     if (select === "all" && !areAllFieldsChanged) {
//       return "Brak zmian w żadnym z pól. Zaktualizuj dane, aby móc je zapisać.";
//     }
//     if (select !== "all" && !isSelectedFieldChanged()) {
//       return `Brak zmian w polu "${selectName}". Zaktualizuj to pole, aby móc je zapisać.`;
//     }
//     // 4. Stan po zmianie (wprowadzono zmiany, przycisk jest aktywny)
//     return "Kliknij, aby zapisać zmiany w bazie danych. UWAGA! Zmiany wprowadzone zostaną w dokumentach wystawionych od daty jej wprowadzenia, pozostałe dokumenty pozostaną bez zmian.";
//   };

//   const isButtonDisabled = () => {
//     if (loading) return true;
//     if (select === "None" || select === "") return true;
//     if (select === "all" && !areAllFieldsChanged) return true;
//     if (select !== "all" && !isSelectedFieldChanged()) return true;
//     return false;
//   };

//   return (
//     <div className="formSelect">
//       <FormControl fullWidth>
//         <InputLabel>Wybierz co chcesz aktualizować</InputLabel>
//         <Select
//           name="seller-option"
//           value={select}
//           onChange={selectChange}
//           label="Wybierz co chcesz aktualizować"
//         >
//           <MenuItem value="None">Nie wybieraj</MenuItem>
//           <MenuItem value="name">Aktualizacja Nazwy</MenuItem>
//           <MenuItem value="street">Aktualizacja Ulicy</MenuItem>
//           <MenuItem value="zipcode">Aktualizacja Kodu</MenuItem>
//           <MenuItem value="town">Aktualizacja Miejscowości</MenuItem>
//           <MenuItem value="nip">Aktualizacja Nip-u</MenuItem>
//           <MenuItem value="all">Aktualizuj Wszystkie Pola</MenuItem>
//         </Select>
//       </FormControl>
//       <Tooltip text={getTooltipText()}>
//         <FormButton
//           text={
//             loading ? `Aktualizuje ${selectName}` : `Aktualizuj ${selectName}`
//           }
//           styles={{
//             marginTop: "20px",
//           }}
//           disabled={isButtonDisabled()}
//           onClick={updateSeller}
//         />
//       </Tooltip>
//     </div>
//   );
// }

// export default FormSelect;
