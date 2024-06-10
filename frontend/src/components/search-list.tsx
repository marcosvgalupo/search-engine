import { Table } from './Table/table'
import { DataElement } from './search-input'
import React, {useState } from 'react';
import { TableRow } from './Table/table-row';
import { TableCell } from './Table/table-cell';
import { IconButton } from './icon-button';



interface SearchListProps{
    data: DataElement;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    showing: number;
    setShowing: React.Dispatch<React.SetStateAction<number>>;
}


export function SearchList({data, page, setPage, showing, setShowing}: SearchListProps){
    
    const results = data.Hits
    const totalPages = Math.ceil(results.length/10)


    function goToNextPage(){
      setPage(page+1)
      if(page == totalPages)
        setShowing((results.length - showing) + showing);
      else
        setShowing(showing + 10);
    }

    function goToPreviousPage() { 
      setPage(page-1)
      setShowing(showing-10); 
    }

    function goToLastPage() { 
      setPage(totalPages)
      setShowing(results.length) 
    }

    function goToFirstPage() { 
      setPage(1)
      setShowing(results.length/totalPages) 
    }


    return (
        <div className='w-full overflow-x-auto bg-zinc-800'>
          <p className='text-amber-300'>
            {
              data.suggest != null || data.suggest != "" ? data.suggest : null
            }
          </p>
          <Table className='min-w-full'>
            <tbody>
            {results.slice( (page-1) * 10, page * 10).map((d, index) => (
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
                        <TableCell colSpan={3}>Showing {showing} of {results.length} items</TableCell>
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