// MUI
import {
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from "@mui/material";
// Component
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
import RowsPerPageNote from "./RowsPerPageNote";

function TableFoot({
  calculateFunction,
  selectedMonthNumber,
  colSpan,
  totalCount,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}) {
  const total = calculateFunction(selectedMonthNumber);

  return (
    <TableFooter>
      <TableRow>
        <TableCell
          className="records__summary"
          colSpan={colSpan}
          sx={{
            textAlign: "right",
            fontSize: "1.3rem",
          }}
        >
          Podsumowanie:
        </TableCell>
        <TableCell
          className={`records__summary ${
            total < 0 ? "negative-row" : "positive-row"
          }`}
          sx={{ textAlign: "right", fontSize: "1.3rem" }}
        >
          <DisplayingNumber
            value={total}
            renderText={(value) => <b>{value} zł</b>}
          />
        </TableCell>
      </TableRow>

      {totalCount > 5 && (
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "Wszystkie", value: -1 }]}
            colSpan={colSpan + 1}
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            className="no-print"
          />
        </TableRow>
      )}
      {rowsPerPage !== -1 && totalCount > 5 && (
        <RowsPerPageNote colSpan={colSpan} />
      )}
    </TableFooter>
  );
}

export default TableFoot;
