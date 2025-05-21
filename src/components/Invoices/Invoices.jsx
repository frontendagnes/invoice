import { useCallback, useState, memo } from "react";
import "./Invoices.css";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../assets/utility/StateProvider";

import useFirestore from "../../api/useFirestore/useFirestore.jsx";
//components
import InvoiceDateFilter from "./InvoiceDataFilter.jsx";
import InvoiceSearchFilter from "./InvoiceSearchFilter.jsx";
import InvoiceList from "./InvoiceList.jsx";
function Invoices({ data }) {
  const [{ user }, dispatch] = useStateValue();
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
  const handleFilterChange = useCallback((filterType, result) => {
    if (filterType === "date") {
      setDateFilterResult(result);
    } else if (filterType === "search") {
      setSearchFilterResult(result);
    }
  }, []);
  return (
    <div className="invoices">
      <InvoiceDateFilter onFilterChange={handleFilterChange} data={data} />
      <div className="invoices__list-section">
        <InvoiceList
          invoices={dateFilterResult.data}
          openDetails={openDetails}
          deleteItem={deleteItem}
          totalPages={dateFilterResult.totalPages}
          handlePageChange={dateFilterResult.handlePageChange}
          currentPage={dateFilterResult.currentPage}
        />
      </div>
      <InvoiceSearchFilter onFilterChange={handleFilterChange} data={data} />
      <div className="invoices__list-section">
        <InvoiceList
          invoices={searchFilterResult.data}
          openDetails={openDetails}
          deleteItem={deleteItem}
          totalPages={searchFilterResult.totalPages}
          handlePageChange={searchFilterResult.handlePageChange}
          currentPage={searchFilterResult.currentPage}
        />
      </div>
    </div>
  );
}

export default memo(Invoices);
