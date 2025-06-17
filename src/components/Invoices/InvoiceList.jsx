//components
import InvoicesItem from "./InvoicesItem/InvoicesItem.jsx";
import PaginationUX from "../PaginationUX/PaginationUX";
import ValidationError from "../ValidationError/ValidationError";

const InvoiceList = ({
  invoices,
  openDetails,
  deleteItem,
  totalPages,
  handlePageChange,
  currentPage,
  allCorrections,
  openCorrectionDetails,
  deleteCorrection,
}) => {
  return (
    <>
      {invoices.length === 0 ? (
        <div className="invoices__emptyList">
          <ValidationError text="Nie znaleziono żadnych faktur" />
        </div>
      ) : (
        <div className="invoices__list">
          {invoices
            .filter((item) => item.data.documentType !== "CORRECTION")
            .map((item) => (
              <InvoicesItem
                key={item.id}
                item={item.data}
                itemId={item.id}
                openDetails={openDetails}
                deleteItem={deleteItem}
                allCorrections={allCorrections}
                openCorrectionDetails={openCorrectionDetails}
                deleteCorrection={deleteCorrection}
              />
            ))}
        </div>
      )}

      <PaginationUX
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default InvoiceList;
