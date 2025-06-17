import { useEffect, memo } from "react";

import { useStateValue } from "../../../utility/StateProvider";
import useSearchFilter from "../../../hooks/useSearchFilter";
import usePagination from "../../../hooks/usePagination";
//mui
import { TextField } from "@mui/material";

const ITEMS_PER_PAGE = 5;

const CostSearchFilter = ({ data, onFilterChange }) => {
  const [{ selectedYear }] = useStateValue();
  const { searchText, setSearchText, filteredDataBySearchAndYear } =
    useSearchFilter(data, selectedYear, "contractor");
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
    <div className="namefilter__input">
      <TextField
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        id="outlined-basic"
        label="Wyszukaj wpisując kontrahenta, numer faktury lub NIP"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
    </div>
  );
};

export default memo(CostSearchFilter);
