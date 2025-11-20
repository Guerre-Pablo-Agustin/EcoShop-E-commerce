import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductDetail from "./pages/Product/ProductDetail";
import MainLayout from "./layout/MainLayout";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import LoginPage from "./pages/Login/LoginPage";
import { routes } from "./lib/routes";
import StorePage from "./pages/Store/StorePage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import DashboardLayout from "./layout/DashboardLayout";
import IndexDasboard from "./pages/Dahboard/IndexDasboard";
import MainProducts from "./pages/Dahboard/Productos/main";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas con MainLayout */}
          <Route element={<MainLayout />}>
            <Route path={routes.home} element={<Index />} />
            <Route path={routes.productDetail} element={<ProductDetail />} />
            <Route path={routes.shoppingCart} element={<ShoppingCartPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.store} element={<StorePage />} />
            <Route path={routes.checkout} element={<CheckoutPage />} />
          </Route>

          {/* Rutas del dashboard con DashboardLayout */}
          <Route element={<DashboardLayout />}>
            <Route path={routes.dashboard} element={<IndexDasboard />} />
            {/* Agrega más rutas del dashboard aquí */}
            <Route path={routes.dashboardProducts} element={<MainProducts />} />
          </Route>

          {/* Ruta 404 - debe ir al final */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;