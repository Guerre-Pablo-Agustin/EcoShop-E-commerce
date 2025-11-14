import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, User, Leaf, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCartItems } from "@/store/cart.store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  //datos del carrito
  const items = useCartItems();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navigation = [
    { name: "Mujer", href: "/mujer" },
    { name: "Hombre", href: "/hombre" },
    { name: "Accesorios", href: "/accesorios" },
    { name: "Hogar", href: "/hogar" },
  ];

  return (
    <>
      {/* Top Banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-xs md:text-sm font-medium">
        ENTREGAS EN 24/48H • +600 MATERIALES RECICLADOS INNOVADORES DESARROLLADOS
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left Side - Menu (Mobile) + Desktop Navigation */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="border-t pt-4 mt-4">
                      <Link
                        to="/tiendas"
                        className="block text-lg font-medium hover:text-primary transition-colors mb-3"
                        onClick={() => setIsOpen(false)}
                      >
                        Tiendas
                      </Link>
                      <Link
                        to="/sobre-nosotros"
                        className="block text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        Sobre Nosotros
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>

              {/* Logo - Visible only on Mobile */}
              <Link 
                to="/" 
                className="flex items-center gap-2 lg:hidden"
              >
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">ECOCOMMERCE</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-sm font-medium hover:text-primary transition-colors uppercase"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Logo - Centered on Desktop only */}
            <Link 
              to="/" 
              className="hidden lg:flex items-center gap-2 absolute left-1/2 transform -translate-x-1/2"
            >
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">ECOCOMMERCE</span>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Desktop Links */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/tiendas">
                  <Button variant="ghost" size="sm" className="text-xs uppercase">
                    Tiendas
                  </Button>
                </Link>
                <Link to="/sobre-nosotros">
                  <Button variant="ghost" size="sm" className="text-xs uppercase">
                    Sobre Nosotros
                  </Button>
                </Link>
              </div>

              {/* Search Button */}
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* User Account */}
              <Link to="/cuenta" className="hidden sm:block">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              
              {/* Shopping Cart */}
              <Link to="/carrito">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Buscar Productos</DialogTitle>
          </DialogHeader>
          <div className="flex gap-2 mt-4">
            <Input 
              placeholder="¿Qué estás buscando?" 
              className="flex-1"
              autoFocus
            />
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
          </div>
          <div className="mt-4">
            <p className="text-sm text-muted-foreground mb-2">Búsquedas populares:</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setSearchOpen(false)}>
                Ropa sostenible
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchOpen(false)}>
                Accesorios reciclados
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSearchOpen(false)}>
                Productos orgánicos
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;