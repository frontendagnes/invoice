import React, { useState, useCallback } from "react";
import "./Costs.css";
import { useStateValue } from "../../assets/utility/StateProvider";
import useFirestore from "../../api/useFirestore/useFirestore";
import CostDateFilter from "./CostDateFilter";
import CostSearchFilter from "./CostSearchFilter";

//components
import AddCost from "../AddCost/AddCost";
import TabGenerator from "../TabGenerator/TabGenerator";
import CostsList from "./CostsList";
import CostListNoSearch from "./CostListNoSearch";

function Costs() {
  const [{ costs }, dispatch] = useStateValue();
  const { deleteDocument } = useFirestore("invoices");

  const [dateFilterResult, setDateFilterResult] = useState({
    data: [],
    totalPages: 1,
    handlePageChange: () => {},
    currentPage: 1,
    setPage: () => {},
  });
  const [searchFilterResult, setSearchFilterResult] = useState({
    data: [],
    totalPages: 1,
    handlePageChange: () => {},
    currentPage: 1,
    setPage: () => {},
  });

  const deleteItem = async (itemId) => {
    await deleteDocument("costs", itemId);
    dispatch({ type: "ALERT_DELETE" });
  };
  const handleFilterChange = useCallback((filterType, result) => {
    if (filterType === "date") {
      setDateFilterResult(result);
    } else if (filterType === "search") {
      setSearchFilterResult(result);
    }
  }, []);

  const renderFilteredList = ({
    data,
    totalPages,
    currentPage,
    handlePageChange,
  }) => (
    <div className="costs__list-section">
      <CostsList
        costs={data}
        deleteItem={deleteItem}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
  return (
    <div className="costs">
      <TabGenerator
        tabs={[
          {
            label: "Dodaj wydatek",
            content: (
              <div className="costs__add">
                <AddCost />
                <CostListNoSearch costs={costs} deleteItem={deleteItem} />
              </div>
            ),
          },
          {
            label: "Przeglądaj wydatki",
            content: (
              <div className="costs__filter">
                <div className="costs__list">
                  <h2>Wyszukaj faktury wg daty </h2>
                  <CostDateFilter
                    data={costs}
                    onFilterChange={handleFilterChange}
                  />
                  <div className="costs__list-section">
                    {renderFilteredList(dateFilterResult)}
                  </div>
                </div>
                <div className="costs__list">
                  <h2>Wyszukaj po nazwie i NIP</h2>
                  <CostSearchFilter
                    data={costs}
                    onFilterChange={handleFilterChange}
                  />
                  <div className="costs__list-section">
                    {renderFilteredList(searchFilterResult)}
                  </div>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

export default Costs;
