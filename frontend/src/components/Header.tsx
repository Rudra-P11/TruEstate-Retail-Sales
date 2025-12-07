import { RiSearchLine, RiNotification3Line, RiUser3Line, RiLogoutBoxLine, RiSettings3Line } from 'react-icons/ri';
import { useSales } from '../hooks/useSalesData';
import { useState, useRef, useEffect } from 'react';

const Header = () => {
    const { handleSearch, query } = useSales();
    const [searchTerm, setSearchTerm] = useState(query.search);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setSearchTerm(query.search);
    }, [query.search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const onSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSearch(searchTerm);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    return (
        <header className="flex justify-between items-center p-3 bg-white border-b border-gray-200 flex-shrink-0">
            
            <h2 className="text-lg font-semibold text-gray-900">Sales Management System</h2>
            
            <div className="flex items-center space-x-6">
                
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
                
                <RiNotification3Line className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary-blue transition-colors" title="Notifications" />
                
                <div className="relative" ref={profileRef}>
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary-blue transition-colors"
                        title="Profile"
                    >
                        <RiUser3Line className="h-5 w-5" />
                    </button>
                    
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="p-3 border-b border-gray-200">
                                <p className="text-xs font-semibold text-gray-900">Anurag Yadav</p>
                                <p className="text-xs text-gray-500">anurag.yadav@company.com</p>
                            </div>
                            <div className="space-y-0.5 p-1.5">
                                <button className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                    <RiSettings3Line className="h-3.5 w-3.5" />
                                    <span>Profile Settings</span>
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    <RiLogoutBoxLine className="h-3.5 w-3.5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;