import React from "react";

import { getTotal } from "../../assets/functions";

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
            optionalValue={item.data.note}
            name={item.data.buyer.name}
            number={item.data.number}
            index={item.id}
            date={item.data.date}
            noteCnt={item.data?.note}
            openDetails={openDetails}
            deleteItem={deleteItem}
            amount={getTotal(item.data.products)}
            nip={item.data.buyer.nip}
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
