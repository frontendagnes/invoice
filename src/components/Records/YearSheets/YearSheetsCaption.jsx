import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";
//mui

function YearSheetsCaption({
  getYearlyIncomeTotal,
  getYearlyCostTotal,
  getYearEndBalance,
}) {
  return (
    <caption>
      <div>
        Przychody:
        <DisplayingNumber
          value={getYearlyIncomeTotal()}
          renderText={(value) => <b>{value} zł</b>}
        />
      </div>
      <div>
        Koszty:
        <DisplayingNumber
          value={getYearlyCostTotal()}
          renderText={(value) => <b>{value} zł</b>}
        />
      </div>
      <div className="records__revenue" title="Przychód - Koszty">
        Dochód:
        <DisplayingNumber
          value={getYearEndBalance()}
          renderText={(value) => <b>{value} zł</b>}
        />
      </div>
    </caption>
  );
}

export default YearSheetsCaption;
