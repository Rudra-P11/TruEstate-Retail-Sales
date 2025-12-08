import ControlsPanel from '../components/ControlsPanel';
import MetricsPanel from '../components/MetricsPanel';
import SalesTable from '../components/SalesTable';

interface InvoicesPageProps {
    type?: 'proforma' | 'final';
}

const InvoicesPage: React.FC<InvoicesPageProps> = ({ type = 'proforma' }) => {
    const pageTitle = type === 'proforma' ? 'Proforma Invoices' : 'Final Invoices';

    return (
        <div className="space-y-3">
            <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
            
            <ControlsPanel />
            
            <MetricsPanel />

            <SalesTable />
        </div>
    );
};

export default InvoicesPage;
