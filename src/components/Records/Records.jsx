import "./records.style.css";
import "./table.styles.css";
import useRecords from "./useRecords.jsx";
import { months } from "./months";

//components
import TabGenerator from "../TabGenerator/TabGenerator";
import IncomeTab from "./IncomeTab/IncomeTab.jsx";
import CostTab from "./CostTab/CostTab.jsx";
import SummaryTab from "./SummaryTab/SummaryTab.jsx";

function Records({ data = [] }) {
  const {
    // state
    selectedMonthNumber,
    setSelectedMonthName,
    isYearSummaryVisible,
    selectedMonthName,
    setIsYearSummaryVisible,
    cumulativeIncome,
    monthlyIncomeTotals,
    monthlyCostTotals,
    costs,
    selectedYear,
    setSelectedMonthNumber,
    // functions
    changeMonthByIndex,
    calculateIncomeForMonth,
    calculateCostsForMonth,
    getYearlyIncomeTotal,
    getYearlyCostTotal,
    getYearEndBalance,
  } = useRecords(data);

  return (
    <div className="records">
      <div className="records__wrapper">
        {!isYearSummaryVisible ? (
          <TabGenerator
            tabs={[
              {
                label: "Przychody",
                content: (
                  <IncomeTab
                    data={data}
                    months={months}
                    selectedMonthNumber={selectedMonthNumber}
                    selectedYear={selectedYear}
                    cumulativeIncome={cumulativeIncome}
                    calculateIncomeForMonth={calculateIncomeForMonth}
                    setIsYearSummaryVisible={setIsYearSummaryVisible}
                    setSelectedMonthName={setSelectedMonthName}
                    changeMonthByIndex={changeMonthByIndex}
                    setSelectedMonthNumber={setSelectedMonthNumber}
                    selectedMonthName={selectedMonthName}
                  />
                ),
              },
              {
                label: "Koszty",
                content: (
                  <CostTab
                    costs={costs}
                    setIsYearSummaryVisible={setIsYearSummaryVisible}
                    calculateCostsForMonth={calculateCostsForMonth}
                    selectedMonthNumber={selectedMonthNumber}
                    selectedYear={selectedYear}
                    setSelectedMonthName={setSelectedMonthName}
                    changeMonthByIndex={changeMonthByIndex}
                    setSelectedMonthNumber={setSelectedMonthNumber}
                    selectedMonthName={selectedMonthName}
                  />
                ),
              },
            ]}
          />
        ) : (
          <SummaryTab
            changeMonthByIndex={changeMonthByIndex}
            setSelectedMonthName={setSelectedMonthName}
            selectedMonthNumber={selectedMonthNumber}
            getYearlyIncomeTotal={getYearlyIncomeTotal}
            getYearlyCostTotal={getYearlyCostTotal}
            getYearEndBalance={getYearEndBalance}
            monthlyIncomeTotals={monthlyIncomeTotals}
            monthlyCostTotals={monthlyCostTotals}
            selectedYear={selectedYear}
          />
        )}
      </div>
    </div>
  );
}

export default Records;
