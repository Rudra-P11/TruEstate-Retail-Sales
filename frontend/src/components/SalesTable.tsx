import { useSales } from '../hooks/useSalesData';
import Pagination from './Pagination';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
import { ImSpinner2 } from 'react-icons/im';

const SalesTable = () => {
    const { 
        data: records, 
        loading, 
        error, 
        handlePagination, 
        pagination,
        query,
        handleSort
    } = useSales();
    
    const formatDate = (isoString: string) => {
        const date = new Date(isoString);
        if (isNaN(date.getTime())) return isoString; 
        
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };
    
    const headers = [
        { key: 'Transaction ID', label: 'Transaction ID' },
        { key: 'Date', label: 'Date', sortable: true, sortKey: 'date' as const },
        { key: 'Customer ID', label: 'Customer ID' },
        { key: 'Customer Name', label: 'Customer name', sortable: true, sortKey: 'customerName' as const },
        { key: 'Phone Number', label: 'Phone Number' },
        { key: 'Gender', label: 'Gender' },
        { key: 'Age', label: 'Age' },
        { key: 'Product Category', label: 'Product Category' },
        { key: 'Quantity', label: 'Quantity', sortable: true, sortKey: 'quantity' as const },
        { key: 'Total Amount', label: 'Total Amount' },
        { key: 'Customer Region', label: 'Customer region' },
        { key: 'Product ID', label: 'Product ID' },
        { key: 'Employee Name', label: 'Employee name' },
    ];
    
    const handleHeaderClick = (sortKey: 'date' | 'quantity' | 'customerName') => {
        let newOrder = 'desc';
        if (query.sortBy === sortKey) {
            newOrder = query.sortOrder === 'desc' ? 'asc' : 'desc';
        } else {
            newOrder = 'desc';
        }
        handleSort(sortKey, newOrder as 'asc' | 'desc');
    };
    
    const SortIcon = ({ sortKey }: { sortKey: 'date' | 'quantity' | 'customerName' }) => {
        if (query.sortBy !== sortKey) {
            return <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"><RiArrowUpSLine className="h-3 w-3" /></div>;
        }
        
        if (query.sortOrder === 'asc') {
            return <RiArrowUpSLine className="h-3 w-3 text-white" />;
        }
        return <RiArrowDownSLine className="h-3 w-3 text-white" />;
    };

    if (error) {
        return (
            <div className="text-center p-10 text-red-600 bg-red-50 border border-red-200 rounded-xl">
                <p className="font-semibold">Error Loading Data</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }
    
    const tableContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center h-48">
                    <ImSpinner2 className="animate-spin h-8 w-8 text-primary-blue" />
                    <span className="ml-3 text-lg text-gray-600">Loading data...</span>
                </div>
            );
        }
        
        if (records.length === 0) {
            return (
                <div className="text-center p-10 text-gray-500">
                    <p className="font-semibold">No Sales Records Found</p>
                    <p className="text-sm">Adjust your search or filter criteria.</p>
                </div>
            );
        }
        
        return (
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-800">
                        <tr>
                            {headers.map(header => (
                                <th
                                    key={header.key}
                                    className={`px-3 py-1.5 text-left text-xs font-medium text-white uppercase tracking-wider ${header.sortable ? 'cursor-pointer group' : ''}`}
                                    onClick={header.sortable ? () => handleHeaderClick(header.sortKey!) : undefined}
                                >
                                    <div className="flex items-center space-x-0.5">
                                        <span>{header.label}</span>
                                        {header.sortable && <SortIcon sortKey={header.sortKey!} />}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map((record) => (
                            <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs font-medium text-gray-900">{record['Transaction ID']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{formatDate(String(record.Date))}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Customer ID']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Customer Name']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">+91 {record['Phone Number']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record.Gender}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record.Age}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Product Category']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700 font-semibold">{String(record.Quantity).padStart(2, '0')}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">₹{Number(record['Total Amount']).toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Customer Region']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Product ID']}</td>
                                <td className="px-3 py-1.5 whitespace-nowrap text-xs text-gray-700">{record['Employee Name']}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            {tableContent()}
            
            <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePagination}
            />
        </div>
    );
};

export default SalesTable;