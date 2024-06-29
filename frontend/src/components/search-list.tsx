import { Table } from './Table/table'
import { DataElement } from './search-input'
import React, {useState } from 'react';
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

    return (
        <div className='w-full overflow-x-auto bg-zinc-800'>
          <p className='text-amber-300'>
            {
              search.data.suggest != null || search.data.suggest != "" ? search.data.suggest : null
            }
          </p>
          <Table className='min-w-full'>
            <tbody>
            {results.map((d, index) => (
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
            ))}
            </tbody>
            <tfoot>
            <tr>
                        <TableCell colSpan={3}>Showing {showing} of {dataSize} items</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <span>Page {page} of {totalPages}</span>
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