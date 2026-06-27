import { prisma } from "../../lib/prisma";
import AdminProductActions from "../../components/AdminProductActions";
import {
  DollarSign,
  TrendingUp,
  Package,
  PlusCircle,
  PackageSearch,
} from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Buscamos TODOS los productos
  const wines = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  // 2. Buscamos TODAS las ventas (órdenes)
  const orders = await prisma.order.findMany();

  // 3. Calculamos la inteligencia financiera (Dashboard)
  const totalIngresos = orders.reduce(
    (sum, order) => sum + parseFloat(order.total),
    0,
  );
  const cantidadVentas = orders.length;
  const cantidadProductos = wines.length;

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-20">
      {/* ==========================================
          1. ENCABEZADO PRINCIPAL (Limpio, sin botón extra)
      ========================================== */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 border-b border-cava-brown/20 pb-4 gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-cava-dark">
            Panel de Control
          </h1>
          <p className="text-cava-brown text-sm mt-1">
            Gestión de inventario y estadísticas financieras
          </p>
        </div>
      </div>

      {/* ==========================================
          2. TARJETAS DEL DASHBOARD FINANCIERO
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl border border-cava-brown/10 shadow-sm flex items-center gap-4">
          <div className="bg-green-100 text-green-700 p-4 rounded-full">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-sm text-cava-brown font-semibold uppercase">
              Ingresos Totales
            </p>
            <p className="text-2xl font-bold text-cava-dark">
              ${totalIngresos.toLocaleString("es-AR")}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-cava-brown/10 shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 text-blue-700 p-4 rounded-full">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-sm text-cava-brown font-semibold uppercase">
              Ventas Realizadas
            </p>
            <p className="text-2xl font-bold text-cava-dark">
              {cantidadVentas}
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-cava-brown/10 shadow-sm flex items-center gap-4">
          <div className="bg-cava-rose text-cava-dark p-4 rounded-full">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm text-cava-brown font-semibold uppercase">
              En Catálogo
            </p>
            <p className="text-2xl font-bold text-cava-dark">
              {cantidadProductos} Vinos
            </p>
          </div>
        </div>
      </div>

      {/* ==========================================
          3. BOTONES DE NAVEGACIÓN RÁPIDA
      ========================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Botón: Crear Nuevo */}
        <Link
          href="/admin/new"
          className="bg-cava-dark text-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center text-center gap-3 group"
        >
          <div className="bg-white/10 p-3 rounded-full group-hover:bg-cava-rose group-hover:text-cava-dark transition-colors">
            <PlusCircle size={32} />
          </div>

          <h3 className="font-bold text-xl font-serif">Subir Nuevo Vino</h3>
          <p className="text-sm text-white/70">Añade un producto al catálogo</p>
        </Link>

        {/* Botón: Inventario */}
        <div className="bg-white border border-cava-brown/20 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3">
          <div className="bg-cava-bg text-cava-dark p-3 rounded-full">
            <PackageSearch size={32} />
          </div>
          <h3 className="font-bold text-xl font-serif text-cava-dark">
            Inventario Activo
          </h3>
          <p className="text-sm text-cava-brown">
            Edita precios y controla el stock debajo
          </p>
        </div>

        {/* Botón: Ventas */}
        <div className="bg-white border border-cava-brown/20 p-6 rounded-2xl shadow-sm flex flex-col items-center text-center gap-3 opacity-70">
          <div className="bg-cava-bg text-cava-dark p-3 rounded-full">
            <TrendingUp size={32} />
          </div>
          <h3 className="font-bold text-xl font-serif text-cava-dark">
            Órdenes de Compra
          </h3>
          <p className="text-sm text-cava-brown">Próximamente...</p>
        </div>
      </div>

      {/* ==========================================
          4. TABLA DE PRODUCTOS (CRUD)
      ========================================== */}
      <div className="bg-white rounded-3xl shadow-sm border border-cava-brown/10 p-6 overflow-hidden overflow-x-auto">
        <h2 className="text-2xl font-serif font-bold text-cava-dark mb-6">
          Catálogo Completo
        </h2>

        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-cava-bg text-cava-brown text-sm uppercase tracking-wider border-b border-cava-brown/10">
              <th className="p-4 font-semibold rounded-tl-xl">Producto</th>
              <th className="p-4 font-semibold">Categoría</th>
              <th className="p-4 font-semibold">Precio</th>
              <th className="p-4 font-semibold text-center rounded-tr-xl">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {wines.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-8 text-center text-cava-dark/70">
                  No hay productos en el inventario.
                </td>
              </tr>
            ) : (
              wines.map((wine) => (
                <tr
                  key={wine.id}
                  className="border-b border-cava-brown/5 hover:bg-cava-bg/50 transition-colors"
                >
                  <td className="p-4 flex items-center gap-4">
                    <img
                      src={wine.imageUrl}
                      alt={wine.name}
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-cava-brown/10 shadow-sm"
                    />
                    <div>
                      <p className="font-bold text-cava-dark">{wine.name}</p>
                      <p className="text-xs text-cava-brown uppercase">
                        {wine.winery}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-cava-dark font-medium">
                    {wine.category}
                  </td>

                  <td className="p-4 font-bold text-cava-dark">
                    ${Number(wine.price).toLocaleString("es-AR")}
                  </td>

                  <td className="p-4">
                    <AdminProductActions id={wine.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
