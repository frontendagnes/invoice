import { useState, useMemo, useEffect, useCallback, useRef } from "react";

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const prevTotalPages = useRef(0);
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / itemsPerPage);
  }, [data, itemsPerPage]);

  const currentPageData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  }, [data, currentPage, itemsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }

    prevTotalPages.current = totalPages;
  }, [totalPages, currentPage]);

  const handlePageChange = useCallback((event, value) => {
    setCurrentPage(value);
  }, []);
  return {
    currentPage,
    currentPageData,
    totalPages,
    handlePageChange,
    setCurrentPage,
  };
};

export default usePagination;
