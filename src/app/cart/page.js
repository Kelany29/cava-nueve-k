"use client";

import { useCartStore } from "../../store/cartStore";
import Link from "next/link";
import { Trash2, Plus, Minus } from "lucide-react";
import toast from "react-hot-toast"; // 💡 Importamos la librería de notificaciones

export default function CartPage() {
  const { cart, addToCart, decreaseQuantity, removeFromCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 💡 LA FUNCIÓN CONECTORA DE MERCADO PAGO
  const handleCheckout = async () => {
    // 1. Iniciamos el cartel de carga
    const toastId = toast.loading("Preparando tu pasarela de pago segura...");

    // 2. Buscamos la llave del usuario
    const token = localStorage.getItem("cava-token");

    try {
      // 3. Enviamos el carrito y el token a nuestra propia API
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 💡 Pasamos el token de forma segura
        },
        body: JSON.stringify({ items: cart }),
      });

      const data = await response.json();

      if (response.ok && data.initPoint) {
        // 4. Si todo sale bien, lo redirigimos a Mercado Pago
        toast.success("¡Redirigiendo a Mercado Pago! 🍷", { id: toastId });
        window.location.href = data.initPoint;
      } else {
        toast.error(data.error || "Hubo un problema al generar el pago.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con el servidor de pagos.", {
        id: toastId,
      });
    }
  };

  // Pantalla cuando el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 text-center">
        <h2 className="text-3xl font-serif text-cava-dark mb-6">
          Tu carrito está vacío
        </h2>
        <Link
          href="/"
          className="bg-cava-brown text-white px-8 py-3 rounded-full hover:bg-cava-dark transition-colors shadow-sm"
        >
          Explorar el catálogo
        </Link>
      </div>
    );
  }

  // Pantalla principal del carrito
  return (
    <div className="mt-10 max-w-4xl mx-auto mb-20">
      <h1 className="text-3xl font-serif font-bold text-cava-dark mb-8 border-b border-cava-brown/20 pb-4">
        Tu Selección
      </h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 rounded-xl border border-cava-brown/10 shadow-sm"
          >
            <div className="flex items-center gap-6 w-full sm:w-auto">
              <div className="bg-cava-bg p-2 rounded-lg">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-cava-dark">
                  {item.name}
                </h3>
                <p className="text-sm text-cava-brown uppercase tracking-wider">
                  {item.category}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto mt-4 sm:mt-0 gap-8">
              <div className="flex items-center gap-4 bg-cava-bg px-2 py-1 rounded-full border border-cava-brown/20">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="p-1 text-cava-dark hover:text-cava-brown transition-colors"
                >
                  <Minus size={16} />
                </button>

                <span className="text-sm font-semibold text-cava-dark w-4 text-center">
                  {item.quantity}
                </span>

                <button
                  onClick={() => addToCart(item)}
                  className="p-1 text-cava-dark hover:text-cava-brown transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              <span className="font-bold text-xl text-cava-dark min-w-[100px] text-right">
                ${(item.price * item.quantity).toLocaleString("es-AR")}
              </span>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-400 hover:text-red-600 transition-colors p-2"
                title="Eliminar producto"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-cava-rose/30 p-8 rounded-2xl border border-cava-rose flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <p className="text-cava-brown text-sm font-semibold uppercase tracking-wider mb-1">
            Total a pagar
          </p>
          <span className="text-4xl font-bold text-cava-dark">
            ${total.toLocaleString("es-AR")}
          </span>
        </div>

        {/* 💡 Botón conectado a la función handleCheckout */}
        <button
          onClick={handleCheckout}
          className="w-full sm:w-auto bg-cava-dark text-white px-10 py-4 rounded-full hover:bg-cava-brown transition-colors text-lg font-bold shadow-lg"
        >
          Pagar con Mercado Pago
        </button>
      </div>
    </div>
  );
}
