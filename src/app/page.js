import ProductCard from "../components/ProductCard";
import { prisma } from "../lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const rawWines = await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

 
  const wines = rawWines.map((wine) => ({
    id: wine.id,
    name: wine.name,
    description: wine.description,
    aroma: wine.aroma,
    pairing: wine.pairing,
    price: Number(wine.price), // Convertimos el Decimal a Número puro
    stock: wine.stock,
    imageUrl: wine.imageUrl,
    category: wine.category,
    strain: wine.strain,
    winery: wine.winery,
    year: wine.year,
    alcoholContent: wine.alcoholContent ? Number(wine.alcoholContent) : null,
    volume: wine.volume,
  }));

  const tintos = wines.filter((w) => w.category === "Tinto");
  const blancos = wines.filter((w) => w.category === "Blanco");
  const rosados = wines.filter((w) => w.category === "Rosado");
  const espumantes = wines.filter((w) => w.category === "Espumante");

  const categories = [
    { title: "Vinos Tintos", items: tintos },
    { title: "Vinos Blancos", items: blancos },
    { title: "Vinos Rosados", items: rosados },
    { title: "Espumantes", items: espumantes },
  ];

  return (
    <div className="bg-cava-bg min-h-screen pb-20 flex flex-col gap-14 mt-6">
      {/* Banner Principal / Hero Section con estética premium */}
      <div className="bg-cava-dark text-white py-16 px-6 text-center shadow-md border-b-4 border-cava-brown rounded-2xl">
        <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-wider mb-3">
          Nuestra Colección
        </h1>
        <p className="text-cava-brown uppercase tracking-[0.2em] text-xs font-semibold">
          Selección Exclusiva de Cava Nueve K
        </p>
      </div>

      {/* Verificamos si hay vinos en total */}
      {wines.length === 0 ? (
        <p className="text-cava-dark text-center py-10 text-lg">
          Aún no hay vinos en el catálogo. ¡Sube el primero desde tu panel!
        </p>
      ) : (
        <div className="flex flex-col gap-16">
          {categories.map(
            (category, idx) =>
              // REGLA DE ORO: Solo dibujamos la sección si tiene productos cargados
              category.items.length > 0 && (
                <div key={idx} className="flex flex-col gap-6">
                  {/* Título Estilizado de la Categoría con Línea Divisoria */}
                  <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-serif font-bold text-cava-dark whitespace-nowrap">
                      {category.title}
                    </h2>
                    <div className="h-[1px] flex-1 bg-cava-brown/30"></div>
                    <span className="text-xs text-cava-brown font-mono bg-white px-2 py-1 rounded-md border border-cava-brown/10 shadow-sm">
                      {category.items.length} etiquetas
                    </span>
                  </div>

                  {/* Grilla de productos (CSS Grid) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {category.items.map((wine) => (
                      <ProductCard key={wine.id} wine={wine} />
                    ))}
                  </div>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}
