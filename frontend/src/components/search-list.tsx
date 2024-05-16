import { Table } from './Table/table'
import { DataElement } from './search-input'
import React, {useState } from 'react';
import { TableRow } from './Table/table-row';
import { TableCell } from './Table/table-cell';
import { IconButton } from './icon-button';



interface SearchListProps{
    data: DataElement[];
}


export function SearchList({data}: SearchListProps){

    const totalPages = Math.ceil(data.length/10)

    const [page, setPage] = useState(1);


    function goToNextPage(){
      setPage(page+1)
    }

    function goToPreviousPage() { 
      setPage(page-1) 
    }

    function goToLastPage() { 
      setPage(totalPages) 
    }

    function goToFirstPage() { 
      setPage(1) 
    }





    return (
        <div className='w-full overflow-x-auto bg-zinc-800'>
          <Table className='min-w-full'>
            <tbody>
            {data.slice( (page-1) * 10, page * 10).map((d, index) => (
                 <React.Fragment key={index}>
                    <TableRow>
                        <TableCell colSpan={1} className='font-extrabold text-amber-300'>{d.title}</TableCell>
                        <TableCell colSpan={4}>
                              <a href={d.url} className='flex text-[#fceaa1] justify-end transition-colors duration-300 hover:text-yellow-300' target='_blank'>
                                <div className='flex transition-colors duration-300 hover:text-yellow-300'>
                                  <span>View More</span>
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
                        <TableCell colSpan={3}>Showing {page} of {data.length} items</TableCell>
                        <TableCell className="text-right" colSpan={3}>
                            <div className='inline-flex items-center gap-8'>
                                <span>Page {page} of {totalPages}</span>
                                <div className='flex gap-1.5'>
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                       <img src="src/icons/chevrons-left.svg" alt="Chevrons Left" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <img src="src/icons/chevron-left.svg" alt="Chevron Left" /> {/** size 4 */}
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