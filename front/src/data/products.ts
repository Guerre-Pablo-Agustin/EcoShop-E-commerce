interface Brand {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  sustentabilityStory: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  impact: {
    carbonFootprint: number; // kg CO2
    recyclable: number; // percentage
    waterUsage: number; // liters
    transportDistance: number; // km
  };
  stock: number;
  brand: Brand,
  certifications: string[];
  materials: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
  origin: {
    text: string;
  };
  rating: number;
  reviews: number;
  isActive: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Camiseta Orgánica de Algodón",
    description: "Camiseta 100% algodón orgánico certificado GOTS. Producción ética y sostenible.",
    price: 29.99,
    image: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500"
    ],
    category: "Ropa",
    impact: {
      carbonFootprint: 2.1,
      recyclable: 95,
      waterUsage: 120,
      transportDistance: 500,
    },
    certifications: ["GOTS", "Fair Trade", "Carbon Neutral"],
    materials: [
      { name: "Algodón Orgánico", percentage: 100, color: "bg-emerald-500" }
    ],
    origin: {
      text: "Producido en talleres sostenibles en India con comercio justo"
    },
    rating: 92,
    reviews: 1127,
    stock: 100,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: true,
  },
  {
    id: "2",
    name: "Botella Reutilizable de Acero",
    description: "Botella de acero inoxidable de doble pared. Mantiene bebidas frías 24h y calientes 12h.",
    price: 24.99,
    image: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
      "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=500",
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500"
    ],
    category: "Hogar",
    impact: {
      carbonFootprint: 1.5,
      recyclable: 100,
      waterUsage: 50,
      transportDistance: 800,
    },
    certifications: ["BPA Free", "Recyclable"],
    materials: [
      { name: "Acero Inoxidable 304", percentage: 90, color: "bg-gray-400" },
      { name: "Silicona Natural", percentage: 10, color: "bg-blue-400" }
    ],
    origin: {
      text: "Fabricado con acero reciclado en talleres sostenibles de Alemania"
    },
    rating: 88,
    reviews: 856,
    stock: 100,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: true,
  },
  {
    id: "3",
    name: "Mochila de Material Reciclado",
    description: "Mochila resistente al agua fabricada con botellas PET recicladas.",
    price: 49.99,
    image: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=500",
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?w=500"
    ],
    category: "Accesorios",
    impact: {
      carbonFootprint: 3.8,
      recyclable: 85,
      waterUsage: 200,
      transportDistance: 1200,
    },
    certifications: ["GRS", "Vegan", "Ocean Plastic"],
    materials: [
      { name: "rPET (Botellas Recicladas)", percentage: 70, color: "bg-blue-500" },
      { name: "Poliéster Reciclado", percentage: 30, color: "bg-teal-400" }
    ],
    origin: {
      text: "Producido en Vietnam utilizando plástico oceánico recuperado"
    },
    rating: 85,
    reviews: 643,
    stock: 50,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: true,
  },
  {
    id: "4",
    name: "Kit de Utensilios de Bambú",
    description: "Set de cubiertos reutilizables de bambú natural con estuche de algodón.",
    price: 15.99,
    image: [
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500",
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500"
    ],
    category: "Hogar",
    impact: {
      carbonFootprint: 0.8,
      recyclable: 100,
      waterUsage: 30,
      transportDistance: 600,
    },
    certifications: ["FSC", "Compostable", "Biodegradable"],
    materials: [
      { name: "Bambú Natural", percentage: 80, color: "bg-amber-600" },
      { name: "Algodón Orgánico", percentage: 20, color: "bg-emerald-400" }
    ],
    origin: {
      text: "Fabricado artesanalmente en talleres de comercio justo en China"
    },
    rating: 94,
    reviews: 1532,
    stock: 10,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: false,
  },
  {
    id: "5",
    name: "Jabón Natural Artesanal",
    description: "Jabón elaborado a mano con ingredientes orgánicos y aceites esenciales.",
    price: 8.99,
    image: [
      "https://images.unsplash.com/photo-1600857544200-b1071ce73e00?w=500",
      "https://images.unsplash.com/photo-1600857544200-b1071ce73e00?w=500",
      "https://images.unsplash.com/photo-1585933646710-e3a9a1887c65?w=500",
      "https://images.unsplash.com/photo-1600857062241-98e5e6300217?w=500"
    ],
    category: "Cuidado Personal",
    impact: {
      carbonFootprint: 0.3,
      recyclable: 100,
      waterUsage: 15,
      transportDistance: 200,
    },
    certifications: ["Organic", "Cruelty Free", "Vegan"],
    materials: [
      { name: "Aceites Vegetales Orgánicos", percentage: 70, color: "bg-green-500" },
      { name: "Aceites Esenciales Naturales", percentage: 20, color: "bg-purple-400" },
      { name: "Extractos Botánicos", percentage: 10, color: "bg-pink-400" }
    ],
    origin: {
      text: "Elaborado artesanalmente en España con ingredientes locales y orgánicos"
    },
    rating: 96,
    reviews: 2341,
    stock: 80,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: true,
  },
  {
    id: "6",
    name: "Zapatillas Sostenibles",
    description: "Zapatillas deportivas fabricadas con materiales reciclados y suela de caucho natural.",
    price: 79.99,
    image: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
    ],
    category: "Calzado",
    impact: {
      carbonFootprint: 5.2,
      recyclable: 75,
      waterUsage: 300,
      transportDistance: 1500,
    },
    certifications: ["Recycled Materials", "Carbon Offset"],
    materials: [
      { name: "rPET (Poliéster Reciclado)", percentage: 50, color: "bg-blue-500" },
      { name: "Caucho Natural", percentage: 30, color: "bg-gray-600" },
      { name: "Algodón Reciclado", percentage: 20, color: "bg-emerald-400" }
    ],
    origin: {
      text: "Producido en Portugal con materiales reciclados y procesos de carbono neutral"
    },
    rating: 87,
    reviews: 912,
    stock: 0,
    brand: {
      id: "1",
      name: "EcoShop",
      logo: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus.",
      website: "https://ecoshop.com",
      sustentabilityStory: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus."
    },
    isActive: false,
  },
  
];