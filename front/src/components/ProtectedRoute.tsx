import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { routes } from "@/lib/routes";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Componente que protege rutas privadas (dashboard)
 * Redirige al login si el usuario no está autenticado
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);

  // Si no hay usuario logueado, redirigir al login
  if (!user) {
    return <Navigate to={routes.login} replace />;
  }

  // Si hay usuario, mostrar el contenido protegido
  return <>{children}</>;
};
