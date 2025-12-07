import { RiDashboardLine, RiUserLine, RiSettings2Line } from 'react-icons/ri';
import { BiCube, BiFolder } from 'react-icons/bi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { useState } from 'react';

const navigationItems = [
  { name: 'Dashboard', icon: RiDashboardLine, link: '#', current: true },
  { name: 'Nexus', icon: BiCube, link: '#', current: false },
  { name: 'Intake', icon: RiSettings2Line, link: '#', current: false },
];

const serviceItems = [
  { name: 'Pre-active', link: '#', count: 3 },
  { name: 'Active', link: '#', count: 7, active: true },
  { name: 'Blocked', link: '#', count: 2 },
  { name: 'Closed', link: '#', count: 18 },
];

const invoiceItems = [
  { name: 'Proforma Invoices', link: '#' },
  { name: 'Final Invoices', link: '#' },
];

const Sidebar = () => {
    const [isServicesOpen, setIsServicesOpen] = useState(true);
    const [isInvoicesOpen, setIsInvoicesOpen] = useState(true);

    const NavItem = ({ item, isActive = false }: { item: { name: string, link: string, icon?: React.ElementType, count?: number }, isActive?: boolean }) => (
        <a 
            href={item.link} 
            className={`flex items-center p-3 text-sm font-medium rounded-lg transition-colors duration-200 
                ${isActive ? 'bg-primary-blue text-white' : 'text-gray-700 hover:bg-gray-100'}`}
        >
            {item.icon && <item.icon className="h-5 w-5 mr-3" />}
            {item.name}
            {item.count !== undefined && (
                <span className={`ml-auto px-2 py-0.5 text-xs font-semibold rounded-full 
                    ${isActive ? 'bg-white text-primary-blue' : 'bg-gray-200 text-gray-700'}`}>
                    {item.count}
                </span>
            )}
        </a>
    );

    const SidebarHeader = () => (
        <div className="flex items-center p-4 border-b border-gray-200">
            <BiFolder className="h-6 w-6 text-primary-blue mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Vault</h1>
        </div>
    );

    const UserProfile = () => (
        <div className="p-4 flex items-center border-b border-gray-200">
            <RiUserLine className="h-8 w-8 text-gray-500 p-1 bg-gray-200 rounded-full mr-3" />
            <div>
                <p className="text-sm font-semibold text-gray-900">Anurag Yadav</p>
            </div>
        </div>
    );

    return (
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
            <SidebarHeader />
            <UserProfile />
            
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-140px)] scrollbar-thin">
                
                <nav className="space-y-1">
                    {navigationItems.map(item => (
                        <NavItem key={item.name} item={item} isActive={item.current} />
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
                                <NavItem key={item.name} item={item} isActive={!!item.active} />
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