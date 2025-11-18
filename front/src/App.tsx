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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={routes.home} element={<Index />} />
            <Route path={routes.productDetail} element={<ProductDetail />} />
            <Route path={routes.shoppingCart} element={<ShoppingCartPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.store} element={<StorePage />} />
            {/* Añade más rutas aquí según necesites */}
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;