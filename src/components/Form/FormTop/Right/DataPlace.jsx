import { TextField } from "@mui/material";

function DataPlace({ date, dispatch, place, setPlace, errors}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: "SET_DATE", date: value });

    if (errors.date) {
      dispatch({ type: "CLEAR_ERROR", fieldName: "date" });
    }
  };

  const handlePlaceChange = (e) => {
    const { name, value } = e.target;
    setPlace(value);

    if (errors.place) {
      dispatch({ type: "CLEAR_ERROR", fieldName: "place" });
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
          onChange={handlePlaceChange}
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
