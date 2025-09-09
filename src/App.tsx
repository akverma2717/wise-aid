import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import UserDashboard from "./pages/UserDashboard";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import RecommendScheme from "./pages/RecommendScheme";
import SchemeDetails from "./pages/SchemeDetails";
import SchemeApplication from "./pages/SchemeApplication";
import ApplicationHistory from "./pages/ApplicationHistory";
import SagDashboard from "./pages/sag/SagDashboard";
import FinanceDashboard from "./pages/finance/FinanceDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/" replace />;
  
  if (allowedRoles && !allowedRoles.includes(user.userType)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/recommend-schemes" element={<RecommendScheme />} />
      <Route path="/scheme-details/:id" element={<SchemeDetails />} />
      
      {/* Protected Student Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['student']}>
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/scheme-application/:id" element={
        <ProtectedRoute allowedRoles={['student']}>
          <SchemeApplication />
        </ProtectedRoute>
      } />
      <Route path="/application-history" element={
        <ProtectedRoute allowedRoles={['student']}>
          <ApplicationHistory />
        </ProtectedRoute>
      } />
      
      {/* Protected SAG Routes */}
      <Route path="/sag/dashboard" element={
        <ProtectedRoute allowedRoles={['sag']}>
          <SagDashboard />
        </ProtectedRoute>
      } />
      
      {/* Protected Finance Routes */}
      <Route path="/finance/dashboard" element={
        <ProtectedRoute allowedRoles={['finance']}>
          <FinanceDashboard />
        </ProtectedRoute>
      } />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
