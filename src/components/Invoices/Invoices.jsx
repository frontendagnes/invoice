import { useCallback, useState, memo, useEffect } from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../state/StateProvider";

import useFirestore from "../../api/useFirestore/useFirestore.jsx";
//components
import InvoiceDateFilter from "./InvoiceDataFilter.jsx";
import InvoiceSearchFilter from "./InvoiceSearchFilter.jsx";
import InvoiceList from "./InvoiceList.jsx";
function Invoices({ data }) {
  const [allCorrections, setAllCorrections] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const { deleteDocument, getData: getCorrectionsData } =
    useFirestore("invoices");

  useEffect(() => {
    if (!user) return;
    getCorrectionsData("invoiceCorrections", null, null, setAllCorrections);
  }, [user]);

  const [filterResult, setFilterResult] = useState({
    data: [],
    totalPages: 1,
    handlePageChange: () => {},
    currentPage: 1,
    setPage: () => {},
  });
  const navigate = useNavigate();

  const openDetails = useCallback(
    (details) => {
      navigate(`/invoices/${details}`);
    },
    [navigate]
  );

  const deleteItem = async (itemId) => {
    await deleteDocument("invoice", itemId);
    dispatch({ type: "ALERT_DELETE" });
  };

  const openCorrectionDetails = useCallback(
    (details) => {
      navigate(`/correction-invoices/${details}`);
    },
    [navigate]
  );

  const deleteCorrection = useCallback(
    async (idDoc) => {
      await deleteDocument("invoiceCorrections", idDoc);
      dispatch({ type: "ALERT_DELETE" });
    },
    [deleteDocument, dispatch]
  );
  const handleFilterChange = useCallback((filterType, result) => {
    //filterType can be unused, but it must be present in the function signature if the children pass it on
    setFilterResult(result);
  }, []);
  return (
    <div className="invoices">
      <h2>Filtruj Faktury</h2>
      <InvoiceDateFilter onFilterChange={handleFilterChange} data={data} />
      <InvoiceSearchFilter onFilterChange={handleFilterChange} data={data} />
      <div className="invoices__list-section">
        <InvoiceList
          invoices={filterResult.data}
          openDetails={openDetails}
          deleteItem={deleteItem}
          totalPages={filterResult.totalPages}
          handlePageChange={filterResult.handlePageChange}
          currentPage={filterResult.currentPage}
          allCorrections={allCorrections}
          openCorrectionDetails={openCorrectionDetails}
          deleteCorrection={deleteCorrection}
        />
      </div>
    </div>
  );
}

export default memo(Invoices);

