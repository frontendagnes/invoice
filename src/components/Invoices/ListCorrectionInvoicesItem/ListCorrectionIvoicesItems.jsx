import { dateFormated } from "../../CorrectionInvoices/util/helpers";

function ListCorrectionIvoicesItems({ item, totalWorthCorrection }) {
  return (
    <div className="listCorrectionInvoices__items">
      <div className="listCorrectionInvoices__item">
        <strong>Numer faktury:</strong>
        {item.data.correctionNumber}
      </div>
      <div className="listCorrectionInvoices__item">
        <strong>Data wystwaienia:</strong>
        {dateFormated(item.data.createdAt)}
      </div>
      <div className="listCorrectionInvoices__item">
        <strong>Kwota korekty (różnica): </strong>
        {totalWorthCorrection} zł
      </div>
    </div>
  );
}

export default ListCorrectionIvoicesItems;
