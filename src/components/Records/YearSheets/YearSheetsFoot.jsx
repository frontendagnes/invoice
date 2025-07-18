// MUI
import { TableRow, TableCell, TableFooter } from "@mui/material";
//component
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
function YearSheetsFoot({
  getYearEndBalance,
  getYearlyIncomeTotal,
  getYearlyCostTotal,
}) {
  const yearEndBalance = getYearEndBalance() ?? 0;
  const yearlyIncomeTotal = getYearlyIncomeTotal() ?? 0;
  const yearlyCostTotal = getYearlyCostTotal() ?? 0;

  const cellStyle = {
    fontSize: { xs: "1.1rem", md: "1.3rem" },
  };

  return (
    <TableFooter>
      <TableRow>
        <TableCell className="records__summary" colSpan={2} sx={cellStyle}>
          Razem:
        </TableCell>
        <TableCell
          sx={cellStyle}
          className={`records__summary ${
            yearlyIncomeTotal < 0 ? "negative-row" : ""
          }`}
        >
          <DisplayingNumber
            value={yearlyIncomeTotal}
            renderText={(value) => <b>{value} zł</b>}
          />
        </TableCell>
        <TableCell
          sx={cellStyle}
          className={`records__summary ${
            yearlyCostTotal < 0 ? "negative-row" : ""
          }`}
        >
          <DisplayingNumber
            value={yearlyCostTotal}
            renderText={(value) => <b>{value} zł</b>}
          />
        </TableCell>
        <TableCell
          sx={cellStyle}
          className={`records__summary ${
            yearEndBalance < 0 ? "negative-row" : "positive-row"
          }`}
        >
          <DisplayingNumber
            value={yearEndBalance}
            renderText={(value) => <b>{value} zł</b>}
          />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

export default YearSheetsFoot;
