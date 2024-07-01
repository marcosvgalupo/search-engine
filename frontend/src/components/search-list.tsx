import { Table } from './Table/table'
import React, { useCallback } from 'react';
import { TableRow } from './Table/table-row';
import { TableCell } from './Table/table-cell';
import { IconButton } from './icon-button';
import { PaginationProps } from '../hooks/usePagination';
import { SearchProps } from '../hooks/useSearch';



interface SearchListProps{
  search: SearchProps;  
  pagination: PaginationProps;
}

export function SearchList({search, pagination}: SearchListProps){


    const {page, showing, dataSize, goToNextPage, goToPreviousPage, goToLastPage, goToFirstPage,} = pagination
    
    const results = search.data.Hits
    const totalPages = Math.ceil(dataSize/10)


    const handleSearchClick = useCallback( () => {
      search.handleSearch(pagination.page);
    }, [search, pagination.page])

    function decodeHtmlEntities(input: string) {
      const noStrong = input.replace(/<\/?strong>/gi, ''); // Remove tags <strong> e </strong>
      const initialQuote = noStrong.startsWith('"') ? '"' : '';
      const finalQuote = noStrong.endsWith('"') ? '"' : '';
      const suggestArray = noStrong.split(" "); // Divide a string em um array de palavras
      const searchTermArray = search.searchTerm.split(" "); // Divide o termo de busca em um array de palavras
    
      return (
        <div className='text-sm'>
          <span className='text-[#fceaa1] my-5'>Including results for: </span>
          {initialQuote}
          {suggestArray.map((s, i) => {
            const searchTermIndex = searchTermArray.findIndex(term => s.toLowerCase().includes(term.toLowerCase()));
            if (searchTermIndex !== -1) {
              return (
                <span className="text-amber-300" key={i}>
                  {s.split(new RegExp(`(${searchTermArray[searchTermIndex]})`, 'gi')).map((part, index) =>
                    part.toLowerCase() === searchTermArray[searchTermIndex].toLowerCase() ?
                      <span className="texto-destacado" key={index}>{part}</span> :
                      <span key={index}>{part}</span>
                  )}
                </span>
              );
            } else {
              return (
                <span className="text-amber-300" key={i}>{s}</span>
              );
            }
          })}
          {finalQuote}
          <br />
          <span className='text-[#fceaa1]'>Search only for: {" "}
            <button className='hover:underline' onClick={() => handleSearchClick()}>
              {search.searchTerm}
            </button>
          </span>
        </div>
      );
    };
    
    



    return (
        <div className='w-full overflow-x-auto bg-zinc-800'>
          {
              search.data.suggest != null && search.data.suggest != "" ? 
              decodeHtmlEntities(search.data.suggest)
              : null
          }
          <Table className='min-w-full'>
            <tbody>
            {results.length > 0 ? results.map((d, index) => (
                 <React.Fragment key={index}>
                    <TableRow>
                        <TableCell colSpan={1} className='font-extrabold text-amber-300'>{d.title}</TableCell>
                        <TableCell colSpan={4}>
                              <a href={d.url} className='flex text-[#fceaa1] justify-end transition-colors duration-300 hover:text-amber-300 group' target='_blank'>
                                <div className='flex'>
                                  <span className='group-hover:border-[#fceaa1] border-b-[1px] border-transparent'>View More</span>
                                  <img src="src/icons/arrow-up-right.svg"/>
                                </div>
                              </a> 
                         </TableCell>
                    </TableRow>
                     <TableRow>
                         <TableCell colSpan={4}>{d.abs}</TableCell>
                    </TableRow>
                </React.Fragment>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-amber-300 py-4">
                  Not found
                </TableCell>
              </TableRow>
            )}
            </tbody>
            <tfoot>
            <tr>
                        <TableCell colSpan={3}>Showing {showing} of {dataSize} items</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                              {
                                results.length > 0 ? <span>Page {page} of {totalPages}</span> : <span>Page {page-1} of {totalPages}</span>
                              }
                                <div className='flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                       <img src="src/icons/chevrons-left.svg" alt="Chevrons Left" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <img src="src/icons/chevron-left.svg" alt="Chevron Left" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <img src="src/icons/chevron-right.svg" alt="Chevron Right" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <img src="src/icons/chevrons-right.svg" alt="Chevrons RIght" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </tr>
            </tfoot>
          </Table>
        </div>
      )
}