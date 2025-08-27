import { TextField } from "@mui/material";

function Number({ count, dispatch, year, order, number, errors, setErrors }) {
  const handleChange = (type) => (e) => {
    const { name, value } = e.target;
    dispatch({
      type: type,
      payload: { [name]: value },
    });
    // Na bieżąco usuwaj błędy danego pola umieścić w onChange
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  return (
    <div className="formtop__input">
      <div className="formtop__wrapper">
        <div className="formtop__input_row">
          <TextField
            value={count}
            name="count"
            onChange={handleChange("SET_COUNT")}
            // onChange={(e) =>
            //   dispatch({ type: "SET_COUNT", count: e.target.value })
            // }
            id="outlined-basic"
            label="Lp."
            variant="outlined"
            helperText={errors.count}
            error={!!errors.count}
            fullWidth
          />
        </div>
        <div className="formtop__input_row">
          <TextField
            value={year}
            name="year"
            id="outlined-basic"
            label="Rok"
            variant="outlined"
            helperText={errors.year}
            error={!!errors.year}
            fullWidth
          />
        </div>
        <div className="formtop__input_row">
          <TextField
            value={order}
            name="oreder"
            onChange={handleChange("SET_ORDER")}
            // onChange={(e) =>
            //   dispatch({ type: "SET_ORDER", order: e.target.value })
            // }
            id="outlined-basic"
            label="Numer"
            variant="outlined"
            fullWidth
          />
        </div>
      </div>
      <div>
        <TextField
          value={number}
          name="number"
          id="outlined-basic"
          label="Numer Faktury"
          variant="outlined"
          helperText={errors.number}
          error={!!errors.number}
          fullWidth
        />
      </div>
    </div>
  );
}

export default Number;
