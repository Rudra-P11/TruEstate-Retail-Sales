import { RiSearchLine, RiNotification3Line, RiUser3Line } from 'react-icons/ri';

const Header = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-white border-b border-gray-200 flex-shrink-0">
            
            <h2 className="text-xl font-semibold text-gray-900">Sales Management System</h2>
            
            <div className="flex items-center space-x-4">
                
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Name, Phone no."
                        className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-blue w-64"
                    />
                    <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                
                <RiNotification3Line className="h-6 w-6 text-gray-500 cursor-pointer hover:text-primary-blue" />
                <RiUser3Line className="h-6 w-6 text-gray-500 cursor-pointer hover:text-primary-blue" />
            </div>
        </header>
    );
};

export default Header;