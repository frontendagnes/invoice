import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Records.css";
import { getTotal, today } from "../../assets/functions";
import { useStateValue } from "../../assets/utility/StateProvider";
import TabGenerator from "../TabGenerator/TabGenerator";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
function Records({ data }) {
  const [cumTotal, setCumTotal] = useState([]);
  const [totalMnoth, setTotalMonth] = useState([]);
  const [totalCosts, setTotalCosts] = useState([]);
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

  const [{ costs }] = useStateValue();

  let printPDFref = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printPDFref.current,
    documentTitle: `${today()}-`,
  });

  let printCostref = useRef(null);
  const handlePrintCost = useReactToPrint({
    content: () => printCostref.current,
    documentTitle: `${today()}-`,
  });

  let printSummaryref = useRef(null);
  const handlePrintSummary = useReactToPrint({
    content: () => printSummaryref.current,
    documentTitle: `${today()}-`,
  });

  const sumMonth = useCallback(
    (num) => {
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
    },
    [data]
  );

  const sumCosts = useCallback(
    (num) => {
      let i = 0;
      let arr = [];
      while (i < costs.length) {
        let date = new Date(costs[i].data.date).getMonth() + 1;
        if (date === num) {
          arr.push(costs[i]);
        }
        i++;
      }
      return arr.reduce((amount, item) => item.data.amount + amount, 0);
    },
    [costs]
  );

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
  }, [months, sumMonth, summaryYearId]);

  const summaryCosts = useCallback(() => {
    let totalCosts = [];
    months
      .filter((_, index) => index !== summaryYearId)
      .forEach((_, index) => {
        totalCosts.push(sumCosts(index + 1));
      });
    setTotalCosts(totalCosts);
  }, [months, sumCosts, summaryYearId]);

  useEffect(() => {
    summaryYear();
    summaryCosts();
  }, [summaryYear, summaryCosts]);

  const totalYear = () => {
    return totalMnoth.reduce((amount, item) => item + amount, 0);
  };
  const totalCost = () => {
    return totalCosts.reduce((amount, item) => item + amount, 0);
  };

  const yearEnd = () => {
    return totalYear() - totalCost();
  };
  const printButtons = () => {
    return months.map((item, index) => (
      <div
        key={index + 1}
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
          <TabGenerator
            component={
              <>
                <Button
                  type="button"
                  onClick={handlePrint}
                  className="records__printButton"
                >
                  Drukuj
                </Button>
                <div className="records__print" ref={printPDFref}>
                  <table>
                    <caption>
                      <div className="records__total">
                        <div>
                          Miesiąc: <b>{months[number - 1]}</b>
                        </div>
                        <div>
                          Przychód:{" "}
                          <b>
                            {Number.parseFloat(sumMonth(number)).toFixed(2)} zł
                          </b>
                        </div>
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
                          (item) =>
                            new Date(item.data.date).getMonth() + 1 === number
                        )
                        .map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.data.number}</td>
                            <td>{item.data.date}</td>
                            <td className="records__amount">
                              {Number.parseFloat(
                                getTotal(item.data.products)
                              ).toFixed(2)}{" "}
                              zł
                            </td>
                            <td className="records__amount">
                              {Number.parseFloat(cumTotal[index]).toFixed(2)} zł
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
                          {Number.parseFloat(sumMonth(number)).toFixed(2)} zł
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            }
            title="Przychody"
            title1="Koszty"
            component1={
              <>
                <Button
                  type="button"
                  onClick={handlePrintCost}
                  className="records__printButton"
                >
                  Drukuj
                </Button>
                <div className="records__print" ref={printCostref}>
                  <table>
                    <caption>
                      <div className="records__total">
                        <div>
                          Miesiąc: <b>{months[number - 1]}</b>
                        </div>
                        <div>
                          Koszty:{" "}
                          <b>
                            {Number.parseFloat(sumCosts(number)).toFixed(2)} zł
                          </b>
                        </div>
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
                          (item) =>
                            new Date(item.data.date).getMonth() + 1 === number
                        )
                        .map((item, index) => (
                          <tr key={item.id}>
                            <td className="table__singular">{index + 1}</td>
                            <td>{item.data.number}</td>
                            <td>{item.data.contractor}</td>
                            <td>{item.data.date}</td>
                            <td className="records__amount">
                              {Number.parseFloat(item.data.amount).toFixed(2)}{" "}
                              zł
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
                          {Number.parseFloat(sumCosts(number)).toFixed(2)} zł
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            }
          />
        ) : (
          <div>
            <Button
              type="button"
              onClick={handlePrintSummary}
              className="records__printButton"
            >
              Drukuj
            </Button>
            <div ref={printSummaryref} className="records__print">
              <table id="records__tableSummary">
                <caption>
                  <div>
                    Podsumowanie roku {new Date().getFullYear()}:{" "}
                    <b>{Number.parseFloat(totalYear()).toFixed(2)} zł</b>
                  </div>
                  <div className="records__revenue">
                    Roczny Dochód (przychody - koszty):{" "}
                    <b>{Number.parseFloat(yearEnd()).toFixed(2)} zł</b>
                  </div>
                </caption>
                <thead>
                  <tr>
                    <td className="table__singular">Lp.</td>
                    <td>Miesiąc</td>
                    <td>Przychody</td>
                    <td>Koszty</td>
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
                          {Number.parseFloat(totalMnoth[index]).toFixed(2)} zł
                        </td>
                        <td className="records__amount">
                          {Number.parseFloat(totalCosts[index]).toFixed(2)} zł
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
                      {Number.parseFloat(totalYear()).toFixed(2)} zł
                    </td>
                    <td className="records__summary">
                      {Number.parseFloat(totalCost()).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;
