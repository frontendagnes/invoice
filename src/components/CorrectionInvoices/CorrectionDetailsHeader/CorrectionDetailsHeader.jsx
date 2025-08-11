import "./CorrectionDetailsHeader.css"
import { memo } from "react";
import { dateFormated } from "../util/helpers"; 

const CorrectionDetailsHeader = memo(
  ({
    correctionNumber,
    originalInvoiceNumber,
    originalInvoiceIssueDate,
    createdAt,
  }) => {
    return (
      <div className="correctionDetails__header">
        <div className="header__center">
          <div>Faktura korygująca nr: {correctionNumber || "Brak"}</div>
          <div>
            do faktury nr {originalInvoiceNumber || "Brak"} z dnia{" "}
            {originalInvoiceIssueDate || "Brak daty"}
          </div>
        </div>
        <div className="header__right">
          Data wystawienia: {dateFormated(createdAt)}
        </div>
      </div>
    );
  }
);

export default CorrectionDetailsHeader;
