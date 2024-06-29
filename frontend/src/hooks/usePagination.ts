  import { useState } from "react";

  export interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    showing: number;
    setShowing: React.Dispatch<React.SetStateAction<number>>;
    dataSize: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    goToLastPage: () => void;
    goToFirstPage: () => void;
  }

  export const usePagination = (totalItems: number, onPageChange: (page: number) => void): PaginationProps => {
    const [page, setPage] = useState(1);
    const [showing, setShowing] = useState(10);
    const totalPages = Math.ceil(totalItems / 10);
    const dataSize = totalItems;
    const shortData = (dataSize - showing) + showing

    const goToNextPage = () => {
      console.log(page)
      if (page < totalPages) {
        const newPage = page + 1;
        setPage(newPage);
        onPageChange(newPage);
        console.log(page)
      }
      if(page == totalPages)
        setShowing(shortData);
      else
        setShowing(Math.ceil(showing + 10));
    };

    const goToPreviousPage = () => {
      if (page > 1) {
        const newPage = page - 1;
        setPage(newPage);

        if(showing % 10 == 0)
          setShowing(showing-10);
        else
          setShowing(showing - (showing % 10))

        onPageChange(newPage);
      }
    };

    const goToLastPage = () => {
      setPage(totalPages);
      setShowing(dataSize) 
      onPageChange(totalPages);
    };

    const goToFirstPage = () => {
      setPage(1);
      setShowing(Math.ceil(dataSize/totalPages))
      onPageChange(1);
    };

    return {
      page,
      setPage,
      showing,
      setShowing,
      dataSize,
      goToNextPage,
      goToPreviousPage,
      goToLastPage,
      goToFirstPage,
    };
  };
