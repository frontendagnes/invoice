import { useState, useMemo, useEffect } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return {
    currentPage,
    currentPageData,
    totalPages,
    handlePageChange,
    setCurrentPage,
  };
};

export default usePagination;
