import { TableRow, TableCell } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

function RowsPerPageNote({colSpan}) {
  return (
    <TableRow>
      <TableCell
        className="no-print"
        colSpan={colSpan + 1}
        sx={{
          fontSize: "0.75rem",
          color: "text.secondary",
          textAlign: "center",
        }}
      >
        <div className="records__note">
          <div>
            Uwaga: aby wydrukować wszystkie dane, wybierz „Wszystkie” w opcjach
            wyboru elementów na stronie "Rows per page".
          </div>
          <KeyboardDoubleArrowUpIcon
            color="error"
            aria-label="strzałka w górę"
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default RowsPerPageNote