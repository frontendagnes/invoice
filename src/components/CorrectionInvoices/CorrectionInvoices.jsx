import { useCallback } from "react";
import "./CorrectionInvoices.css";

import useFirestore from "../../api/useFirestore/useFirestore";
import { useStateValue } from "../../state/StateProvider";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import useInvoiceSearchFilter from "../../hooks/useInvoiceSearchFilter";
import useDateFilter from "../../hooks/useDateFilter";
//mui
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
//components
import CorrectionsList from "./CorrectionsList";
import ValidationError from "../ValidationError/ValidationError";
import PaginationUX from "../PaginationUX/PaginationUX";
import Tooltip from "../Tooltip/Tooltip";

const ITEMS_PER_PAGE = 2;

function CorrectionInvoices({ data }) {
  const { deleteDocument } = useFirestore("invoices");
  const [{ selectedYear }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const { filterDate, setFilterDate, resetDate, filteredDataByDateAndYear } =
    useDateFilter(data, selectedYear);

  const { searchText, setSearchText, filteredDataBySearchAndYear } =
    useInvoiceSearchFilter(data, selectedYear);

  const { currentPage, currentPageData, totalPages, handlePageChange } =
    usePagination(filteredDataBySearchAndYear, ITEMS_PER_PAGE);

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

  if (!data.length)
    return (
      <div className="correctionInvoices__empty">
        <ValidationError text="Nie wystawiłeś jeszcze faktury korygującej" />
      </div>
    );
  return (
    <div className="correctionInvoices">
      <div className="correctionInvoices__search">
        <h2>Przeglądaj faktury po dacie:</h2>
        <div className="correctionsInvoice__searchDate">
          <div>
            <TextField
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              fullWidth
            />
          </div>
          <Tooltip text="Resetuj datę">
            <RemoveCircleIcon
              onClick={resetDate}
              color="error"
              fontSize="large"
              className="datefilter__button"
            />
          </Tooltip>
        </div>
        <CorrectionsList
          data={filteredDataByDateAndYear}
          openDetails={openDetails}
          deleteItem={deleteItem}
        />
      </div>
      <div className="correctionInvoices__search">
        <h2>Przeglądaj faktury korygujące:</h2>
        <div>
          <TextField
            name="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            id="search"
            label="Wyszukaj fakturę korygującą"
            variant="outlined"
            fullWidth
          />
        </div>
        <CorrectionsList
          data={currentPageData}
          openDetails={openDetails}
          deleteItem={deleteItem}
        />
        <PaginationUX
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default CorrectionInvoices;
