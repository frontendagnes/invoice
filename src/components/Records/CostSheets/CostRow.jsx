import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
import { TableRow, TableCell } from "@mui/material";
function CostRow({ item, index }) {

  return (
    <TableRow>
      <TableCell  className="table__singular">{index + 1}</TableCell>
      <TableCell >{item.data.number}</TableCell>
      <TableCell >{item.data.contractor}</TableCell>
      <TableCell  className="records__date">{item.data.date}</TableCell>
      <TableCell  className="records__amount">
        <DisplayingNumber
          value={item.data.amount}
          renderText={(value) => <b>{value} zł</b>}
        />
      </TableCell>
    </TableRow>
  );
}

export default CostRow;
