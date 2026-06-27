"use client";

import { useState } from "react"; // 💡 1. Importamos useState
import { Pencil, Trash2, AlertTriangle } from "lucide-react"; // 💡 Sumamos un ícono de alerta
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminProductActions({ id }) {
  const router = useRouter();

  // 💡 2. Creamos un estado para controlar si la ventanita está abierta o cerrada
  const [showModal, setShowModal] = useState(false);

  // 💡 3. Esta es la función que realmente borra, se activa SOLO si dicen "Sí, Eliminar"
  const confirmDelete = async () => {
    setShowModal(false); // Cerramos la ventanita primero

    const token = localStorage.getItem("cava-token");

    if (!token) {
      toast.error("No tienes permiso. Inicia sesión como administradora.");
      return;
    }

    const toastId = toast.loading("Eliminando producto...");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        toast.success("✅ Vino eliminado de la base de datos.", {
          id: toastId,
        });
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(`❌ Error: ${data.error}`, { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("El servidor no respondió.", { id: toastId });
    }
  };

  return (
    <>
      <div className="flex justify-center gap-3">
        <Link
          href={`/admin/edit/${id}`}
          className="p-2 text-cava-brown hover:bg-cava-rose/30 rounded-lg transition-colors"
          title="Editar precio/datos"
        >
          <Pencil size={18} />
        </Link>

        {/* 💡 4. Al hacer clic, abrimos nuestro modal en lugar del cartel gris */}
        <button
          onClick={() => setShowModal(true)}
          className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          title="Eliminar producto"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* 💡 5. AQUÍ ESTÁ EL MODAL ELEGANTE DISEÑADO CON TAILWIND */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-sm w-full mx-4">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="bg-red-50 p-4 rounded-full text-red-500">
                <AlertTriangle size={36} />
              </div>

              <div>
                <h3 className="text-xl font-bold text-cava-dark mb-1">
                  ¿Eliminar Vino?
                </h3>
                <p className="text-sm text-cava-brown leading-relaxed">
                  Esta acción es irreversible. El vino desaparecerá del catálogo
                  y de la base de datos para siempre.
                </p>
              </div>

              <div className="flex gap-3 w-full mt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl font-semibold text-cava-dark bg-cava-bg hover:bg-cava-rose/30 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-colors shadow-sm"
                >
                  Sí, Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
