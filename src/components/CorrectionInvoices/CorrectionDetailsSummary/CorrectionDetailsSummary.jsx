import { memo } from "react";
import "./CorrectionDetailsSummary.css";
import { amountToWords } from "../../../utility/amountToWords";
const CorrectionDetailsSummary = memo(
  ({ totalOriginalWorth, totalCorrectionWorth, totalWorthAfterCorrection }) => {
    return (
      <div className="correctionDetails__summary">
        <div>
          <span>Wartość brutto faktury oryginalnej:</span>
          {Number.parseFloat(totalOriginalWorth).toFixed(2)} zł
        </div>
        <div>
          <span>Łączna wartość korekty (różnica):</span>
          {Number.parseFloat(totalCorrectionWorth).toFixed(2)} zł
        </div>
        <div>
          <span>Wartość brutto faktury po korekcie:</span>
          {Number.parseFloat(totalWorthAfterCorrection).toFixed(2)} zł
        </div>
        <div>
          {totalCorrectionWorth > 0 && (
            <>
              <span>Do zapłaty</span>
              {`${Number.parseFloat(totalCorrectionWorth).toFixed(2)} zł`}
            </>
          )}
          {totalCorrectionWorth < 0 && (
            <>
              <span>Do zwrotu:</span>
              {`${Number.parseFloat(Math.abs(totalCorrectionWorth)).toFixed(
                2
              )} zł`}
            </>
          )}

          {totalCorrectionWorth === 0 && (
            <>
              <span>Rozliczono do zera</span>
            </>
          )}
        </div>
        <div>
          <span>Słownie: </span>
          {amountToWords(totalCorrectionWorth)}
        </div>
      </div>
    );
  }
);

export default CorrectionDetailsSummary;
