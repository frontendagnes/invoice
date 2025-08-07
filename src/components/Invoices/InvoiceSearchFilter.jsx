import { useEffect, memo } from "react";

import { useStateValue } from "../../state/StateProvider";
import usePagination from "../../hooks/usePagination";
import useInvoiceSearchFilter from "../../hooks/useInvoiceSearchFilter";
//mui
import { TextField } from "@mui/material";

const ITEMS_PER_PAGE = import.meta.env.VITE_APP_ITEMS_PER_PAGE_MORE || 10;

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
