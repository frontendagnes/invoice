import { TextField } from "@mui/material";
import NumericField from "../../NumberComponents/NumericField/NumericField.jsx";

function ContractorFields({ form, errors, handleChange }) {
  return (
    <>
      <div className="editContractor__item">
        <TextField
          label="Popraw nazwę kontrahenta"
          name="contractor"
          value={form.contractor}
          onChange={handleChange}
          fullWidth
          helperText={errors.contractor}
          error={!!errors.contractor}
        />
      </div>
      <div className="editContractor__item">
        <NumericField
          label="Popraw NIP"
          name="nip"
          value={form.nip}
          onChange={handleChange}
          fullWidth
          format="###-###-##-##"
          mask="_"
          placeholder="___-___-__-__"
          helperText={errors.nip}
          error={!!errors.nip}
        />
      </div>
      <div className="editContractor__item">
        <TextField
          label="Popraw nazwę ulicy"
          name="street"
          value={form.street}
          onChange={handleChange}
          fullWidth
          helperText={errors.street}
          error={!!errors.street}
        />
      </div>
      <div className="editContractor__item">
        <NumericField
          label="Popraw kod pocztowy"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          fullWidth
          format="##-###"
          mask="_"
          placeholder="__-___"
          helperText={errors.zipCode}
          error={!!errors.zipCode}
        />
      </div>
      <div className="editContractor__item">
        <TextField
          label="Popraw nazwę miejscowości"
          name="town"
          value={form.town}
          onChange={handleChange}
          fullWidth
          helperText={errors.town}
          error={!!errors.town}
        />
      </div>
    </>
  );
}

export default ContractorFields;
