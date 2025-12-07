import { useSales } from '../hooks/useSalesData';
import { BiCube, BiMoney, BiSolidBadgeDollar } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';

const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const MetricCard: React.FC<{ title: string, value: string, subValue: string, icon: React.ElementType, iconColor: string, loading: boolean }> = ({
    title, value, subValue, icon: Icon, iconColor, loading
}) => (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-200 flex items-center justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            {loading ? (
                <ImSpinner2 className="animate-spin h-6 w-6 text-gray-400" />
            ) : (
                <>
                    <h3 className="text-2xl font-bold text-gray-900 mb-0.5">{value}</h3>
                    <p className="text-xs text-gray-500">{subValue}</p>
                </>
            )}
        </div>
        <div className={`p-3 rounded-full ${iconColor} bg-opacity-10`}>
            <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
    </div>
);

const MetricsPanel = () => {
    const { metrics, loading } = useSales();

    const totalUnitsSoldValue = metrics.totalUnitsSold.toLocaleString();
    const totalAmountValue = `₹${formatCurrency(metrics.totalAmount)}`;
    const totalDiscountValue = `₹${formatCurrency(metrics.totalDiscount)}`;
    
    const totalRecordsText = `${metrics.rawTotalRecords} SRs`;

    return (
        <div className="grid grid-cols-3 gap-6">
            <MetricCard 
                title="Total units sold" 
                value={totalUnitsSoldValue} 
                subValue={totalRecordsText} 
                icon={BiCube} 
                iconColor="text-blue-500" 
                loading={loading}
            />
            <MetricCard 
                title="Total Amount" 
                value={totalAmountValue} 
                subValue={totalRecordsText} 
                icon={BiMoney} 
                iconColor="text-green-500" 
                loading={loading}
            />
            <MetricCard 
                title="Total Discount" 
                value={totalDiscountValue} 
                subValue={totalRecordsText} 
                icon={BiSolidBadgeDollar} 
                iconColor="text-red-500" 
                loading={loading}
            />
        </div>
    );
};

export default MetricsPanel;