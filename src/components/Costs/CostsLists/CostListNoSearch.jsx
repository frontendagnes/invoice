import { useMemo } from "react";
import { useStateValue } from "../../../state/StateProvider";
import usePagination from "../../../hooks/usePagination";
//components
import Cost from "../Cost/Cost.jsx";
import ValidationError from "../../ValidationError/ValidationError";
import PaginationUX from "../../PaginationUX/PaginationUX.jsx";

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

  if (!sortedData.length)
    return <ValidationError text="Nie znaleziono żadnych wydatków" />;
  return (
    <div className="costs__list">
      <div>
        {sortedData.map((item) => (
          <Cost
            key={item.id}
            itemId={item.id}
            item={item.data}
            deleteItem={deleteItem}
          />
        ))}
      </div>
      <PaginationUX
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default CostListNoSearch;
