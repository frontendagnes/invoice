import { useEffect, memo } from "react";
import { useStateValue } from "../../../state/StateProvider";
import useInvoiceSearchFilter from "../../../hooks/useInvoiceSearchFilter.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
//mui
import { TextField } from "@mui/material";

const ITEMS_PER_PAGE = import.meta.env.VITE_APP_ITEMS_PER_PAGE_LESS || 5;

const CorrectionSearchFilter = ({ data, onFilterChange }) => {
  const [{ selectedYear }] = useStateValue();
  const { searchText, setSearchText, filteredDataBySearchAndYear } =
    useInvoiceSearchFilter(data, selectedYear);
  const {
    currentPage,
    currentPageData: paginatedData,
    totalPages,
    handlePageChange,
    setCurrentPage: setPage,
  } = usePagination(filteredDataBySearchAndYear, ITEMS_PER_PAGE);

  useEffect(() => {
    onFilterChange({
      data: paginatedData,
      totalPages,
      handlePageChange,
      currentPage,
      setPage,
    });
  }, [
    paginatedData,
    totalPages,
    handlePageChange,
    currentPage,
    setPage,
    onFilterChange,
  ]);

  return (
    <div className="correctionInvoices__search">
      <TextField
        name="search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        id="search"
        label="Wyszukaj numer faktury"
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default memo(CorrectionSearchFilter);
