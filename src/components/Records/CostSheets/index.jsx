import { useMemo } from "react";
import { getFilteredAndSortedDocuments } from "../../../utility/documentFiltres";
import usePaginatedTable from "../../../hooks/usePaginatedTable";
import usePrintMode from "../usePrintMode";
// MUI
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
//components
import TableCaption from "../TableElements/TableCaption";
import EmptyRow from "../TableElements/EmptyRow";
import TableFoot from "../TableElements/TableFoot";
import CostRow from "./CostRow";

function CostSheets({
  selectedMonthNumber,
  calculateCostsForMonth,
  costs,
  selectedYear,
}) {
  const isPrintMode = usePrintMode();

  const filteredAndSortedCosts = useMemo(() => {
    return getFilteredAndSortedDocuments(
      costs,
      selectedYear,
      selectedMonthNumber
    );
  }, [costs, selectedYear, selectedMonthNumber]);

  const {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginatedTable({
    data: filteredAndSortedCosts,
    isPrintMode,
  });

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer component={Paper} className="table__wrapper">
        <Table className="table__responsive">
          <TableCaption
            calculateFunction={calculateCostsForMonth}
            selectedMonthNumber={selectedMonthNumber}
          />
          <TableHead>
            <TableRow>
              <TableCell className="table__singular">Lp.</TableCell>
              <TableCell>Numer Faktury</TableCell>
              <TableCell>Kontrahent</TableCell>
              <TableCell>Data wystawienia</TableCell>
              <TableCell>Wartość brutto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <EmptyRow colSpan={5} />
            ) : (
              paginatedData.map((item, index) => (
                <CostRow key={item.id || index} item={item} index={index} />
              ))
            )}
          </TableBody>
          <TableFoot
            calculateFunction={calculateCostsForMonth}
            selectedMonthNumber={selectedMonthNumber}
            colSpan={4}
            totalCount={filteredAndSortedCosts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}

export default CostSheets;
