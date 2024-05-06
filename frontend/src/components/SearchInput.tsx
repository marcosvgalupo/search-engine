// SearchInput.tsx
import React, { useState } from "react";
import { fetchApi } from "../connection/api";

export function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    console.log(searchTerm);
    fetchApi(searchTerm);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Impede o envio do formulário padrão
      handleSearch();
    }
  };

  return (
    <form
      style={{ width: "30em", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)" }}
      className="px-3 h-12 py-1.5 border border-white/10 rounded-full text-sm flex items-center gap-3 bg-zinc-800 outline-none shadow-slate-50"
    >
      <input
        id="search-input"
        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm text-white text-lg placeholder-[#fceaa1]"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="button" className="flex items-center" onClick={handleSearch}>
        <img src="src/icons/search-icon.svg" alt="Search Icon" />
      </button>
    </form>
  );
}
