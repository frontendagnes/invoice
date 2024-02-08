import React from "react";
import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
function IncomeSheets(props) {
  const { months, sumMonth, number, data, getTotal, cumTotal, selectedYear } = props;
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
                value={sumMonth(number)}
                renderText={(value) => <b>{value} zł</b>}
              />
            </b>
          </span>
        </div>
      </caption>
      <thead>
        <tr>
          <td>Lp.</td>
          <td>Numer Faktury</td>
          <td>Data Faktury</td>
          <td>Wartość Faktury</td>
          <td>Wartość narastająco</td>
        </tr>
      </thead>
      <tbody>
        {data
          .filter(
            (item) => new Date(item.data.date).getFullYear() === selectedYear
          )
          .sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
          .filter((item) => new Date(item.data.date).getMonth() + 1 === number)
          .map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.data.number}</td>
              <td>{item.data.date}</td>
              <td className="records__amount">
                <DisplayingNumber
                  value={getTotal(item.data.products)}
                  renderText={(value) => <b>{value} zł</b>}
                />
              </td>
              <td className="records__amount">
                <DisplayingNumber
                  value={cumTotal[index]}
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
              value={sumMonth(number)}
              renderText={(value) => <b>{value} zł</b>}
            />
          </td>
        </tr>
      </tfoot>
    </table>
  );
}

export default IncomeSheets;
