import { useState, useCallback } from "react";
import "./Costs.css";
import { useStateValue } from "../../state/StateProvider";
import useFirestore from "../../api/useFirestore/useFirestore";
import { AnimatePresence } from "framer-motion";
//mui
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

//components
import CostsList from "./CostsLists/CostsList.jsx";
import CostDateFilter from "./CostsFilter/CostDateFilter.jsx";
import CostSearchFilter from "./CostsFilter/CostSearchFilter.jsx";
import ModalAddCost from "./ModalAddCost/ModalAddCost.jsx";

const filterObject = {
  data: [],
  totalPages: 1,
  handlePageChange: () => {},
  currentPage: 1,
  setPage: () => {},
};

function Costs() {
  const [{ costs }, dispatch] = useStateValue();
  const { deleteDocument } = useFirestore("invoices");
  const [viewAddCost, setViewAddCost] = useState(false);

  const [dateFilterResult, setDateFilterResult] = useState(filterObject);
  const [searchFilterResult, setSearchFilterResult] = useState(filterObject);

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
      <div className="costs__modal">
        <div className="costs__action">
          <Button
            variant="outlined"
            onClick={() => setViewAddCost(true)}
            endIcon={<AddCircleIcon />}
          >
            Dodaj Koszt
          </Button>
        </div>
        <AnimatePresence>
          {viewAddCost && (
            <ModalAddCost
              isViewAddCost={viewAddCost}
              setIsViewAddCost={setViewAddCost}
            />
          )}
        </AnimatePresence>
      </div>
      <div className="costs__filter">
        <div className="costs__list">
          <h2>Wyszukaj faktury wg daty </h2>
          <CostDateFilter data={costs} onFilterChange={handleFilterChange} />
          <div className="costs__list-section">
            {renderFilteredList(dateFilterResult)}
          </div>
        </div>
        <div className="costs__list">
          <h2>Wyszukaj po nazwie i NIP</h2>
          <CostSearchFilter data={costs} onFilterChange={handleFilterChange} />
          <div className="costs__list-section">
            {renderFilteredList(searchFilterResult)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Costs;
