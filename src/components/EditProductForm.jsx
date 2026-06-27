"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import toast from "react-hot-toast"; // 💡 1. Importamos la librería de notificaciones

export default function EditProductForm({ product }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: product.name,
    winery: product.winery,
    category: product.category,
    strain: product.strain || "",
    price: product.price,
    stock: product.stock,
    year: product.year || "",
    alcoholContent: product.alcoholContent || "",
    imageUrl: product.imageUrl,
    description: product.description || "",
    aroma: product.aroma || "",
    pairing: product.pairing || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("cava-token");
    if (!token) {
      toast.error("No tienes permiso. Inicia sesión como administradora."); // 💡 Reemplazo de alert()
      return;
    }

    // 💡 2. Iniciamos el cartel de carga
    const toastId = toast.loading("Guardando cambios en el servidor...");

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock) || 0,
          year: formData.year ? parseInt(formData.year) : null,
          alcoholContent: formData.alcoholContent
            ? parseFloat(formData.alcoholContent)
            : null,
        }),
      });

      if (res.ok) {
        // 💡 3. Actualizamos el cartel de carga a un mensaje de éxito verde
        toast.success("✅ ¡Vino actualizado correctamente!", { id: toastId });
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(`❌ Error al actualizar: ${data.error}`, { id: toastId });
      }
    } catch (error) {
      console.error(error);
      toast.error("Hubo un problema de conexión con el servidor.", {
        id: toastId,
      });
    }
  };

  return (
    <div className="mt-10 max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-cava-brown/10 mb-10">
      <div className="flex items-center gap-4 mb-8 border-b border-cava-brown/20 pb-4">
        <Link
          href="/admin"
          className="text-cava-brown hover:text-cava-dark transition-colors"
        >
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-cava-dark">
            Editar Vino: {product.name}
          </h1>
          <p className="text-sm text-cava-brown">
            Modifica los valores del producto seleccionado.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Sección 1: Datos Básicos */}
        <div className="bg-cava-bg/30 p-6 rounded-xl border border-cava-brown/10">
          <h2 className="text-lg font-bold text-cava-dark mb-4">
            1. Datos Básicos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Nombre del Vino *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Bodega *
              </label>
              <input
                type="text"
                name="winery"
                required
                value={formData.winery}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Categoría *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="p-2 border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-cava-brown"
              >
                <option value="Tinto">Tinto</option>
                <option value="Blanco">Blanco</option>
                <option value="Rosado">Rosado</option>
                <option value="Espumante">Espumante</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Cepa
              </label>
              <input
                type="text"
                name="strain"
                value={formData.strain}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
          </div>
        </div>

        {/* Sección 2: Inventario */}
        <div className="bg-cava-bg/30 p-6 rounded-xl border border-cava-brown/10">
          <h2 className="text-lg font-bold text-cava-dark mb-4">
            2. Inventario y Especificaciones
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Precio ($) *
              </label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="p-2 border rounded-md font-bold text-cava-dark focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                required
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Año
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Alcohol (%)
              </label>
              <input
                type="number"
                name="alcoholContent"
                step="0.1"
                value={formData.alcoholContent}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
          </div>
        </div>

        {/* Sección 3: Multimedia y Detalles */}
        <div className="bg-cava-bg/30 p-6 rounded-xl border border-cava-brown/10">
          <h2 className="text-lg font-bold text-cava-dark mb-4">
            3. Presentación y Notas
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                URL de la Foto *
              </label>
              <input
                type="text"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-cava-dark uppercase">
                  Aroma
                </label>
                <input
                  type="text"
                  name="aroma"
                  value={formData.aroma}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-semibold text-cava-dark uppercase">
                  Maridaje
                </label>
                <input
                  type="text"
                  name="pairing"
                  value={formData.pairing}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-cava-brown"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Descripción completa
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="p-2 border rounded-md resize-none focus:outline-none focus:ring-1 focus:ring-cava-brown"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-cava-brown text-white p-4 rounded-xl hover:bg-cava-dark transition-colors font-bold text-lg shadow-sm"
        >
          <Save size={20} />
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
