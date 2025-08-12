import { TextField } from "@mui/material";
function BuyerFields({ correctionForm, handleChange }) {
  // field configuration for the buyer section
  const buyerFields = [
    {
      name: "buyer.name",
      label: "Nazwa kupującego",
      value: correctionForm.buyer.name,
      id: "buyer-name",
    },
    {
      name: "buyer.nip",
      label: "NIP",
      value: correctionForm.buyer.nip,
      id: "buyer-nip",
    },
    {
      name: "buyer.street",
      label: "Ulica",
      value: correctionForm.buyer.street,
      id: "buyer-street",
    },
    {
      name: "buyer.zipCode",
      label: "Kod pocztowy",
      value: correctionForm.buyer.zipCode,
      id: "buyer-zipCode",
    },
    {
      name: "buyer.town",
      label: "Miejscowość",
      value: correctionForm.buyer.town,
      id: "buyer-town",
    },
  ];
  return (
    <div className="addCorrectionInvoice__item ">
      {buyerFields.map((field) => (
        <TextField
          key={field.id}
          name={field.name}
          value={field.value}
          onChange={handleChange}
          id={field.id}
          label={field.label}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      ))}
    </div>
  );
}

export default BuyerFields;
