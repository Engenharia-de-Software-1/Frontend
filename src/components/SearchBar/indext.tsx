import { Input } from "../Input"

interface ISearchBarProps{
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}

function SearchBar({searchQuery, setSearchQuery}: ISearchBarProps){
    const handleQueryChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    return(
        <div className='relative my-5'>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <i className="ri-search-line w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden='true'></i>
            </div>
            <Input
                type="search" 
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900
                        border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500
                        focus:border-green-500 dark:bg-gray-50 dark:border-gray-600
                        dark:placeholder-gray-400 dark:focus:ring-green-500 
                        dark:focus:border-green-500" 
                placeholder="Pesquise por nome"
                value={searchQuery}
                onChange={(e) => {handleQueryChange(e)}}
                required
            />
        </div>
    )
}

export default SearchBar
