import { useMemo } from "react";
import { getDisplayDataForTable } from "../../../utility/documentFiltres";
import { getTotal } from "../../../utility/functions";
//mui
import { TableRow, TableCell } from "@mui/material";
//components
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";

const DocumentNumberDisplay = ({ displayData }) => {
  return (
    <>
      {displayData.correctionNumber}
      <span className="correction-details">
        korekta do faktury nr {displayData.number}
      </span>
    </>
  );
};

function IncomeRow({ item, index, cumulativeIncome }) {
  const displayData = useMemo(
    () => getDisplayDataForTable(item, getTotal),
    [item]
  );

  const cumulativeIncomeValue = cumulativeIncome[index] || 0;
  return (
    <TableRow key={item.id || index}>
      <TableCell>{index + 1}</TableCell>
      <TableCell>
        {displayData.isCorrection ? (
          <DocumentNumberDisplay displayData={displayData} />
        ) : (
          displayData.number
        )}
      </TableCell>
      <TableCell>{displayData.contractor}</TableCell>
      <TableCell className="records__date">{displayData.date}</TableCell>
      <TableCell
        sx={{ textAlign: "right" }}
        className={`records__amount ${
          displayData.worth < 0 ? "negative-row" : ""
        }`}
      >
        <DisplayingNumber
          value={displayData.worth}
          renderText={(value) => <b>{value} zł</b>}
        />
      </TableCell>
      <TableCell
        sx={{ textAlign: "right" }}
        className={`records__amount ${
          cumulativeIncomeValue < 0 ? "negative-row" : ""
        }`}
      >
        <DisplayingNumber
          value={cumulativeIncomeValue}
          renderText={(value) => <b>{value} zł</b>}
        />
      </TableCell>
    </TableRow>
  );
}

export default IncomeRow;
