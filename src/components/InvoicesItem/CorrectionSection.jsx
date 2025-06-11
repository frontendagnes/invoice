import FormButton from "../Form/FormButton/FormButton";
import ListCorrectionInvoicesItem from "../CorrectionInvoices/ListCorrectionInvoicesItem/ListCorrectionInvoicesItem";

const CorrectionSection = ({
  isSettings,
  refCorrections,
  onAddCorrection,
  corrections,
  openCorrectionDetails,
  deleteCorrection,
}) => {
  return (
    <div
      ref={refCorrections}
      className={`invoicesItem__corrections-container ${
        isSettings ? "expanded" : ""
      }`}
    >
      <div className="invoicesItem__corrections">
        <div className="invoicesItem__corrections--action">
          <FormButton
            onClick={onAddCorrection}
            text="Dodaj fakturę korygującą"
          />
        </div>

        {corrections.length > 0 && (
          <div className="invoicesItem__corrections--list">
            <h3>Lista korekt:</h3>
            {corrections.map((item) => (
              <ListCorrectionInvoicesItem
                key={item.id}
                item={item.data}
                itemId={item.id}
                openCorrectionDetails={openCorrectionDetails}
                deleteCorrection={deleteCorrection}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CorrectionSection;
