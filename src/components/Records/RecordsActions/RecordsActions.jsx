import Button from "@mui/material/Button";
import Print from "../../Print";

function RecordsActions({ onPrint, onYearSummary }) {
  return (
    <div className="records__actions">
      <Print onClick={onPrint} />
      <Button onClick={onYearSummary}>Podsumowanie roku</Button>
    </div>
  );
}

export default RecordsActions;
