import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { RightSidebar } from "./components/RightSidebar";
import { AppProvider } from "./context/AppContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ContextIntegration } from "./context/IntegratedContext";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

// Protected Route component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Admin Route component
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (authState.user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Main App Layout
function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}

// Auth Layout (for login/register pages)
function AuthLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen">{children}</div>;
}

function AppRoutes() {
  const { authState } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path="/login"
        element={
          authState.isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <AuthLayout>
              <Login />
            </AuthLayout>
          )
        }
      />
      <Route
        path="/register"
        element={
          authState.isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <AuthLayout>
              <Register />
            </AuthLayout>
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Index />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Profile />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster position="bottom-right" />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
