import "../print.css";
import usePrint from "../../../hooks/usePrint";
//components
import Print from "../../Print";
import { PrintStyle } from "../../PrintStyle/PrintStyle";
import YearSheets from "../YearSheets";
import MonthAndYear from "../MonthAndYear/MonthAndYear";

function SummaryTab({
  changeMonthByIndex,
  setSelectedMonthName,
  selectedMonthNumber,
  selectedYear,
  getYearlyIncomeTotal,
  getYearlyCostTotal,
  getYearEndBalance,
  monthlyIncomeTotals,
  monthlyCostTotals,
}) {
  const { printRef: printSummaryRef, handlePrint } = usePrint();

  return (
    <div>
      <MonthAndYear
        numberChange={changeMonthByIndex}
        setSelectMonth={setSelectedMonthName}
        number={selectedMonthNumber}
      />
      <Print onClick={() => handlePrint()} />
      <div ref={printSummaryRef} className="records__print">
        <PrintStyle />
        <h2>Podsumowanie roku {selectedYear}</h2>
        <YearSheets
          getYearlyIncomeTotal={getYearlyIncomeTotal}
          getYearlyCostTotal={getYearlyCostTotal}
          getYearEndBalance={getYearEndBalance}
          monthlyIncomeTotals={monthlyIncomeTotals}
          monthlyCostTotals={monthlyCostTotals}
        />
      </div>
    </div>
  );
}

export default SummaryTab;
