import { useState, useCallback } from "react";
import "./CorrectionInvoices.css";
import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../state/StateProvider";
import { useNavigate } from "react-router-dom";
//components
import CorrectionsList from "./CorrectionsList";
import PaginationUX from "../PaginationUX/PaginationUX";
import CorrectionDateFilter from "./CorrectionFilters/CorrectionDateFilter";
import CorrectionSearchFilter from "./CorrectionFilters/CorrectionSearchFilter";

function CorrectionInvoices({ data }) {
  const { deleteDocument } = useFirestore("invoices");
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  const [filterResult, setFilterResult] = useState({
    data: data ?? [],
    totalPages: 1,
    currentPage: 1,
    handlePageChange: () => {},
    setPage: () => {},
  });

  const handleFilterChange = useCallback((result) => {
    setFilterResult(result);
  }, []);

  const openDetails = useCallback(
    (details) => {
      navigate(`/correction-invoices/${details}`);
    },
    [navigate]
  );

  const deleteItem = useCallback(
    async (idDoc) => {
      await deleteDocument("invoiceCorrections", idDoc);
      dispatch({ type: "ALERT_DELETE" });
    },
    [deleteDocument, dispatch]
  );
  return (
    <div className="correctionInvoices">
      <h2>Filtruj faktury korygujące</h2>
      <div className="correctionInvoices__filters">
        <CorrectionDateFilter data={data} onFilterChange={handleFilterChange} />
        <CorrectionSearchFilter
          data={data}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="correctionInvoices__list">
        <CorrectionsList
          data={filterResult.data}
          openDetails={openDetails}
          deleteItem={deleteItem}
        />
        <PaginationUX
          totalPages={filterResult.totalPages}
          currentPage={filterResult.currentPage}
          handlePageChange={filterResult.handlePageChange}
        />
      </div>
    </div>
  );
}

export default CorrectionInvoices;
