import { forwardRef } from "react";
import FormButton from "../../Form/FormButton/FormButton";
import ListCorrectionInvoicesItem from "../ListCorrectionInvoicesItem/ListCorrectionInvoicesItem";

const CorrectionSection = forwardRef(
  (
    {
      isExpanded,
      onClose,
      onAddCorrection,
      corrections,
      openCorrectionDetails,
      deleteCorrection,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`invoicesItem__corrections-container ${
          isExpanded ? "expanded" : ""
        }`}
      >
        <div className="invoicesItem__corrections">
          <div className="invoicesItem__corrections--action">
            <FormButton
              onClick={onAddCorrection}
              text="Dodaj fakturę korygującą"
            />
            <FormButton
              onClick={() => onClose(false)}
              text="Anuluj"
              color="success"
            />
          </div>

          {corrections.length > 0 ? (
            <>
              <h3>Lista korekt:</h3>
              <div className="invoicesItem__corrections--list">
                {corrections.map((item) => (
                  <ListCorrectionInvoicesItem
                    key={item.id}
                    item={item}
                    openCorrectionDetails={openCorrectionDetails}
                    deleteCorrection={deleteCorrection}
                  />
                ))}
              </div>
            </>
          ) : (
            <p className="invoiceItem__corrections--empty">
              Brak faktur korygujących dla tego dokumentu
            </p>
          )}
        </div>
      </div>
    );
  }
);

export default CorrectionSection;
