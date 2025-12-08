import { useSales } from '../hooks/useSalesData';
import { BiCube, BiMoney, BiSolidBadgeDollar } from 'react-icons/bi';
import { ImSpinner2 } from 'react-icons/im';
import { RiInformationLine } from 'react-icons/ri';

const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
};

const MetricCard: React.FC<{ title: string, value: string, icon: React.ElementType, iconColor: string, loading: boolean }> = ({
    title, value, loading
}) => (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-start justify-between">
        <div className="flex-1">
            <div className="flex items-center space-x-1.5 mb-2">
                <p className="text-xs font-medium text-gray-600">{title}</p>
                <RiInformationLine className="h-3 w-3 text-gray-400 flex-shrink-0" />
            </div>
            {loading ? (
                <ImSpinner2 className="animate-spin h-4 w-4 text-gray-400" />
            ) : (
                <h3 className="text-base font-bold text-gray-900">{value}</h3>
            )}
        </div>
    </div>
);

const MetricsPanel = () => {
    const { metrics, loading } = useSales();

    const totalUnitsSoldValue = metrics.totalUnitsSold.toLocaleString();
    const totalAmountValue = `₹${formatCurrency(metrics.totalAmount)}`;
    const totalDiscountValue = `₹${formatCurrency(metrics.totalDiscount)}`;

    return (
        <div className="flex gap-3 w-fit">
            <MetricCard 
                title="Total units sold" 
                value={totalUnitsSoldValue} 
                icon={BiCube} 
                iconColor="text-blue-500" 
                loading={loading}
            />
            <MetricCard 
                title="Total Amount" 
                value={totalAmountValue} 
                icon={BiMoney} 
                iconColor="text-green-500" 
                loading={loading}
            />
            <MetricCard 
                title="Total Discount" 
                value={totalDiscountValue} 
                icon={BiSolidBadgeDollar} 
                iconColor="text-red-500" 
                loading={loading}
            />
        </div>
    );
};

export default MetricsPanel;