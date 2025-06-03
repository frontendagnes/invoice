import React, { useEffect, memo } from "react";
import { TextField } from "@mui/material";
import { useStateValue } from "../../assets/utility/StateProvider";
// import useSearchFilter from "../../hooks/useSearchFilter";
import usePagination from "../../hooks/usePagination";
import useInvoiceSearchFilter from "../../hooks/useInvoiceSearchFilter";
const ITEMS_PER_PAGE = 10;

const InvoiceSearchFilter = ({ data, onFilterChange }) => {
  const [{ selectedYear }] = useStateValue();
  const { searchText, setSearchText, filteredDataBySearchAndYear } =
    useInvoiceSearchFilter(data, selectedYear);
  const {
    currentPage,
    currentPageData: paginatedDataForList,
    totalPages,
    handlePageChange,
    setCurrentPage: setPageSearch,
  } = usePagination(filteredDataBySearchAndYear, ITEMS_PER_PAGE);

  useEffect(() => {
    onFilterChange("search", {
      data: paginatedDataForList,
      totalPages,
      handlePageChange,
      currentPage,
      setPage: setPageSearch,
    });
  }, [
    paginatedDataForList,
    totalPages,
    handlePageChange,
    currentPage,
    setPageSearch,
    onFilterChange,
  ]);
  return (
    <div className="invoices__nameFilter">
      <h2>Wyszukaj fakture po kontrahencie, numerze lub NIP-ie</h2>
      <div className="namefilter__input">
        <TextField
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          id="outlined-basic"
          label="Wyszukaj wpisując kontrahenta lub numer faktury"
          variant="outlined"
          autoComplete="off"
          fullWidth
        />
      </div>
    </div>
  );
};

export default memo(InvoiceSearchFilter);
