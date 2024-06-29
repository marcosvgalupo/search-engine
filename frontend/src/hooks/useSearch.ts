import { useState } from "react";
import { fetchApi } from "../connection/api";

export interface DataElement{
  Hits: Hits[]
  suggest: string
  total: number
}

export interface Hits{
title: string;
url: string;
abs: string;
}


export interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  data: DataElement;
  setData: React.Dispatch<React.SetStateAction<DataElement>>;
  handleSearch: (page: number) => Promise<void>;
}

export function useSearch(empty: DataElement): SearchProps{
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<DataElement>(empty);

  const handleSearch = async (page: number) => {
    const responseData = await fetchApi(searchTerm, page);
    setData(responseData);
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    data,
    setData
  };
};
