import { RiSearchLine, RiNotification3Line, RiUser3Line } from 'react-icons/ri';
import { useSales } from '../hooks/useSalesData';
import { useState } from 'react';

const Header = () => {
    const { handleSearch, query } = useSales();
    const [searchTerm, setSearchTerm] = useState(query.search);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    return (
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 flex-shrink-0">
            
            <h2 className="text-xl font-semibold text-gray-900">Sales Management System</h2>
            
            <div className="flex items-center space-x-4">
                
                <form className="relative" onSubmit={onSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Name, Phone no."
                        value={searchTerm}
                        onChange={onSearchChange}
                        className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-blue w-64"
                    />
                    <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
                
                <RiNotification3Line className="h-6 w-6 text-gray-500 cursor-pointer hover:text-primary-blue" />
                <RiUser3Line className="h-6 w-6 text-gray-500 cursor-pointer hover:text-primary-blue" />
            </div>
        </header>
    );
};

export default Header;