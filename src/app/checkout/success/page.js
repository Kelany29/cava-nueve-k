"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, ShoppingBag } from "lucide-react";
import { useCartStore } from "../../../store/cartStore";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    // 1. Vaciamos el carrito automáticamente porque la compra ya se hizo
    clearCart();

    // 2. Capturamos el número de orden que nos manda Mercado Pago por la URL
    const id = searchParams.get("orderId");
    if (id) {
      setOrderId(id);
    }
  }, [clearCart, searchParams]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 mt-10">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-cava-brown/10 text-center max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 p-4 rounded-full">
            <CheckCircle size={64} />
          </div>
        </div>

        <h1 className="text-3xl font-serif font-bold text-cava-dark mb-2">
          ¡Pago Exitoso!
        </h1>
        <p className="text-cava-brown mb-8">
          Tu compra se ha procesado correctamente. Prepararemos tus vinos con el
          mayor de los cuidados.
        </p>

        {orderId && (
          <div className="bg-cava-bg p-4 rounded-xl mb-8 border border-cava-brown/20 text-left">
            <p className="text-xs text-cava-brown uppercase font-bold tracking-wider mb-1">
              Número de Orden
            </p>
            <p className="font-mono text-cava-dark font-semibold break-all">
              {orderId}
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-cava-dark text-white p-4 rounded-xl hover:bg-cava-brown transition-colors font-bold shadow-sm"
          >
            <ShoppingBag size={20} />
            Volver al Catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
