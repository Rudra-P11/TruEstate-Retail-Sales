import MetricsPanel from '../components/MetricsPanel';
import ControlsPanel from '../components/ControlsPanel';
import SalesTable from '../components/SalesTable';

const DashboardPage = () => {
  return (
    <div className="space-y-3">
      
      <ControlsPanel />
      
      <MetricsPanel />

      <SalesTable />
      
    </div>
  );
};

export default DashboardPage;