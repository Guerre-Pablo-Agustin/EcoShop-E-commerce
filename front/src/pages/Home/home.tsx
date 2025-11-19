import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, Shield, TrendingDown } from "lucide-react";
import heroImage from "../../assets/hero-eco.jpg";
import { ProductCard } from "@/components/Products/ProductCard";
import { Link } from "react-router-dom";
import { routes } from "@/lib/routes";

const Home = () => {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-background/60 via-background/70 to-background/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-eco-badge/10 text-eco-badge px-4 py-2 rounded-full mb-6">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">100% Productos Sostenibles</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Compra con Consciencia
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Cada producto muestra su impacto ambiental real. Transparencia total para decisiones responsables.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to={routes.store}>
            <Button size="lg" className="text-lg">
              Explorar Productos
            </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg">
              Sobre Nosotros
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <TrendingDown className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Huella de Carbono</h3>
              <p className="text-sm text-muted-foreground">
                Medición precisa del CO₂ de cada producto
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">100% Reciclable</h3>
              <p className="text-sm text-muted-foreground">
                Materiales sostenibles y reciclables
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Certificado</h3>
              <p className="text-sm text-muted-foreground">
                Productos con certificaciones ambientales
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Producción Ética</h3>
              <p className="text-sm text-muted-foreground">
                Comercio justo y condiciones laborales dignas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Productos Destacados</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cada producto incluye métricas detalladas de impacto ambiental para que puedas tomar decisiones informadas
            </p>
          </div>

          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            <Button variant="default" size="sm">Todos</Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Tu Impacto Importa</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Comprometidos con la transparencia total. Cada compra en nuestra plataforma
              contribuye a un futuro más sostenible. Sabemos exactamente de dónde viene cada
              producto y cuál es su impacto real en el planeta.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <p className="text-4xl font-bold text-primary mb-2">-40%</p>
                <p className="text-sm text-muted-foreground">Menos CO₂ vs productos convencionales</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">100%</p>
                <p className="text-sm text-muted-foreground">Trazabilidad de materiales</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-primary mb-2">500+</p>
                <p className="text-sm text-muted-foreground">Productos certificados</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            © 2024 EcoCommerce. Construyendo un futuro sostenible, una compra a la vez.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
