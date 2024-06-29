import { useState } from "react";
import { fetchApi } from "../connection/api";
import { DataElement } from "../components/search-input";

export interface SearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (page: number) => Promise<void>;
  data: DataElement;
}

export const useSearch = (setData: React.Dispatch<React.SetStateAction<DataElement>>): SearchProps => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setDataInternal] = useState<DataElement>({ Hits: [], suggest: "", total: 0 });

  const handleSearch = async (page: number) => {
    const responseData = await fetchApi(searchTerm, page);
    setData(responseData);
    setDataInternal(responseData);
  };

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
    data,
  };
};
