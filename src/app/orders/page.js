"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // Buscamos la llave del usuario en su navegador
      const token = localStorage.getItem("cava-token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Le pedimos el historial a tu excelente API
        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setOrders(data);
        } else {
          toast.error("No se pudo cargar el historial.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error de conexión.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Pantalla de carga
  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cava-brown"></div>
      </div>
    );
  }

  // Pantalla cuando el usuario no ha comprado nada o no está logueado
  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 mt-10">
        <Package size={64} className="text-cava-brown/40 mb-6" />
        <h2 className="text-3xl font-serif text-cava-dark mb-4">
          Aún no tienes compras
        </h2>
        <p className="text-cava-brown mb-8">
          Parece que tu cava está vacía. ¡Es un buen momento para explorar
          nuestra colección!
        </p>
        <Link
          href="/"
          className="bg-cava-dark text-white px-8 py-3 rounded-full hover:bg-cava-brown transition-colors shadow-sm"
        >
          Ir al catálogo
        </Link>
      </div>
    );
  }

  // Pantalla principal con el historial
  return (
    <div className="max-w-4xl mx-auto px-4 mt-10 mb-20">
      <h1 className="text-3xl font-serif font-bold text-cava-dark mb-8 border-b border-cava-brown/20 pb-4">
        Mi Historial de Compras
      </h1>

      <div className="flex flex-col gap-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-2xl border border-cava-brown/20 shadow-sm overflow-hidden"
          >
            {/* 1. Cabecera de la Orden */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cava-brown/10 pb-4 mb-4 gap-4">
              <div>
                <p className="text-xs text-cava-brown uppercase font-bold tracking-wider">
                  Orden #{order.id.split("-")[0]}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {new Date(order.createdAt).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Etiqueta dinámica de Estado */}
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : order.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {order.status === "PAID" && <CheckCircle size={16} />}
                {order.status === "PENDING" && <Clock size={16} />}
                {order.status === "CANCELLED" && <XCircle size={16} />}
                {order.status === "PAID"
                  ? "PAGADO"
                  : order.status === "PENDING"
                    ? "PENDIENTE"
                    : "CANCELADO"}
              </div>
            </div>

            {/* 2. Lista de Vinos de esta orden */}
            <div className="flex flex-col gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-cava-bg/30 p-3 rounded-xl border border-cava-brown/5"
                >
                  {item.product?.imageUrl ? (
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-contain bg-white rounded-lg p-1 border border-cava-brown/10"
                    />
                  ) : (
                    <div className="w-14 h-14 bg-cava-brown/10 rounded-lg flex items-center justify-center text-xl">
                      🍷
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-bold text-cava-dark">
                      {item.product?.name || "Vino de colección"}
                    </p>
                    <p className="text-sm text-cava-brown font-medium">
                      {item.quantity} x $
                      {Number(item.price).toLocaleString("es-AR")}
                    </p>
                  </div>

                  <div className="font-bold text-cava-dark">
                    $
                    {(item.quantity * Number(item.price)).toLocaleString(
                      "es-AR",
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 3. Total final de la orden */}
            <div className="mt-6 pt-4 border-t border-cava-brown/10 flex justify-end items-center gap-4 bg-cava-rose/10 -mx-6 -mb-6 p-6">
              <p className="text-cava-brown uppercase text-sm font-bold tracking-wider">
                Total abonado:
              </p>
              <p className="text-3xl font-serif font-bold text-cava-dark">
                ${Number(order.total).toLocaleString("es-AR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
