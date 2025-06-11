import { useMemo, useRef } from "react";
import "./CorrectionDetails.css";

import { getCorrectionWorth } from "../util/helpers";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
//components
import ValidationError from "../../ValidationError/ValidationError.jsx";
import Print from "../../Print/";
import CorrectionDetailsHeader from "../CorrectionDetailsHeader/CorrectionDetailsHeader.jsx";
import CorrectionDetailsPersons from "../PersonDetails/PersonDetails.jsx";
import CorrectionProductsTable from "../CorrectionProductsTable/CorrectionProductsTable.jsx";
import CorrectionDetailsSummary from "../CorrectionDetailsSummary/CorrectionDetailsSummary.jsx";
import CorrectionDetailsSignature from "../CorrectionDetailsSignature/CorrectionDetailsSignature.jsx";
import Footer from "../../Footer/Footer.jsx";

function CorrectionDetails({ data }) {
  let { correctionId } = useParams();
  const printPDFref = useRef(null);

  const handlePrint = useReactToPrint({
    contentRef: printPDFref,
    documentTitle: "correction-invoice",
  });

  const correctionItem = useMemo(() => {
    return data.find((doc) => doc.id === correctionId);
  }, [data, correctionId]);

  if (!correctionItem) {
    return (
      <ValidationError
        text={`Błąd ładowania danych lub korekta o ID: ${correctionId} nie została znaleziona.`}
      />
    );
  }
  const { data: correctionData } = correctionItem;
  const { originalInvoiceData } = correctionData;
  const { correctedHeader } = correctionData;

  const totalOriginalWorth = useMemo(() => {
    return originalInvoiceData?.products
      ? originalInvoiceData.products.reduce(
          (sum, product) => sum + (Number(product.worth) || 0),
          0
        )
      : 0;
  }, [originalInvoiceData?.products]);

  const totalCorrectionWorth = useMemo(() => {
    return getCorrectionWorth(correctionData.correctedItems);
  }, [correctionData.correctedItems]);

  const totalWorthAfterCorrection = useMemo(() => {
    return totalOriginalWorth + totalCorrectionWorth;
  }, [totalOriginalWorth, totalCorrectionWorth]);

  return (
    <div className="correctionDetails">
      <Print onClick={() => handlePrint()} />
      <div
        className="correctionDetails__wrapper"
        id="correction"
        key={correctionItem.id}
        ref={printPDFref}
      >
        <CorrectionDetailsHeader
          correctionNumber={correctionData.correctionNumber}
          originalInvoiceNumber={originalInvoiceData?.number}
          originalInvoiceIssueDate={originalInvoiceData?.issueDate}
          createdAt={correctionData.createdAt}
        />
        <CorrectionDetailsPersons
          seller={originalInvoiceData?.seller}
          buyer={correctedHeader?.correctedBuyer}
        />

        <div className="correctionDetails__products">
          <div>
            <div className="products__title">Produkty przed korektą:</div>
            <CorrectionProductsTable
              products={originalInvoiceData?.products}
              isCorrectionTable={false}
            />
          </div>
          <div>
            <div className="products__title">Produkty po korekcie:</div>
            <CorrectionProductsTable
              products={correctionData.correctedItems}
              isCorrectionTable={true}
              totalOriginalWorth={totalOriginalWorth}
              totalCorrectionWorth={totalCorrectionWorth}
              totalWorthAfterCorrection={totalWorthAfterCorrection}
            />
          </div>
        </div>
        <CorrectionDetailsSummary
          totalOriginalWorth={totalOriginalWorth}
          totalCorrectionWorth={totalCorrectionWorth}
          totalWorthAfterCorrection={totalWorthAfterCorrection}
        />
        <CorrectionDetailsSignature
          originalInvoiceData={originalInvoiceData}
          correctedHeader={correctedHeader}
        />
      </div>
      <Footer />
    </div>
  );
}

export default CorrectionDetails;
