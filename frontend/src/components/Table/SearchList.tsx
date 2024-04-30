import { Table } from './Table'
import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'

export function SearchList(){
    return (
        <div>
            <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3 bg-zinc-700">
                <Search className="size-4 text-amber-300" />
                <input className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm text-white" placeholder="Search" />
            </div>
            <Table>
                <thead>

                </thead>
                <tbody>

                </tbody>
                <tfoot>

                </tfoot>
            </Table>
        </div>
    )
}