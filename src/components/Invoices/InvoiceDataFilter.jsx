import React, { useEffect, memo } from "react";
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useStateValue } from "../../assets/utility/StateProvider";
import useDateFilter from "../../hooks/useDateFilter.jsx";
import usePagination from "../../hooks/usePagination.jsx";

const ITEMS_PER_PAGE = 10;

const InvoiceDateFilter = ({ data, onFilterChange }) => {
  const [{ selectedYear }] = useStateValue();
  const { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear } =
    useDateFilter(data, selectedYear);
  const {
    currentPage,
    currentPageData: paginatedDataByDate,
    totalPages,
    handlePageChange,
    setCurrentPage: setPageDate,
  } = usePagination(filteredDataByDateAndYear, ITEMS_PER_PAGE);

  useEffect(() => {
    onFilterChange("date", {
      data: paginatedDataByDate,
      totalPages,
      handlePageChange,
      currentPage,
      setPage: setPageDate,
    });
  }, [
    paginatedDataByDate,
    totalPages,
    handlePageChange,
    currentPage,
    setPageDate,
    onFilterChange,
  ]);
  return (
    <div className="invoices__dataFilter">
      <h2>Wyszukaj faktury wg daty</h2>
      <div className="datefilter__input">
        <div className="datefilter__input--width">
          <TextField
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            fullWidth
          />
        </div>
        <RemoveCircleIcon
          onClick={resetDate}
          color="error"
          fontSize="large"
          className="datefilter__button"
        />
      </div>
    </div>
  );
};

export default memo(InvoiceDateFilter);
