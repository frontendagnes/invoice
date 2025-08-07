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

function Costs() {
  const [{ costs }, dispatch] = useStateValue();
  const { deleteDocument } = useFirestore("invoices");

  const [viewAddCost, setViewAddCost] = useState(false);

  const [filterResult, setFilterResult] = useState({
    data: costs ?? [],
    totalPages: 1,
    currentPage: 1,
    handlePageChange: () => {},
    setPage: () => {},
  });

  const deleteItem = async (itemId) => {
    await deleteDocument("costs", itemId);
    dispatch({ type: "ALERT_DELETE" });
  };

  const handleFilterChange = useCallback((filterType, result) => {
    //filterType can be unused, but it must be present in the function signature if the children pass it on
    setFilterResult(result);
  }, []);

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
        <h2>Filtruj koszty</h2>
        <CostDateFilter data={costs} onFilterChange={handleFilterChange} />
        <CostSearchFilter data={costs} onFilterChange={handleFilterChange} />
      </div>

      <div className="costs__list-section">
        <CostsList
          costs={filterResult.data}
          deleteItem={deleteItem}
          totalPages={filterResult.totalPages}
          currentPage={filterResult.currentPage}
          handlePageChange={filterResult.handlePageChange}
        />
      </div>
    </div>
  );
}

export default Costs;