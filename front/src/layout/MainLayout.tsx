import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-12 border-t border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Ayuda</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Contacto</a></li>
                <li><a href="#" className="hover:text-primary">Preguntas Frecuentes</a></li>
                <li><a href="#" className="hover:text-primary">Envíos y Devoluciones</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Nosotros</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Nuestra Historia</a></li>
                <li><a href="#" className="hover:text-primary">Sostenibilidad</a></li>
                <li><a href="#" className="hover:text-primary">Certificaciones</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Términos y Condiciones</a></li>
                <li><a href="#" className="hover:text-primary">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-primary">Cookies</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recibe novedades y ofertas exclusivas
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="flex-1 px-3 py-2 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                  Enviar
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 EcoCommerce. Construyendo un futuro sostenible, una compra a la vez.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;