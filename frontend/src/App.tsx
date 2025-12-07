import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar'; 
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-bg p-6">
          <DashboardPage />
        </main>
      </div>
    </div>
  );
}

export default App;