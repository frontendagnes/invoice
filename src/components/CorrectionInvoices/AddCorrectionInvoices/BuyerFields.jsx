import { TextField } from "@mui/material";
import NumericField from "../../NumberComponents/NumericField/NumericField";

function BuyerFields({ correctionForm, handleChange, errors }) {
  const errorForNip = errors?.nip || null;

  // field configuration for the buyer section
  const buyerFields = [
    {
      name: "name",
      label: "Nazwa kupującego",
      value: correctionForm.buyer.name,
      id: "buyer-name",
    },
    {
      name: "nip",
      label: "NIP",
      value: correctionForm.buyer.nip,
      id: "buyer-nip",
    },
    {
      name: "street",
      label: "Ulica",
      value: correctionForm.buyer.street,
      id: "buyer-street",
    },
    {
      name: "zipCode",
      label: "Kod pocztowy",
      value: correctionForm.buyer.zipCode,
      id: "buyer-zipCode",
    },
    {
      name: "town",
      label: "Miejscowość",
      value: correctionForm.buyer.town,
      id: "buyer-town",
    },
  ];
  return (
    <div className="addCorrectionInvoice__item ">
      {buyerFields.map((field) =>
        field.name === "nip" ? (
          <NumericField
            key={field.id}
            name={`buyer.${field.name}`}
            value={field.value}
            onChange={handleChange}
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            format="###-###-##-##"
            mask="_"
            placeholder="___-___-__-__"
            helperText={errorForNip || " "}
            error={Boolean(errorForNip)}
          />
        ) : (
          <TextField
            key={field.id}
            name={`buyer.${field.name}`}
            value={field.value}
            onChange={handleChange}
            id={field.id}
            label={field.label}
            variant="outlined"
            fullWidth
            helperText={errors[field.name] || " "}
            error={Boolean(errors[field.name])}
          />
        )
      )}
    </div>
  );
}

export default BuyerFields;
