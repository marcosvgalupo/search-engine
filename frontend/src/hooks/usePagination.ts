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
    let showingSize;
    if(totalItems < 10)
      showingSize = totalItems;
    else
      showingSize = 10;
    const [showing, setShowing] = useState(showingSize);
    const totalPages = Math.ceil(totalItems / 10);
    const dataSize = totalItems;
    const shortData = (dataSize - showing) + showing

    const goToNextPage = () => {
      if (page < totalPages) {
        const newPage = page + 1;
        console.log("a")
        setPage(newPage);
        onPageChange(newPage);
      }
      if(page == totalPages){
        setShowing(shortData);
        console.log("b")
      } 
      else{
        if(showing+10 > dataSize)
          setShowing(showing + (dataSize - showing))
        else
          setShowing(Math.ceil(showing + 10));
        console.log("c")
      }
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
