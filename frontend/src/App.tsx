import Sidebar from './components/Sidebar'; 
import Header from './components/Header';
import { SalesDataProvider } from './hooks/useSalesData';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import InvoicesPage from './pages/InvoicesPage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <SalesDataProvider>
      <div className="min-h-screen bg-white flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white p-4">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/invoices" element={<InvoicesPage />} />
              <Route path="/invoices/proforma" element={<InvoicesPage type="proforma" />} />
              <Route path="/invoices/final" element={<InvoicesPage type="final" />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/pre-active" element={<ServicesPage status="pre-active" />} />
              <Route path="/services/active" element={<ServicesPage status="active" />} />
              <Route path="/services/blocked" element={<ServicesPage status="blocked" />} />
              <Route path="/services/closed" element={<ServicesPage status="closed" />} />
            </Routes>
          </main>
        </div>
      </div>
    </SalesDataProvider>
  );
}

export default App;