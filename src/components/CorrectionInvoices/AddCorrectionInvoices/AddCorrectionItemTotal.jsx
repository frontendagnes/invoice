import React from 'react'

function AddCorrectionItemTotal({currentTotal}) {
  return (
    <div className="addCorrectionInvoice__total">
      <p>
        Suma korekty:{" "}
        <span
          className={
            currentTotal >= 0 ? "correction_positive" : "correction_negative"
          }
        >
          {currentTotal.toFixed(2)} zł
        </span>
      </p>
    </div>
  );
}

export default AddCorrectionItemTotal