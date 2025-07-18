import React from "react";
import { Pagination, Stack } from "@mui/material";

function PaginationUX({
  totalPages,
  currentPage,
  handlePageChange,
  className,
}) {
  return (
    <>
      {totalPages > 1 && (
        <Stack
          alignItems="center"
          mt={2}
          sx={{ overflowX: "auto" }}
          className={className}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      )}
    </>
  );
}

export default PaginationUX;
