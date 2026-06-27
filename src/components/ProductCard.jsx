"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "../store/cartStore"; // Importamos Zustand
import toast from "react-hot-toast"; // Importamos la magia de los mensajes elegantes

export default function ProductCard({ wine }) {
  // Traemos la función de agregar desde nuestro cerebro global
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group bg-white rounded-xl border border-cava-brown/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Imagen y Categoría: Aumentamos a h-80 para mayor impacto visual */}
      <div className="relative h-80 w-full bg-gray-50 overflow-hidden flex-shrink-0">
        <span className="absolute top-3 left-3 bg-cava-rose text-cava-dark text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
          {wine.category}
        </span>
        <img
          src={wine.imageUrl}
          alt={wine.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Información del Vino: Usamos flex-grow para empujar el botón al fondo */}
      <div className="p-5 flex flex-col gap-2 flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-cava-brown font-semibold uppercase tracking-wider">
              {wine.winery}
            </p>
            {/* Quitamos line-clamp para que los nombres largos no se corten */}
            <h3 className="text-lg font-serif font-bold text-cava-dark mt-1">
              {wine.name}
            </h3>
          </div>
        </div>

        {/* Descripción: Quitamos line-clamp-2 para mostrar el texto completo */}
        <p className="text-sm text-cava-dark/70 mt-1 mb-4">
          {wine.description}
        </p>

        {/* Precio y Botón de Agregar */}
        <div className="mt-auto pt-4 border-t border-cava-brown/10 flex flex-col gap-4">
          <span className="text-2xl font-bold text-cava-dark text-center">
            ${Number(wine.price).toLocaleString("es-AR")}
          </span>

          <button
            onClick={() => {
              // 1. Lo guardamos en el cerebro global (Zustand)
              addToCart(wine);

              // 2. Mostramos el mensaje elegante original tuyo
              toast.success(`${wine.name} agregado al carrito`, {
                icon: "🍷",
                style: {
                  borderRadius: "10px",
                  background: "#4A3B32",
                  color: "#fff",
                },
              });
            }}
            className="flex items-center justify-center gap-2 w-full bg-cava-brown text-white py-3 rounded-xl hover:bg-cava-dark transition-colors font-bold uppercase tracking-wide text-xs shadow-sm"
            title="Agregar al carrito"
          >
            <ShoppingBag size={18} />
            Agregar carrito
          </button>
        </div>
      </div>
    </div>
  );
}