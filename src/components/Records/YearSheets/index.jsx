import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { months } from "../months";

// components
import YearSheetsCaption from "./YearSheetsCaption";
import YearSheetsFoot from "./YearSheetsFoot";
import YearSheetsRow from "./YearSheetsRow";

function YearSheets({
  getYearlyIncomeTotal,
  getYearlyCostTotal,
  getYearEndBalance,
  monthlyIncomeTotals,
  monthlyCostTotals,
}) {
  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} className="table__wrapper">
        <Table className="table__responsive" id="records__tableSummary">
          <YearSheetsCaption
            getYearlyIncomeTotal={getYearlyIncomeTotal}
            getYearlyCostTotal={getYearlyCostTotal}
            getYearEndBalance={getYearEndBalance}
          />
          <TableHead>
            <TableRow>
              <TableCell className="table__singular">Lp.</TableCell>
              <TableCell>Miesiąc</TableCell>
              <TableCell>Przychody</TableCell>
              <TableCell>Koszty</TableCell>
              <TableCell>Dochód</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {months.map((month, index) => (
              <YearSheetsRow
                key={index}
                index={index}
                month={month}
                monthlyIncomeTotals={monthlyIncomeTotals}
                monthlyCostTotals={monthlyCostTotals}
              />
            ))}
          </TableBody>
          <YearSheetsFoot
            getYearEndBalance={getYearEndBalance}
            getYearlyIncomeTotal={getYearlyIncomeTotal}
            getYearlyCostTotal={getYearlyCostTotal}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}

export default YearSheets;