import { useSales } from '../hooks/useSalesData';
import Pagination from './Pagination';
import { RiExternalLinkLine, RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';
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
        { key: 'transactionId', label: 'Transaction ID' },
        { key: 'date', label: 'Date', sortable: true, sortKey: 'date' as const },
        { key: 'customerId', label: 'Customer ID' },
        { key: 'customerName', label: 'Customer name', sortable: true, sortKey: 'customerName' as const },
        { key: 'phoneNumber', label: 'Phone Number' },
        { key: 'gender', label: 'Gender' },
        { key: 'age', label: 'Age' },
        { key: 'productCategory', label: 'Product Category' },
        { key: 'quantity', label: 'Quantity', sortable: true, sortKey: 'quantity' as const },
        { key: 'finalAmount', label: 'Final Amount (₹)' },
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
            return <div className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"><RiArrowUpSLine className="h-4 w-4" /></div>;
        }
        
        if (query.sortOrder === 'asc') {
            return <RiArrowUpSLine className="h-4 w-4 text-white" />;
        }
        return <RiArrowDownSLine className="h-4 w-4 text-white" />;
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
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-dark-table-header">
                        <tr>
                            {headers.map(header => (
                                <th
                                    key={header.key}
                                    className={`px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${header.sortable ? 'cursor-pointer group' : ''}`}
                                    onClick={header.sortable ? () => handleHeaderClick(header.sortKey!) : undefined}
                                >
                                    <div className="flex items-center space-x-1">
                                        <span>{header.label}</span>
                                        {header.sortable && <SortIcon sortKey={header.sortKey!} />}
                                    </div>
                                </th>
                            ))}
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {records.map((record) => (
                            <tr key={record._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.transactionId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatDate(record.date)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.customerId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.customerName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.phoneNumber}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.gender}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.age}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.productCategory}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">{record.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">₹{record.finalAmount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-primary-blue hover:text-blue-700">
                                        <RiExternalLinkLine className="h-5 w-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
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