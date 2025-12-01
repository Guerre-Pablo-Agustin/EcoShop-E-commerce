import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { routes } from "./lib/routes";

// Componentes que se cargan inmediatamente (críticos)
import MainLayout from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";
import NotFound from "./pages/NotFound";

// Lazy loading de páginas públicas
const Index = lazy(() => import("./pages/Index"));
const ProductDetail = lazy(() => import("./pages/Product/ProductDetail"));
const ShoppingCartPage = lazy(() => import("./pages/ShoppingCartPage/ShoppingCartPage"));
const LoginPage = lazy(() => import("./pages/Login/LoginPage"));
const StorePage = lazy(() => import("./pages/Store/StorePage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage/CheckoutPage"));

// Lazy loading de páginas del dashboard
const IndexDasboard = lazy(() => import("./pages/Dahboard/IndexDasboard"));
const MainProducts = lazy(() => import("./pages/Dahboard/Productos/main"));
const IndexBrands = lazy(() => import("./pages/Dahboard/Brands/indexBrands"));
const NewBrand = lazy(() => import("./pages/Dahboard/Brands/newBrand"));
const EditBrand = lazy(() => import("./pages/Dahboard/Brands/editBrand"));
const NewProduct = lazy(() => import("./pages/Dahboard/Productos/newProduct"));
const EditProduct = lazy(() => import("./pages/Dahboard/Productos/editProduct"));
const PageGreenMetrics = lazy(() => import("./pages/Dahboard/GreenMetrics/PageGreenMetrics"));

const queryClient = new QueryClient();

// Componente de carga mientras se cargan las páginas
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
      <p className="mt-4 text-gray-600">Cargando...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
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
              <Route path={routes.dashboardProducts} element={<MainProducts />} />
              <Route
                path={routes.dashboardProductosNuevo}
                element={<NewProduct />}
              />
              <Route
                path={routes.dashboardProductosEditar}
                element={<EditProduct />}
              />
              <Route
                path={routes.dashboardImpacto}
                element={<PageGreenMetrics />}
              />
              <Route path={routes.dashboardMarcas} element={<IndexBrands />} />
              <Route path={routes.dashboardMarcasNuevo} element={<NewBrand />} />
              <Route
                path={routes.dashboardMarcasEditar}
                element={<EditBrand />}
              />
            </Route>

            {/* Ruta 404 - debe ir al final */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;