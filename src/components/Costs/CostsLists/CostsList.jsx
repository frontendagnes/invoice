import React from "react";

//cpmponents
import Cost from "../../Cost/Cost";
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
        costs.map((item) => (
          <Cost
            key={item.id}
            id={item.id}
            number={item.data.number}
            contractor={item.data.contractor}
            nip={item.data.nip}
            date={item.data.date}
            amount={item.data.amount}
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

export default CostsList;
