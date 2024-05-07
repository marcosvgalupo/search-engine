import { Table } from './table'
import { DataElement } from '../search-input'
import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import React, { ComponentProps } from 'react';
import { TableRow } from './table-row';
import { TableCell } from './table-cell';



interface SearchListProps{
    data: DataElement[];
}


export function SearchList({data}: SearchListProps){
    return (
        <div>
          <Table>
            <tbody>
            {data.slice(0,10).map((d, index) => (
                 <React.Fragment key={index}>
                    <TableRow>
                        <TableCell colSpan={1} className='font-extrabold text-amber-300'>{d.title}</TableCell>
                        <TableCell>
                              <a href={d.url} className='flex text-[#fceaa1] justify-end transition-colors duration-300 hover:text-yellow-300' target='_blank'>
                                <div className='flex transition-colors duration-300 hover:text-yellow-300'>
                                  <span>View More</span>
                                  <img src="src/icons/arrow-up-right.svg"/>
                                </div>
                              </a> 
                         </TableCell>
                    </TableRow>
                     <TableRow>
                         <TableCell colSpan={2}>{d.abs}</TableCell>
                    </TableRow>
                </React.Fragment>
            ))}
            </tbody>
            <tfoot>
              
            </tfoot>
          </Table>
        </div>
      )
}