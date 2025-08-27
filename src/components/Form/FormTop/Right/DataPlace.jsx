import { TextField } from "@mui/material";

function DataPlace({ date, dispatch, place, setPlace, errors, setErrors}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_DATE", date: value });
    // Na bieżąco usuwaj błędy danego pola umieścić w onChange
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="formtop__input">
      <div>
        <TextField
          label="Data wystawienia faktury"
          type="date"
          value={date}
          onChange={handleChange}
          helperText={errors.date}
          error={!!errors.date}
          fullWidth
        />
      </div>
      <div>
        <TextField
          label="Miejsce wystawienia"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          title="Wprowadzona wartość zostanie zapamiętana na tym komputerze!"
          helperText={errors.place}
          error={!!errors.place}
          fullWidth
        />
      </div>
    </div>
  );
}

export default DataPlace;
