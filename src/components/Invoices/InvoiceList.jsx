import React from "react";
import InvoicesItem from "../InvoicesItem/InvoicesItem";
import { Pagination, Stack } from "@mui/material";
import { getTotal } from "../../assets/functions";
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
      {invoices.map((item) => (
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
        />
      ))}
      {totalPages > 1 && (
        <Stack alignItems="center" mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
};

export default InvoiceList;
