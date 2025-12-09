import { useCallback, useState, useEffect } from "react";
import "./Invoices.css";

import { useNavigate } from "react-router-dom";
import useFirestore from "../../api/useFirestore/useFirestore.jsx";
import { useStateValue } from "../../state/StateProvider";
import useInvoiceFilters from "../../hooks/useInvoiceFilters.jsx";

//components
import InvoiceDateFilter from "./InvoiceDataFilter.jsx";
import InvoiceSearchFilter from "./InvoiceSearchFilter.jsx";
import InvoiceList from "./InvoiceList.jsx";
function Invoices({ data }) {
  const [allCorrections, setAllCorrections] = useState([]);
  const [{ selectedYear, user }, dispatch] = useStateValue();
  const { deleteDocument, getData: getCorrectionsData } =
    useFirestore("invoices");
  const {
    search,
    setSearch,
    filterDate,
    setFilterDate,
    resetDate,
    currentPage,
    totalPages,
    handlePageChange,
    currentPageData,
  } = useInvoiceFilters(data, selectedYear);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    getCorrectionsData("invoiceCorrections", null, null, setAllCorrections);
  }, [user]);

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
  return (
    <div className="invoices">
      <h2>Filtruj Faktury</h2>
      <InvoiceDateFilter
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        resetDate={resetDate}
      />
      <InvoiceSearchFilter searchText={search} setSearchText={setSearch} />
      <InvoiceList
        invoices={currentPageData}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        openDetails={openDetails}
        deleteItem={deleteItem}
        allCorrections={allCorrections}
        openCorrectionDetails={openCorrectionDetails}
        deleteCorrection={deleteCorrection}
      />
    </div>
  );
}
export default Invoices;

