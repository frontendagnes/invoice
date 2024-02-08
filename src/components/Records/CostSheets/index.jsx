import React from "react";
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
function CostSheets(props) {
  const { months, number, sumCosts, costs, selectedYear } = props;
  return (
    <table>
      <caption>
        <div className="records__total">
          <span>
            Miesiąc: <b>{months[number - 1]}</b>
          </span>
          <span>
            Suma:{" "}
            <b>
              <DisplayingNumber
                value={sumCosts(number)}
                renderText={(value) => <b>{value} zł</b>}
              />
            </b>
          </span>
        </div>
      </caption>
      <thead>
        <tr>
          <td className="table__singular">Lp.</td>
          <td>Numer Faktury</td>
          <td>Kontrahent</td>
          <td>Data wystawienia</td>
          <td>Wartość brutto</td>
        </tr>
      </thead>
      <tbody>
        {costs
          .filter(
            (item) => new Date(item.data.date).getFullYear() === selectedYear
          )
          .sort(
            (a, b) =>
              new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
          )
          .filter((item) => new Date(item.data.date).getMonth() + 1 === number)
          .map((item, index) => (
            <tr key={item.id}>
              <td className="table__singular">{index + 1}</td>
              <td>{item.data.number}</td>
              <td>{item.data.contractor}</td>
              <td>{item.data.date}</td>
              <td className="records__amount">
                <DisplayingNumber
                  value={item.data.amount}
                  renderText={(value) => <b>{value} zł</b>}
                />
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td className="records__summary" colSpan={4}>
            Podsumowanie:
          </td>
          <td className="records__summary">
            <DisplayingNumber
              value={sumCosts(number)}
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default CostSheets;
