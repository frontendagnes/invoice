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
// Components
import TableCaption from "../TableElements/TableCaption";
import EmptyRow from "../TableElements/EmptyRow";
import TableFoot from "../TableElements/TableFoot";
import IncomeRow from "./IncomeRow";

function IncomeSheets({
  calculateIncomeForMonth,
  selectedMonthNumber,
  data,
  cumulativeIncome,
  selectedYear,
}) {
  const isPrintMode = usePrintMode();

  const filteredAndSortedData = useMemo(() => {
    return getFilteredAndSortedDocuments(
      data,
      selectedYear,
      selectedMonthNumber
    );
  }, [data, selectedYear, selectedMonthNumber]);

  const {
    page,
    rowsPerPage,
    paginatedData,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePaginatedTable({
    data: filteredAndSortedData,
    isPrintMode,
  });

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto" }}
        className="table__wrapper"
      >
        <Table className="table__responsive">
          <TableCaption
            calculateFunction={calculateIncomeForMonth}
            selectedMonthNumber={selectedMonthNumber}
          />
          <TableHead>
            <TableRow>
              <TableCell>Lp.</TableCell>
              <TableCell>Numer Dokumentu</TableCell>
              <TableCell>Kontrahent</TableCell>
              <TableCell>Data Wystawienia</TableCell>
              <TableCell>Wartość Dokumentu</TableCell>
              <TableCell>Wartość narastająco</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <EmptyRow colSpan={6} />
            ) : (
              paginatedData.map((item, index) => (
                <IncomeRow
                  key={item.id || index}
                  item={item}
                  index={isPrintMode ? index : page * rowsPerPage + index}
                  cumulativeIncome={cumulativeIncome}
                />
              ))
            )}
          </TableBody>

          <TableFoot
            calculateFunction={calculateIncomeForMonth}
            selectedMonthNumber={selectedMonthNumber}
            colSpan={5}
            totalCount={filteredAndSortedData.length}
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

export default IncomeSheets;
