import "../print.css";
import usePrint from "../../../hooks/usePrint";
//components
import { PrintStyle } from "../../PrintStyle/PrintStyle";
import CostSheets from "../CostSheets";
import MonthAndYear from "../MonthAndYear/MonthAndYear";
import RecordsActions from "../RecordsActions/RecordsActions";
function CostTab({
  costs,
  setIsYearSummaryVisible,
  calculateCostsForMonth,
  selectedMonthNumber,
  selectedYear,
  setSelectedMonthName,
  changeMonthByIndex,
  setSelectedMonthNumber,
  selectedMonthName
}) {
  const { printRef: printCostRef, handlePrint } = usePrint();
  const handleSummary = () => {
    setSelectedMonthNumber("");
    setSelectedMonthName("");
    setIsYearSummaryVisible(true);
  };
  return (
    <>
      <RecordsActions
        onPrint={() => handlePrint()}
        onYearSummary={handleSummary}
      />
      <div className="records__print" ref={printCostRef}>
        <PrintStyle />
        <h2>Zestawienie Kosztów</h2>

        <MonthAndYear
          numberChange={changeMonthByIndex}
          setSelectMonth={setSelectedMonthName}
          number={selectedMonthNumber}
        />
        {/* only print */}
        <div className="records__printMonthAdnYear">
          <div>{selectedMonthName} </div>
          <div>{selectedYear}</div>
        </div>
        <CostSheets
          calculateCostsForMonth={calculateCostsForMonth}
          selectedMonthNumber={selectedMonthNumber}
          costs={costs}
          selectedYear={selectedYear}
        />
      </div>
    </>
  );
}

export default CostTab;
