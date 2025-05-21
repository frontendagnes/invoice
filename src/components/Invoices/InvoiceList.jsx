//components
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import PaginationUX from "../PaginationUX/PaginationUX";
import ValidationError from "../ValidationError/ValidationError";

const InvoiceList = ({
  invoices,
  openDetails,
  deleteItem,
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  return (
    <>
      {invoices.length === 0 ? (
        <div className="invoices__emptyList">
          <ValidationError text="Nie znaleziono żadnych faktur" />
        </div>
      ) : (
        invoices.map((item) => (
          <InvoicesItem
            key={item.id}
            item={item}
            index={item.id}
            openDetails={openDetails}
            deleteItem={deleteItem}
          />
        ))
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
