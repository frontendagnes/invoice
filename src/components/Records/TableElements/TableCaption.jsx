import DisplayingNumber from "../../NumberComponents/DisplayingNumber/DisplayingNumber";

function TableCaption({ calculateFunction, selectedMonthNumber }) {
  const total = calculateFunction(selectedMonthNumber);
  return (
    <caption>
      <div className="records__total">
        <span>
          Suma:
          <strong
            className={`records__summary-top ${
              total < 0 ? "negative-row" : "positive-row "
            }`}
          >
            <DisplayingNumber
              value={total}
              renderText={(value) => <b>{value} zł</b>}
            />
          </strong>
        </span>
      </div>
    </caption>
  );
}

export default TableCaption;
