import "../print.css";
import usePrint from "../../../hooks/usePrint";

//components
import { PrintStyle } from "../../PrintStyle/PrintStyle";
import IncomeSheets from "../IncomeSheets";
import MonthAndYear from "../MonthAndYear/MonthAndYear";
import RecordsActions from "../RecordsActions/RecordsActions";

function IncomeTab({
  data = [],
  selectedMonthNumber,
  selectedYear,
  cumulativeIncome,
  setIsYearSummaryVisible,
  setSelectedMonthName,
  calculateIncomeForMonth,
  changeMonthByIndex,
  setSelectedMonthNumber,
}) {
  const { printRef: printIncomeRef, handlePrint } = usePrint();
  const handleSummary = () => {
    setSelectedMonthNumber(null);
    setSelectedMonthName("");
    setIsYearSummaryVisible(true);
  };
  return (
    <>
      <RecordsActions
        onPrint={() => handlePrint()}
        onYearSummary={handleSummary}
      />

      <div className="records__print" ref={printIncomeRef}>
        <PrintStyle />
        <h2>Zestawienie Przychodów</h2>

        <MonthAndYear
          numberChange={changeMonthByIndex}
          setSelectMonth={setSelectedMonthName}
          number={selectedMonthNumber}
        />

        <IncomeSheets
          calculateIncomeForMonth={calculateIncomeForMonth}
          selectedMonthNumber={selectedMonthNumber}
          data={data}
          cumulativeIncome={cumulativeIncome}
          selectedYear={selectedYear}
        />
      </div>
    </>
  );
}

export default IncomeTab;
