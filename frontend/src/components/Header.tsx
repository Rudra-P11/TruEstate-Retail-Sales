import { RiSearchLine } from 'react-icons/ri';
import { useSales } from '../hooks/useSalesData';
import { useState, useEffect } from 'react';

const Header = () => {
    const { handleSearch, query } = useSales();
    const [searchTerm, setSearchTerm] = useState(query.search);

    useEffect(() => {
        setSearchTerm(query.search);
    }, [query.search]);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };



    return (
        <header className="flex justify-between items-center p-3 bg-white border-b border-gray-200 flex-shrink-0">
            
            <h2 className="text-lg font-semibold text-gray-900">Sales Management System</h2>
            
            <form className="relative" onSubmit={onSearchSubmit}>
                <input
                    type="text"
                    placeholder="Name, Phone no."
                    value={searchTerm}
                    onChange={onSearchChange}
                    className="pl-9 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-blue w-56"
                />
                <RiSearchLine className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            </form>
        </header>
    );
};

export default Header;