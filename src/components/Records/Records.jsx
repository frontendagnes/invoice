import React, { useEffect, useState, useCallback, useRef } from "react";
import "./records.style.css";
import {
  getFilteredAndSortedDocuments,
  getDateFromItem,
} from "../../assets/utility/documentFiltres";
import { getTotal, today } from "../../assets/functions";
import { useStateValue } from "../../assets/utility/StateProvider";
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
      // 1. Filtruj dane tylko dla wybranego roku
      // Użyjemy createdAt dla korekt i date dla faktur, aby uzyskać rok
      const invoicesForSelectedYear = data.filter((item) => {
        const docDate =
          item.data.documentType === "CORRECTION"
            ? item.data.createdAt // Użyj createdAt dla korekt
            : item.data.date; // Użyj date dla faktur

        return new Date(docDate).getFullYear() === selectedYear;
      });

      // Obiekt do przechowywania finalnych danych faktur po korektach
      // Klucz: ID oryginalnej faktury, Wartość: Finalny obiekt DANYCH faktury (czyli to co było w item.data)
      const finalInvoiceDataMap = {};

      // 2. Przetwórz faktury pierwotne i załaduj je do finalInvoiceDataMap
      invoicesForSelectedYear.forEach((item) => {
        // Sprawdź, czy to faktura pierwotna (nie korekta)
        if (item.data.documentType !== "CORRECTION") {
          // <--- POPRAWIONY DOSTĘP
          finalInvoiceDataMap[item.id] = { ...item.data }; // Kopia danych faktury
        }
      });

      // 3. Przetwórz faktury korygujące i zastosuj je do finalInvoiceDataMap
      // Ważne: Przetwarzaj korekty oddzielnie, po zainicjalizowaniu faktur pierwotnych
      invoicesForSelectedYear.forEach((item) => {
        if (item.data.documentType === "CORRECTION") {
          // <--- POPRAWIONY DOSTĘP
          const originalInvoiceId = item.data.originalInvoiceId; // <--- POPRAWIONY DOSTĘP

          if (finalInvoiceDataMap[originalInvoiceId]) {
            // Mamy oryginalną fakturę, do której odnosi się korekta

            // Zastosuj korekty do pól nagłówka (kupujący, data itp.)
            // Robimy to tylko jeśli chcemy, aby podsumowanie odzwierciedlało te ZMIANY
            // np. jeśli data wystawienia korekty zmienia miesiąc dla podsumowania.
            // Jeśli data w podsumowaniu MA BYĆ ZAWSZE ORYGINALNĄ DATĄ FAKTURY, to usuń te linie.
            finalInvoiceDataMap[originalInvoiceId].buyer =
              item.data.correctedHeader?.correctedBuyer ||
              finalInvoiceDataMap[originalInvoiceId].buyer;
            finalInvoiceDataMap[originalInvoiceId].issueDate =
              item.data.correctedHeader?.correctedIssueDate ||
              finalInvoiceDataMap[originalInvoiceId].issueDate;
            // Możesz też zaktualizować 'date' jeśli 'issueDate' to tylko zmienna formularza
            if (item.data.correctedHeader?.correctedIssueDate) {
              finalInvoiceDataMap[originalInvoiceId].date =
                item.data.correctedHeader.correctedIssueDate;
            }

            // Aktualizuj listę produktów oryginalnej faktury
            let currentProducts = [
              ...(finalInvoiceDataMap[originalInvoiceId].products || []), // Upewnij się, że products istnieje
            ];

            item.data.correctedItems.forEach((correctedItem) => {
              // <--- POPRAWIONY DOSTĘP
              const existingProductIndex = currentProducts.findIndex(
                (p) => p.id === correctedItem.itemId
              );

              if (correctedItem.type === "ADDITION") {
                // Dodaj nową pozycję
                currentProducts.push({
                  id: correctedItem.itemId,
                  title: correctedItem.title,
                  quantity: correctedItem.correctedQuantity,
                  price: correctedItem.correctedPrice,
                  worth: correctedItem.correctedWorth,
                  vat: correctedItem.correctedVat,
                });
              } else if (correctedItem.type === "MODIFICATION") {
                // Modyfikuj istniejącą pozycję
                if (existingProductIndex > -1) {
                  currentProducts[existingProductIndex] = {
                    ...currentProducts[existingProductIndex],
                    title: correctedItem.title,
                    quantity: correctedItem.correctedQuantity,
                    price: correctedItem.correctedPrice,
                    worth: correctedItem.correctedWorth,
                    vat: correctedItem.correctedVat,
                  };
                }
              } else if (correctedItem.type === "REMOVAL") {
                // Obsługa usunięcia, jeśli masz takie korekty
                if (existingProductIndex > -1) {
                  currentProducts.splice(existingProductIndex, 1);
                }
              }
            });
            finalInvoiceDataMap[originalInvoiceId].products = currentProducts;

            // Ważne: Ponownie oblicz totalWorth dla oryginalnej faktury po korektach produktów
            finalInvoiceDataMap[originalInvoiceId].totalWorth =
              getTotal(currentProducts);
          } else {
            // Opcjonalnie: Coś poszło nie tak, bo korekta odnosi się do nieistniejącej faktury pierwotnej
            console.warn(
              `Korekta (ID: ${item.id}) odnosi się do nieistniejącej faktury pierwotnej (ID: ${originalInvoiceId})`
            );
            // Możesz tu zdecydować, czy taką korektę pominąć, czy np. potraktować jako nową "fakturę" z jej wartością.
            // Na razie ją pomijamy w sumowaniu finalnych faktur.
          }
        }
      });

      // 4. Zbierz produkty ze wszystkich finalnych faktur (po korektach) dla wybranego miesiąca
      let productsToSum = [];
      Object.values(finalInvoiceDataMap).forEach((invoiceData) => {
        // Użyj issueDate (które mogło być skorygowane) do określenia miesiąca
        const dateToUseForMonth = invoiceData.issueDate || invoiceData.date; // fallback na 'date'
        if (!dateToUseForMonth) {
          console.warn(
            `Brak daty dla faktury/korekty ID: ${invoiceData.id}. Pomijam w sumowaniu.`
          );
          return;
        }
        const invoiceMonth = new Date(dateToUseForMonth).getMonth() + 1;

        if (invoiceMonth === num) {
          // Jeśli chcesz sumować totalWorth z faktur, a nie poszczególne produkty:
          // productsToSum.push({ worth: invoiceData.totalWorth });
          // Jeśli chcesz sumować produkty (bardziej precyzyjnie):
          productsToSum.push(...(invoiceData.products || []));
        }
      });

      // 5. Oblicz sumę z zebranych produktów/wartości
      // Jeśli productsToSum zawiera obiekty z 'worth' (np. [{worth: 100}, {worth: -20}]):
      // return productsToSum.reduce((acc, curr) => acc + (curr.worth || 0), 0);
      // Jeśli productsToSum zawiera pełne obiekty produktów (jak w Twojej funkcji getTotal):
      return getTotal(productsToSum);
    },
    [data, selectedYear, getTotal] // Dodaj getTotal do zależności, jeśli jest zewnętrzną funkcją
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
