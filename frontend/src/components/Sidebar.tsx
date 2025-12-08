import { RiDashboardLine, RiUserLine, RiSettings2Line, RiSearchLine, RiArrowDropDownLine, RiLogoutBoxLine } from 'react-icons/ri';
import { BiCube, BiFolder } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navigationItems = [
  { name: 'Dashboard', icon: RiDashboardLine, link: '/dashboard', current: false },
  { name: 'Nexus', icon: BiCube, link: '#', current: false },
  { name: 'Intake', icon: RiSettings2Line, link: '#', current: false },
];

const serviceItems = [
  { name: 'Pre-active', link: '/services/pre-active' },
  { name: 'Active', link: '/services/active' },
  { name: 'Blocked', link: '/services/blocked' },
  { name: 'Closed', link: '/services/closed' },
];

const invoiceItems = [
  { name: 'Proforma Invoices', link: '/invoices/proforma', active: true },
  { name: 'Final Invoices', link: '/invoices/final', hasSearch: true },
];

const Sidebar = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(true);
    const [isInvoicesOpen, setIsInvoicesOpen] = useState(true);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const location = useLocation();

    const NavItem = ({ item }: { item: { name: string, link: string, icon?: React.ElementType, count?: number, active?: boolean, hasSearch?: boolean } }) => {
        const isActive = item.link !== '#' && (location.pathname === item.link || location.pathname.startsWith(item.link + '/'));
        
        return (
            <Link 
                to={item.link} 
                className={`flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors duration-200 
                    ${isActive ? 'bg-primary-blue text-white font-bold' : 'text-gray-700 font-medium hover:bg-gray-100'}`}
            >
                <span className="flex items-center flex-1">
                    {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                    {item.name}
                </span>
                {item.hasSearch && (
                    <RiSearchLine className={`h-4 w-4 ml-2 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                )}
            </Link>
        );
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.href = '/';
    };

    const VaultProfile = () => (
        <div className="bg-white border-b border-gray-200">
            <div className="px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                    <BiFolder className="h-4 w-4 text-primary-blue mr-2 flex-shrink-0" />
                    <h2 className="text-xs font-bold text-gray-800">Vault</h2>
                </div>
            </div>
            
            <div className="border-t border-gray-200 px-3 py-2.5 flex items-center justify-between">
                <div className="flex items-center flex-1 min-w-0">
                    <RiUserLine className="h-5 w-5 text-gray-500 p-0.5 bg-gray-200 rounded-full mr-2 flex-shrink-0" />
                    <p className="text-xs font-semibold text-gray-900 truncate">Anurag Yadav</p>
                </div>
                <div className="relative ml-2">
                    <button 
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="p-0.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                    >
                        <RiArrowDropDownLine className={`h-3.5 w-3.5 text-gray-600 transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {isProfileOpen && (
                        <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <div className="space-y-0.5 p-1.5">
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
        </div>
    );

    return (
        <div className="w-56 bg-sidebar-bg border-r border-gray-200 flex-shrink-0 flex flex-col">
            <VaultProfile />
            
            <div className="p-4 space-y-3">
                
                <nav className="space-y-1">
                    {navigationItems.map(item => (
                        <NavItem key={item.name} item={{...item, active: item.current}} />
                    ))}
                </nav>
                
                <div>
                    <button 
                        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-500 hover:text-gray-900"
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                    >
                        Services
                        {isServicesOpen ? <IoIosArrowUp className="h-4 w-4" /> : <IoIosArrowDown className="h-4 w-4" />}
                    </button>
                    {isServicesOpen && (
                        <div className="pl-3 space-y-1">
                            {serviceItems.map(item => (
                                <NavItem key={item.name} item={item} />
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <button 
                        className="flex w-full items-center justify-between py-2 text-sm font-semibold text-gray-500 hover:text-gray-900"
                        onClick={() => setIsInvoicesOpen(!isInvoicesOpen)}
                    >
                        Invoices
                        {isInvoicesOpen ? <IoIosArrowUp className="h-4 w-4" /> : <IoIosArrowDown className="h-4 w-4" />}
                    </button>
                    {isInvoicesOpen && (
                        <div className="pl-3 space-y-1">
                            {invoiceItems.map(item => (
                                <NavItem key={item.name} item={item} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
