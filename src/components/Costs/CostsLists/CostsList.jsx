//cpmponents
import Cost from "../Cost/Cost.jsx";
import ValidationError from "../../ValidationError/ValidationError";
import PaginationUX from "../../PaginationUX/PaginationUX";

function CostsList({
  costs,
  deleteItem,
  totalPages,
  currentPage,
  handlePageChange,
}) {
  return (
    <div className="costs__list">
      {costs.length === 0 ? (
        <div className="costs__emptyList">
          <ValidationError text="Nie znaleziono żadnych wydatków" />
        </div>
      ) : (
        <div>
          {costs.map((item) => (
            <Cost
              key={item.id}
              itemId={item.id}
              item={item.data}
              deleteItem={deleteItem}
            />
          ))}
        </div>
      )}
      <PaginationUX
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default CostsList;
