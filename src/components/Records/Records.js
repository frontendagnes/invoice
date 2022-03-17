import React, { useEffect, useState, useCallback } from "react";
import "./Records.css";
import { getTotal } from "../../assets/functions";

function Records({ data }) {
  const [cumTotal, setCumTotal] = useState([]);
  const [totalMnoth, setTotalMonth] = useState([]);
  const [number, setNumber] = useState(new Date().getMonth() + 1);
  const [months, setMonths] = useState([
    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",
    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień",
    "Podsumowanie roku",
  ]);

  const summaryYearId = months.indexOf("Podsumowanie roku");

  const sumMonth = (num) => {
    let i = 0;
    let arr = [];

    while (i < data.length) {
      let date = new Date(data[i].data.date).getMonth() + 1;
      if (date === num) {
        data[i].data.products.map((product) =>
          arr.push({ worth: product.worth })
        );
      }
      i++;
    }
    return getTotal(arr);
  };

  const cumulativeTotal = useCallback(() => {
    let i = 0;
    let arr = [];

    while (i < data.length) {
      let date = new Date(data[i].data.date).getMonth() + 1;
      if (date === number) {
        arr.push(getTotal(data[i].data.products));
      }
      i++;
    }

    let num = 0;
    let next = [];
    for (let i = 0; i < arr.length; i++) {
      num = num + arr[i];
      next.push(num);
    }
    setCumTotal(next);
  }, [data, number]);

  useEffect(() => {
    cumulativeTotal();
  }, [cumulativeTotal]);

  const numberChange = (amount) => {
    let num = amount + 1;
    setNumber(num);
  };

  const summaryYear = useCallback(() => {
    let totalArr = [];
    months
      .filter((_, index) => index !== summaryYearId)
      .forEach((_, index) => {
        totalArr.push(sumMonth(index + 1));
      });
    setTotalMonth(totalArr);
  }, [data]);

  useEffect(() => {
    summaryYear();
  }, [summaryYear]);

  const totalYear = () => {
    return totalMnoth.reduce((amount, item) => item + amount, 0);
  };
  const printButtons = () => {
    return months.map((item, index) => (
      <div
        key={index + 1}
        type="button"
        className="records__button"
        onClick={() => numberChange(index)}
        style={{ background: index === number - 1 ? "#3f4d70" : "#1976d2" }}
      >
        {item}
      </div>
    ));
  };
  return (
    <div className="records">
      <div className="records__buttons">{printButtons()}</div>
      <div className="records__wrapper">
      {number - 1 !== summaryYearId ? (
        <table>
          <caption>
            <div className="records__total">
              Podsumowanie miesiąca {months[number - 1]}: {Number.parseFloat(sumMonth(number)).toFixed(2)} zł
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
          {data
            .filter(
              (item) => new Date(item.data.date).getMonth() + 1 === number
            )
            .map((item, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.data.number}</td>
                  <td>{item.data.date}</td>
                  <td className="records__amount">
                    {Number.parseFloat(getTotal(item.data.products)).toFixed(2)} zł
                  </td>
                  <td className="records__amount">{Number.parseFloat(cumTotal[index]).toFixed(2)} zł</td>
                </tr>
              </tbody>
            ))}
          <tfoot>
            <tr>
              <td className="records__summary" colSpan={4}>
                Podsumowanie:
              </td>
              <td className="records__summary">{Number.parseFloat(sumMonth(number)).toFixed(2)} zł</td>
            </tr>
          </tfoot>
        </table>
      ) : (
          <table id="records__tableSummary">
            <caption>
              <div className="records__total">
                Podsumowanie roku: {totalYear()} zł
              </div>
            </caption>
            <thead>
              <tr>
                <td>Lp.</td>
                <td>Miesiąc</td>
                <td>Suma</td>
              </tr>
            </thead>
            {months
              .filter((_, index) => index !== summaryYearId)
              .map((month, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td className="records__monthTd">{month}</td>
                    <td className="records__amount">{totalMnoth[index]} zł</td>
                  </tr>
                </tbody>
              ))}
            <tfoot>
              <tr>
                <td className="records__summary" colSpan={2}>
                  Razem:
                </td>
                <td className="records__summary">{totalYear()} zł</td>
              </tr>
            </tfoot>
          </table>
      )}
      </div>
    </div>
  );
}

export default Records;
