import { useEffect, memo } from "react";
import { useStateValue } from "../../../state/StateProvider";
import useDateFilter from "../../../hooks/useDateFilter.jsx";
import usePagination from "../../../hooks/usePagination.jsx";
//mui
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import Tooltip from "../../Tooltip/Tooltip.jsx";

const ITEMS_PER_PAGE = import.meta.env.VITE_APP_ITEMS_PER_PAGE_LESS || 5;

const CorrectionDateFilter = ({ data, onFilterChange }) => {
  const [{ selectedYear }] = useStateValue();
  const { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear } =
    useDateFilter(data, selectedYear);
  const {
    currentPage,
    currentPageData: paginatedData,
    totalPages,
    handlePageChange,
    setCurrentPage: setPage,
  } = usePagination(filteredDataByDateAndYear, ITEMS_PER_PAGE);

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
    <div className="correctionsInvoice__searchDate">
      <TextField
        type="date"
        label="Wyszukaj po dacie"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <Tooltip text="Resetuj datę">
        <RemoveCircleIcon
          onClick={resetDate}
          color="error"
          fontSize="large"
          className="datefilter__button"
        />
      </Tooltip>
    </div>
  );
};

export default memo(CorrectionDateFilter);
