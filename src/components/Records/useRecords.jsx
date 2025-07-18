import { useEffect, useState, useCallback } from "react";
import { useStateValue } from "../../state/StateProvider";
import { getFilteredAndSortedDocuments } from "../../utility/documentFiltres";
import { getTotal } from "../../utility/functions";
import { months } from "./months";

function useRecords(data = []) {
  const [cumulativeIncome, setCumulativeIncome] = useState([]);
  const [monthlyIncomeTotals, setMonthlyIncomeTotals] = useState([]);
  const [monthlyCostTotals, setMonthlyCostTotals] = useState([]);
  const [selectedMonthNumber, setSelectedMonthNumber] = useState("");
  const [selectedMonthName, setSelectedMonthName] = useState("");
  const [isYearSummaryVisible, setIsYearSummaryVisible] = useState(true);

  const [{ costs, selectedYear }] = useStateValue();

  const calculateIncomeForMonth = useCallback(
    (monthNumber) => {
      const invoices = data.filter((item) => {
        const docDate =
          item.data.documentType === "CORRECTION"
            ? item.data.createdAt
            : item.data.date;
        return new Date(docDate).getFullYear() === selectedYear;
      });

      const baseInvoices = {};
      invoices.forEach((item) => {
        if (item.data.documentType !== "CORRECTION") {
          baseInvoices[item.id] = item.data;
        }
      });

      let correctionEntries = [];

      invoices.forEach((item) => {
        if (item.data.documentType === "CORRECTION") {
          const correctionMonth = new Date(item.data.createdAt).getMonth() + 1;
          if (correctionMonth === monthNumber) {
            const originalInvoice = baseInvoices[item.data.originalInvoiceId];
            const originalProducts = originalInvoice?.products || [];

            item.data.correctedItems?.forEach((correctedItem) => {
              let worth = 0;
              if (correctedItem.type === "ADDITION") {
                worth = correctedItem.correctedWorth || 0;
              } else if (correctedItem.type === "REMOVAL") {
                const product = originalProducts.find(
                  (p) => p.id === correctedItem.itemId
                );
                worth = -(product?.worth || 0);
              } else if (correctedItem.type === "MODIFICATION") {
                const product = originalProducts.find(
                  (p) => p.id === correctedItem.itemId
                );
                worth =
                  (correctedItem.correctedWorth || 0) - (product?.worth || 0);
              }
              correctionEntries.push({ worth });
            });
          }
        }
      });

      let invoiceProducts = [];
      Object.values(baseInvoices).forEach((invoice) => {
        const invoiceMonth = new Date(invoice.date).getMonth() + 1;
        if (invoiceMonth === monthNumber) {
          invoiceProducts.push(...(invoice.products || []));
        }
      });

      const baseTotal = getTotal(invoiceProducts);
      const correctionTotal = correctionEntries.reduce(
        (sum, item) => sum + (item.worth || 0),
        0
      );

      return baseTotal + correctionTotal;
    },
    [data, selectedYear]
  );

  const calculateCostsForMonth = useCallback(
    (monthNumber) => {
      const filteredCosts = costs.filter(
        (item) => new Date(item.data.date).getFullYear() === selectedYear
      );
      const matchingMonth = filteredCosts.filter(
        (item) => new Date(item.data.date).getMonth() + 1 === monthNumber
      );
      return matchingMonth.reduce((sum, item) => sum + item.data.amount, 0);
    },
    [costs, selectedYear]
  );

  const calculateCumulativeIncome = useCallback(() => {
    const filteredDocs = getFilteredAndSortedDocuments(
      data,
      selectedYear,
      selectedMonthNumber
    );
    let runningSum = 0;
    const cumulativeArray = filteredDocs.map((item) => {
      let worth = 0;
      if (item.data?.documentType === "CORRECTION") {
        worth = item.data.correctedItems.reduce(
          (s, i) => s + (i.worthDifference || 0),
          0
        );
      } else {
        worth = getTotal(item.data.products) || 0;
      }
      runningSum += worth;
      return runningSum;
    });
    setCumulativeIncome(cumulativeArray);
  }, [data, selectedYear, selectedMonthNumber]);

  useEffect(() => {
    if (selectedYear) {
      calculateCumulativeIncome();
    }
  }, [calculateCumulativeIncome, selectedYear, selectedMonthNumber]);

  const changeMonthByIndex = useCallback((index) => {
    setSelectedMonthNumber(index + 1);
    setIsYearSummaryVisible(false);
  }, []);

  const generateMonthlyIncomeSummary = useCallback(() => {
    const result = months.map((_, index) => calculateIncomeForMonth(index + 1));
    setMonthlyIncomeTotals(result);
  }, [calculateIncomeForMonth]);

  const generateMonthlyCostSummary = useCallback(() => {
    const result = months.map((_, index) => calculateCostsForMonth(index + 1));
    setMonthlyCostTotals(result);
  }, [calculateCostsForMonth]);

  useEffect(() => {
    if (selectedYear) {
      generateMonthlyIncomeSummary();
      generateMonthlyCostSummary();
    }
  }, [generateMonthlyIncomeSummary, generateMonthlyCostSummary, selectedYear]);

  const getYearlyIncomeTotal = () =>
    monthlyIncomeTotals.reduce((sum, val) => sum + val, 0);

  const getYearlyCostTotal = () =>
    monthlyCostTotals.reduce((sum, val) => sum + val, 0);

  const getYearEndBalance = () => getYearlyIncomeTotal() - getYearlyCostTotal();

  return {
    // state
    selectedMonthNumber,
    setSelectedMonthNumber,
    setSelectedMonthName,
    isYearSummaryVisible,
    setIsYearSummaryVisible,
    cumulativeIncome,
    monthlyIncomeTotals,
    monthlyCostTotals,
    costs,
    selectedYear,

    // functions
    changeMonthByIndex,
    calculateIncomeForMonth,
    calculateCostsForMonth,
    getYearlyIncomeTotal,
    getYearlyCostTotal,
    getYearEndBalance,
  };
}

export default useRecords;
