import {Search} from 'lucide-react'

export function SearchInput(){
    return (
        <div style={{width: "30em", boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)"}} className="px-3 h-12 py-1.5 border border-white/10 rounded-full text-sm flex items-center gap-3 bg-zinc-800 outline-none shadow-slate-50">
            <Search className="size-5 text-amber-300" />
            <input className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm text-white text-lg placeholder-[#fceaa1]" placeholder="Search..." />
        </div>
    )
}