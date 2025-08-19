import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { RightSidebar } from "./components/RightSidebar";
import { AppProvider } from "./context/AppContext";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <div className="flex">
            <Sidebar />
            
            <main className="flex-1 min-w-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            
            <RightSidebar />
          </div>
          <Toaster position="bottom-right" />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
