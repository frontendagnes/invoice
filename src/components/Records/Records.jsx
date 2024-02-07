import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Records.css";
import { getTotal, today } from "../../assets/functions";
import { useStateValue } from "../../assets/utility/StateProvider";
import TabGenerator from "../TabGenerator/TabGenerator";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DisplayingNumber from "../NumberComponents/DisplayingNumber/DisplayingNumber";

const ButtonMonth = styled(Button)`
  margin-left: 5px;
  margin-bottom: 10px;
  padding: 5px 20px;
  letter-spacing: 2px;
  transition: all 0.75s ease;
  font-weight: 600;
  :hover {
    background: #adadad !important;
    color: #ffffff !important;
  }
`;

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
      <div className="records__button" key={index + 1}>
        <ButtonMonth
          onClick={() => numberChange(index)}
          style={{
            background: index === number - 1 ? "#adadad" : "#fafafafa",
            color: index === number - 1 && "#ffffff",
          }}
          fullWidth
        >
          {item}
        </ButtonMonth>
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
                  <style type="text/css" media="print">
                    {
                      "\
                  @page { size: landscape; }\
                  "
                    }
                  </style>
                  <h2>Zestawienie Przychodów</h2>
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
                        .sort(
                          (a, b) =>
                            new Date(a.data.date) - new Date(b.data.date)
                        )
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
                  <style type="text/css" media="print">
                    {
                      "\
                  @page { size: landscape; }\
                  "
                    }
                  </style>
                  <h2>Zestawienie kosztów</h2>
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
                        .sort(
                          (a, b) =>
                            new Date(a.data.date).getTime() -
                            new Date(b.data.date).getTime()
                        )
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
              <style type="text/css" media="print">
                {
                  "\
                  @page { size: landscape; }\
                  "
                }
              </style>
              <h2>Podsumowanie roku</h2>
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;