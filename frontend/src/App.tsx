import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar'; 
import Header from './components/Header';
import { SalesDataProvider } from './hooks/useSalesData'; 

function App() {
  return (
    <SalesDataProvider>
      <div className="min-h-screen bg-gray-50 flex">
        <Sidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-bg p-6">
            <DashboardPage />
          </main>
        </div>
      </div>
    </SalesDataProvider>
  );
}

export default App;