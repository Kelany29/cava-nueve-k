"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();

  // Estado ampliado para coincidir con tu base de datos completa
  const [formData, setFormData] = useState({
    name: "",
    winery: "",
    category: "Tinto",
    strain: "",
    price: "",
    stock: "0",
    year: "",
    volume: "750",
    alcoholContent: "",
    imageUrl: "",
    description: "",
    aroma: "",
    pairing: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("cava-token");
    if (!token) {
      alert("No tienes permiso. Inicia sesión como administradora.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ ¡Vino guardado exitosamente en el inventario!");
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        alert(`❌ Error del servidor: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Hubo un problema de conexión con el servidor.");
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
            Añadir Nuevo Vino
          </h1>
          <p className="text-sm text-cava-brown">
            Completa los detalles para sumar una nueva botella al catálogo.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* SECCIÓN 1: Datos Básicos */}
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
                className="p-2 border rounded-md"
                placeholder="Ej: Rutini Collection"
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
                className="p-2 border rounded-md"
                placeholder="Ej: Rutini Wines"
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
                className="p-2 border rounded-md bg-white"
              >
                <option value="Tinto">Tinto</option>
                <option value="Blanco">Blanco</option>
                <option value="Rosado">Rosado</option>
                <option value="Espumante">Espumante</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Cepa (Ej: Malbec)
              </label>
              <input
                type="text"
                name="strain"
                value={formData.strain}
                onChange={handleChange}
                className="p-2 border rounded-md"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: Ventas y Especificaciones */}
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
                className="p-2 border rounded-md"
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
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-cava-dark uppercase">
                Año (Cosecha)
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="p-2 border rounded-md"
                placeholder="Ej: 2021"
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
                className="p-2 border rounded-md"
                placeholder="Ej: 13.5"
              />
            </div>
          </div>
        </div>

        {/* SECCIÓN 3: Multimedia y Cata */}
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
                className="p-2 border rounded-md"
                placeholder="https://..."
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
                  className="p-2 border rounded-md"
                  placeholder="Frutos rojos, roble..."
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
                  className="p-2 border rounded-md"
                  placeholder="Carnes rojas, pastas..."
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
                className="p-2 border rounded-md resize-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex justify-center items-center gap-2 bg-cava-brown text-white p-4 rounded-xl hover:bg-cava-dark transition-colors font-bold text-lg shadow-sm"
        >
          <Save size={20} />
          Guardar Producto en Base de Datos
        </button>
      </form>
    </div>
  );
}
