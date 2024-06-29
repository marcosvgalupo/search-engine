import { useState } from "react";

export interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  showing: number;
  setShowing: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  dataSize: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToLastPage: () => void;
  goToFirstPage: () => void;
}

export const usePagination = (totalItems: number, onPageChange: (page: number) => void): PaginationProps => {
  const [page, setPage] = useState(1);
  const [showing, setShowing] = useState(10);
  const totalPages = Math.ceil(totalItems / showing);
  const dataSize = totalItems;

  const goToNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      onPageChange(newPage);
    }
  };

  const goToLastPage = () => {
    setPage(totalPages);
    onPageChange(totalPages);
  };

  const goToFirstPage = () => {
    setPage(1);
    onPageChange(1);
  };

  return {
    page,
    setPage,
    showing,
    setShowing,
    totalPages,
    dataSize,
    goToNextPage,
    goToPreviousPage,
    goToLastPage,
    goToFirstPage,
  };
};
