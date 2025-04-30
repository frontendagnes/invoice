import React, { useMemo } from "react";
import { useStateValue } from "../../assets/utility/StateProvider";
import usePagination from "../../hooks/usePagination";
// import { Pagination, Stack } from "@mui/material";
//components
import Cost from "../Cost/Cost";
import ValidationError from "../ValidationError/ValidationError";
import PaginationUX from "../PaginationUX/PaginationUX.jsx";

const ITEMS_PER_PAGE = 10;

function CostListNoSearch({ costs, deleteItem }) {
  const [{ selectedYear }] = useStateValue();

  const filteredCosts = useMemo(() => {
      return costs.filter(
        (item) => new Date(item.data.date).getFullYear() === selectedYear
      );

  }, [costs, selectedYear]);

  const { currentPage, currentPageData, totalPages, handlePageChange } =
    usePagination(filteredCosts, ITEMS_PER_PAGE);

  const sortedData = useMemo(() => {
    return currentPageData.sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  }, [currentPageData]);

  return (
    <div className="costs__list">
      {sortedData.length === 0 ? (
        <div className="costs__emptyList">
          <ValidationError text="Nie znaleziono żadnych wydatków" />
        </div>
      ) : (
        sortedData.map((item) => (
          <Cost
            key={item.id}
            id={item.id}
            number={item.data.number}
            contractor={item.data.contractor}
            date={item.data.date}
            amount={item.data.amount}
            nip={item.data.nip}
            deleteItem={deleteItem}
          />
        ))
      )}
      <PaginationUX
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default CostListNoSearch;
