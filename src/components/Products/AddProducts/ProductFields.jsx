import { TextField } from "@mui/material";
import NumericField from "../../NumberComponents/NumericField/NumericField";
function ProductFields({ form, handleChange, errors }) {
  return (
    <>
      <div className="addProducts__inputs__row">
        <TextField
          label="Nazwa produktu"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          helperText={errors.name ? errors.name : " "}
          error={!!errors.name}
        />
      </div>
      <div className="addProducts__inputs__row">
        <NumericField
          label="Cena produktu"
          name="price"
          value={form.price}
          onChange={handleChange}
          fullWidth
          numeric
          helperText={errors.price ? errors.price : " "}
          error={!!errors.price}
        />
      </div>
      <div className="addProducts__inputs__row">
        <TextField
          type="number"
          label="Ilość"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          fullWidth
          helperText={errors.quantity ? errors.quantity : " "}
          error={!!errors.quantity}
        />
      </div>
      <div className="addProducts__inputs__row">
        <TextField
          label="Opis produktu"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          helperText={errors.description ? errors.description : " "}
          error={!!errors.description}
          multiline
          minRows={2}
          maxRows={Infinity}
        />
      </div>
    </>
  );
}

export default ProductFields;
