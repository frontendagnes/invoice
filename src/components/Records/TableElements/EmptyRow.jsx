import { TableRow, TableCell } from "@mui/material";

function EmptyRow({ colSpan }) {
  return (
    <TableRow sx={{padding: "10px 0"}}>
      <TableCell sx={{ textAlign: "center", fontSize: "1.3rem", letterSpacing: "3px" }} colSpan={colSpan}>
        Brak dokumentów dla wybranego miesiąca i roku.
      </TableCell>
    </TableRow>
  );
}

export default EmptyRow;
