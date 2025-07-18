import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";

function YearSheetsRow({
  index,
  month,
  monthlyIncomeTotals,
  monthlyCostTotals,
}) {
  const income = monthlyIncomeTotals[index] ?? 0;
  const cost = monthlyCostTotals[index] ?? 0;
  const profit = income - cost;

  return (
    <tr>
      <td className="table__singular">{index + 1}</td>
      <td
        className={`records__monthTd ${
          income < 0 || profit < 0 ? "negative-row" : ""
        }`}
      >
        {month}
      </td>
      <td className={`records__amount ${income < 0 ? "negative-row" : ""}`}>
        <DisplayingNumber
          value={income}
          renderText={(value) => <span>{value} zł</span>}
        />
      </td>
      <td className={`records__amount ${cost < 0 ? "negative-row" : ""}`}>
        <DisplayingNumber
          value={cost}
          renderText={(value) => <span>{value} zł</span>}
        />
      </td>
      <td
        className={`records__amount records__profit ${
          profit < 0 ? "negative-row" : ""
        }`}
      >
        <DisplayingNumber
          value={profit}
          renderText={(value) => <b>{value} zł</b>}
        />
      </td>
    </tr>
  );
}

export default YearSheetsRow;
