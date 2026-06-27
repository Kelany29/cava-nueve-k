import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🧹 Limpiando base de datos antes de cargar...");
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.product.deleteMany({});

  console.log("🍷 Cargando los 40 vinos exclusivos...");

  // === IMÁGENES VERIFICADAS 100% VINOS ===
  // Dejamos la de tintos que funcionó perfecto
  const tintosImg =
    "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=600&auto=format&fit=crop";
  // Copas de vino blanco brillante
  const blancosImg =
    "https://images.unsplash.com/photo-1504279577054-acfeac0f92ab?q=80&w=600&auto=format&fit=crop";
  // Estética de vino rosado
  const rosasImg =
    "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=600&auto=format&fit=crop";
  // Brindis con copas de espumante/champagne
  const espumantesImg =
    "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop";

  const products = [
    // === 10 VINOS TINTOS ===
    {
      name: "Gran Malbec Reserva",
      strain: "Malbec",
      category: "Tinto",
      price: 18500,
      imageUrl: tintosImg,
    },
    {
      name: "Cabernet del Valle",
      strain: "Cabernet Sauvignon",
      category: "Tinto",
      price: 16200,
      imageUrl: tintosImg,
    },
    {
      name: "Merlot Elegance",
      strain: "Merlot",
      category: "Tinto",
      price: 15400,
      imageUrl: tintosImg,
    },
    {
      name: "Syrah Satén",
      strain: "Syrah",
      category: "Tinto",
      price: 17100,
      imageUrl: tintosImg,
    },
    {
      name: "Pinot Noir Sublime",
      strain: "Pinot Noir",
      category: "Tinto",
      price: 21000,
      imageUrl: tintosImg,
    },
    {
      name: "Bonarda Ancestral",
      strain: "Bonarda",
      category: "Tinto",
      price: 14500,
      imageUrl: tintosImg,
    },
    {
      name: "Blend Icono Nueve K",
      strain: "Blend Seleccionado",
      category: "Tinto",
      price: 29000,
      imageUrl: tintosImg,
    },
    {
      name: "Cabernet Franc Reserva",
      strain: "Cabernet Franc",
      category: "Tinto",
      price: 19800,
      imageUrl: tintosImg,
    },
    {
      name: "Tempranillo de Altura",
      strain: "Tempranillo",
      category: "Tinto",
      price: 15900,
      imageUrl: tintosImg,
    },
    {
      name: "Tannat Intenso",
      strain: "Tannat",
      category: "Tinto",
      price: 18000,
      imageUrl: tintosImg,
    },

    // === 10 VINOS BLANCOS ===
    {
      name: "Chardonnay Barrica",
      strain: "Chardonnay",
      category: "Blanco",
      price: 14200,
      imageUrl: blancosImg,
    },
    {
      name: "Sauvignon Blanc Fresh",
      strain: "Sauvignon Blanc",
      category: "Blanco",
      price: 13500,
      imageUrl: blancosImg,
    },
    {
      name: "Torrontés Salteño",
      strain: "Torrontés",
      category: "Blanco",
      price: 12800,
      imageUrl: blancosImg,
    },
    {
      name: "Pinot Grigio Reserve",
      strain: "Pinot Grigio",
      category: "Blanco",
      price: 16000,
      imageUrl: blancosImg,
    },
    {
      name: "Viognier Dorado",
      strain: "Viognier",
      category: "Blanco",
      price: 15200,
      imageUrl: blancosImg,
    },
    {
      name: "Riesling de la Precordillera",
      strain: "Riesling",
      category: "Blanco",
      price: 18500,
      imageUrl: blancosImg,
    },
    {
      name: "Semillon Especial",
      strain: "Semillon",
      category: "Blanco",
      price: 17000,
      imageUrl: blancosImg,
    },
    {
      name: "Dulce Cosecha Tardía",
      strain: "Blend Dulce",
      category: "Blanco",
      price: 11500,
      imageUrl: blancosImg,
    },
    {
      name: "Blend Blanco Premium",
      strain: "Blend",
      category: "Blanco",
      price: 19000,
      imageUrl: blancosImg,
    },
    {
      name: "Chenin Blanc Austral",
      strain: "Chenin Blanc",
      category: "Blanco",
      price: 13900,
      imageUrl: blancosImg,
    },

    // === 10 VINOS ROSAS ===
    {
      name: "Rosé de Malbec Glam",
      strain: "Malbec Rosé",
      category: "Rosado",
      price: 13800,
      imageUrl: rosasImg,
    },
    {
      name: "Pinot Noir Rosé Delicate",
      strain: "Pinot Noir Rosé",
      category: "Rosado",
      price: 16500,
      imageUrl: rosasImg,
    },
    {
      name: "Syrah Rosé Velvet",
      strain: "Syrah Rosé",
      category: "Rosado",
      price: 14100,
      imageUrl: rosasImg,
    },
    {
      name: "Merlot Rosé Pastel",
      strain: "Merlot Rosé",
      category: "Rosado",
      price: 13200,
      imageUrl: rosasImg,
    },
    {
      name: "Blend Rosé d'Amour",
      strain: "Blend Rosado",
      category: "Rosado",
      price: 15000,
      imageUrl: rosasImg,
    },
    {
      name: "Cabernet Rosé Crisp",
      strain: "Cabernet Rosé",
      category: "Rosado",
      price: 12900,
      imageUrl: rosasImg,
    },
    {
      name: "Clarete Tradición",
      strain: "Clarete",
      category: "Rosado",
      price: 11800,
      imageUrl: rosasImg,
    },
    {
      name: "Grenache Rosé Provence",
      strain: "Grenache Rosé",
      category: "Rosado",
      price: 22000,
      imageUrl: rosasImg,
    },
    {
      name: "Pale Rosé Exclusive",
      strain: "Blend",
      category: "Rosado",
      price: 18900,
      imageUrl: rosasImg,
    },
    {
      name: "Sweet Rosé Dulce",
      strain: "Rosado Dulce",
      category: "Rosado",
      price: 12200,
      imageUrl: rosasImg,
    },

    // === 10 ESPUMANTES ===
    {
      name: "Extra Brut Prestige",
      strain: "Chardonnay / Pinot",
      category: "Espumante",
      price: 19500,
      imageUrl: espumantesImg,
    },
    {
      name: "Nature Absolute",
      strain: "Pinot Noir",
      category: "Espumante",
      price: 24000,
      imageUrl: espumantesImg,
    },
    {
      name: "Brut Nature Réserve",
      strain: "Chardonnay",
      category: "Espumante",
      price: 22500,
      imageUrl: espumantesImg,
    },
    {
      name: "Demi Sec Celebration",
      strain: "Blend",
      category: "Espumante",
      price: 16800,
      imageUrl: espumantesImg,
    },
    {
      name: "Dulce Fizz Sparkling",
      strain: "Torrontés",
      category: "Espumante",
      price: 15500,
      imageUrl: espumantesImg,
    },
    {
      name: "Rosé Brut Luxury",
      strain: "Malbec Rosé",
      category: "Espumante",
      price: 21500,
      imageUrl: espumantesImg,
    },
    {
      name: "Prosecco Style Elixir",
      strain: "Glera",
      category: "Espumante",
      price: 26000,
      imageUrl: espumantesImg,
    },
    {
      name: "Champenoise Método Tradicional",
      strain: "Chardonnay / Pinot",
      category: "Espumante",
      price: 35000,
      imageUrl: espumantesImg,
    },
    {
      name: "Charmat Elegance",
      strain: "Blend",
      category: "Espumante",
      price: 17900,
      imageUrl: espumantesImg,
    },
    {
      name: "Grand Cuvée Final",
      strain: "Selección Especial",
      category: "Espumante",
      price: 42000,
      imageUrl: espumantesImg,
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: `Exclusivo ejemplar categoría ${p.category}, elaborado con uvas seleccionadas de fincas boutique. Ideal para maridajes sofisticados y guarda prolongada.`,
        aroma:
          "Notas frutales complejas con sutiles dejos de roble y vainilla aportados por su crianza.",
        pairing:
          "Carnes maduradas, pastas de autor, quesos duros y momentos memorables.",
        price: p.price,
        stock: 50,
        imageUrl: p.imageUrl,
        category: p.category,
        strain: p.strain,
        winery: "Bodega Nueve K",
        year: 2023,
        alcoholContent: 13.8,
        volume: 750,
      },
    });
  }

  console.log(
    "🚀 ¡Los 40 vinos se han cargado perfectamente con imágenes reales!",
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
