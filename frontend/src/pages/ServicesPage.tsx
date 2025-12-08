import ControlsPanel from '../components/ControlsPanel';
import MetricsPanel from '../components/MetricsPanel';
import SalesTable from '../components/SalesTable';

interface ServicesPageProps {
    status?: 'pre-active' | 'active' | 'blocked' | 'closed';
}

const ServicesPage: React.FC<ServicesPageProps> = ({ status = 'pre-active' }) => {
    const statusLabels: Record<string, string> = {
        'pre-active': 'Pre-active Services',
        'active': 'Active Services',
        'blocked': 'Blocked Services',
        'closed': 'Closed Services',
    };

    const pageTitle = statusLabels[status] || 'Services';

    return (
        <div className="space-y-3">
            <h1 className="text-xl font-bold text-gray-900">{pageTitle}</h1>
            
            <ControlsPanel />
            
            <MetricsPanel />

            <SalesTable />
        </div>
    );
};

export default ServicesPage;
