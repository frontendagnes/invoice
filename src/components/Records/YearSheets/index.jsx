import React from "react";
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";

function YearSheets(props) {
  const {
    totalYear,
    totalCost,
    yearEnd,
    months,
    summaryYearId,
    totalMnoth,
    totalCosts,
  } = props;

  return (
    <table id="records__tableSummary">
      <caption>
        <div>
          Przychody:{" "}
          <DisplayingNumber
            value={totalYear()}
            renderText={(value) => <b>{value} zł</b>}
          />
        </div>
        <div>
          Koszty:{" "}
          <DisplayingNumber
            value={totalCost()}
            renderText={(value) => <b>{value} zł</b>}
          />
        </div>
        <div className="records__revenue" title="Przychód - Koszty">
          Dochód:{" "}
          <DisplayingNumber
            value={yearEnd()}
            renderText={(value) => <b>{value} zł</b>}
          />
        </div>
      </caption>
      <thead>
        <tr>
          <td className="table__singular">Lp.</td>
          <td>Miesiąc</td>
          <td>Przychody</td>
          <td>Koszty</td>
          <td>Dochód</td>
        </tr>
      </thead>
      <tbody>
        {months
          .filter((_, index) => index !== summaryYearId)
          .map((month, index) => (
            <tr key={index}>
              <td className="table__singular">{index + 1}</td>
              <td className="records__monthTd">{month}</td>
              <td className="records__amount">
                <DisplayingNumber
                  value={totalMnoth[index]}
                  renderText={(value) => <span>{value} zł</span>}
                />
              </td>
              <td className="records__amount">
                <DisplayingNumber
                  value={totalCosts[index]}
                  renderText={(value) => <span>{value} zł</span>}
                />
              </td>
              <td className="records__amount records__profit">
                <DisplayingNumber
                  value={totalMnoth[index] - totalCosts[index]}
                  renderText={(value) => <b>{value} zł</b>}
                />
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="records__summary" colSpan={2}>
            Razem:
          </td>
          <td className="records__summary">
            <DisplayingNumber
              value={totalYear()}
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
          <td className="records__summary">
            <DisplayingNumber
              value={totalCost()}
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
          <td className="records__summary">
            <DisplayingNumber
              value={yearEnd()}
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default YearSheets;
