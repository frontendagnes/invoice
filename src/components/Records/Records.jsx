import { useEffect, useState, useCallback, useRef } from "react";
import "./records.style.css";
import {
  getFilteredAndSortedDocuments,
  getDateFromItem,
} from "../../utility/documentFiltres";
import { getTotal, today } from "../../utility/functions";
import { useStateValue } from "../../state/StateProvider";
import { useReactToPrint } from "react-to-print";

// mui
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
//components
import TabGenerator from "../TabGenerator/TabGenerator";
import IncomeSheets from "./IncomeSheets";
import CostSheets from "./CostSheets";
import YearSheets from "./YearSheets";
import Print from "../Print";

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

function Records({ data = [] }) {
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

  // const months = [
  //   "Styczeń",
  //   "Luty",
  //   "Marzec",
  //   "Kwiecień",
  //   "Maj",
  //   "Czerwiec",
  //   "Lipiec",
  //   "Sierpień",
  //   "Wrzesień",
  //   "Październik",
  //   "Listopad",
  //   "Grudzień",
  //   "Podsumowanie roku",
  // ];
  const summaryYearId = months.indexOf("Podsumowanie roku");

  const [{ costs, selectedYear }] = useStateValue();

  let printPDFref = useRef(null);
  const handlePrint = useReactToPrint({
    contentRef: printPDFref,
    documentTitle: `${today()}-`,
  });

  let printCostref = useRef(null);
  const handlePrintCost = useReactToPrint({
    contentRef: printCostref,
    documentTitle: `${today()}-`,
  });

  let printSummaryref = useRef(null);
  const handlePrintSummary = useReactToPrint({
    contentRef: printSummaryref,
    documentTitle: `${today()}-`,
  });

  // const sumMonth = useCallback(
  //   (num) => {
  //     let i = 0;
  //     let arr = [];
  //     let dataF = data.filter(
  //       (item) => new Date(item.data.date).getFullYear() === selectedYear
  //     );
  //     while (i < dataF.length) {
  //       let date = new Date(dataF[i].data.date).getMonth() + 1;
  //       if (date === num) {
  //         dataF[i].data.products.map((product) =>
  //           arr.push({ worth: product.worth })
  //         );
  //       }
  //       i++;
  //     }
  //     return getTotal(arr);
  //   },
  //   [data, selectedYear]
  // );

  const sumMonth = useCallback(
    (num) => {
      const invoicesForSelectedYear = data.filter((item) => {
        const docDate =
          item.data.documentType === "CORRECTION"
            ? item.data.createdAt
            : item.data.date;
        return new Date(docDate).getFullYear() === selectedYear;
      });

      const originalInvoicesMap = {};
      invoicesForSelectedYear.forEach((item) => {
        if (item.data.documentType !== "CORRECTION") {
          originalInvoicesMap[item.id] = item.data;
        }
      });

      let correctionsToSum = [];

      invoicesForSelectedYear.forEach((item) => {
        if (item.data.documentType === "CORRECTION") {
          const correctionDate = item.data.createdAt;
          const correctionMonth = new Date(correctionDate).getMonth() + 1;

          if (correctionMonth === num) {
            const correctedItems = item.data.correctedItems || [];
            const originalInvoice =
              originalInvoicesMap[item.data.originalInvoiceId];
            const originalProducts = originalInvoice?.products || [];

            correctedItems.forEach((correctedItem) => {
              let worth = 0;

              if (correctedItem.type === "ADDITION") {
                worth = correctedItem.correctedWorth || 0;
              } else if (correctedItem.type === "REMOVAL") {
                const originalProduct = originalProducts.find(
                  (p) => p.id === correctedItem.itemId
                );
                worth = -(originalProduct?.worth || 0);
              } else if (correctedItem.type === "MODIFICATION") {
                const originalProduct = originalProducts.find(
                  (p) => p.id === correctedItem.itemId
                );
                const oldWorth = originalProduct?.worth || 0;
                const newWorth = correctedItem.correctedWorth || 0;
                worth = newWorth - oldWorth;
              }

              correctionsToSum.push({ worth });
            });
          }
        }
      });

      let productsToSum = [];

      Object.values(originalInvoicesMap).forEach((invoiceData) => {
        const invoiceDate = invoiceData.date;
        if (!invoiceDate) return;

        const invoiceMonth = new Date(invoiceDate).getMonth() + 1;

        if (invoiceMonth === num) {
          productsToSum.push(...(invoiceData.products || []));
        }
      });

      const totalFromInvoices = getTotal(productsToSum);
      const totalFromCorrections = correctionsToSum.reduce(
        (acc, curr) => acc + (curr.worth || 0),
        0
      );

      return totalFromInvoices + totalFromCorrections;
    },
    [data, selectedYear, getTotal]
  );

  const sumCosts = useCallback(
    (num) => {
      let i = 0;
      let arr = [];
      let costsF = costs.filter(
        (item) => new Date(item.data.date).getFullYear() === selectedYear
      );
      while (i < costsF.length) {
        let date = new Date(costsF[i].data.date).getMonth() + 1;
        if (date === num) {
          arr.push(costsF[i]);
        }
        i++;
      }
      return arr.reduce((amount, item) => item.data.amount + amount, 0);
    },
    [costs, selectedYear]
  );

  // const cumulativeTotal = useCallback(() => {
  //   let i = 0;
  //   let arr = [];
  //   let dataF = data
  //     .sort((a, b) => new Date(a.data.date) - new Date(b.data.date))
  //     .filter(
  //       (item) => new Date(item.data.date).getFullYear() === selectedYear
  //     );
  //   while (i < dataF.length) {
  //     let date = new Date(dataF[i].data.date).getMonth() + 1;
  //     if (date === number) {
  //       arr.push(getTotal(dataF[i].data.products));
  //     }
  //     i++;
  //   }

  //   let num = 0;
  //   let next = [];
  //   for (let i = 0; i < arr.length; i++) {
  //     num = num + arr[i];
  //     next.push(num);
  //   }
  //   setCumTotal(next);
  // }, [data, number, selectedYear]);
  const cumulativeTotal = useCallback(() => {
    const filteredAndSortedForMonth = getFilteredAndSortedDocuments(
      data, // Twoje `allDocuments`
      selectedYear,
      number
    );

    let currentCumulativeSum = 0;
    let cumulativeArray = [];

    filteredAndSortedForMonth.forEach((item) => {
      const documentType = item.data?.documentType || "INVOICE";
      let itemWorth = 0;

      if (documentType === "CORRECTION") {
        // Dla korekt, sumuj worthDifference ze wszystkich skorygowanych pozycji
        itemWorth = item.data.correctedItems.reduce((sum, currentItem) => {
          return sum + (currentItem.worthDifference || 0);
        }, 0);
      } else {
        // Dla faktur, użyj wartości z getTotal(item.data.products)
        itemWorth = getTotal(item.data.products) || 0;
      }

      currentCumulativeSum += itemWorth;
      cumulativeArray.push(currentCumulativeSum);
    });

    setCumTotal(cumulativeArray);
  }, [data, number, selectedYear, getTotal, setCumTotal]);
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
            tabs={[
              {
                label: "Przychody",
                content: (
                  <>
                    <Print onClick={() => handlePrint()} />
                    <div className="records__print" ref={printPDFref}>
                      <style type="text/css" media="print">
                        {
                          "\
                  @page { size: landscape; }\
                  "
                        }
                      </style>
                      <h2>Zestawienie Przychodów {selectedYear}</h2>
                      <IncomeSheets
                        months={months}
                        sumMonth={sumMonth}
                        number={number}
                        data={data}
                        getTotal={getTotal}
                        cumTotal={cumTotal}
                        selectedYear={selectedYear}
                      />
                    </div>
                  </>
                ),
              },
              {
                label: "Koszty",
                content: (
                  <>
                    <Print onClick={() => handlePrintCost()} />
                    <div className="records__print" ref={printCostref}>
                      <style type="text/css" media="print">
                        {
                          "\
                  @page { size: landscape; }\
                  "
                        }
                      </style>
                      <h2>Zestawienie Kosztów {selectedYear}</h2>
                      <CostSheets
                        months={months}
                        sumCosts={sumCosts}
                        number={number}
                        costs={costs}
                        selectedYear={selectedYear}
                      />
                    </div>
                  </>
                ),
              },
            ]}
          />
        ) : (
          <div>
            <Print onClick={() => handlePrintSummary()} />
            <div ref={printSummaryref} className="records__print">
              <style type="text/css" media="print">
                {
                  "\
                  @page { size: landscape; }\
                  "
                }
              </style>
              <h2>Podsumowanie roku {selectedYear}</h2>
              <YearSheets
                totalYear={totalYear}
                totalCost={totalCost}
                yearEnd={yearEnd}
                months={months}
                summaryYearId={summaryYearId}
                totalMnoth={totalMnoth}
                totalCosts={totalCosts}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Records;
