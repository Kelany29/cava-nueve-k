"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError("");
    setLoading(true);

    try {
      // Llamamos a tu backend real
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al registrarse");
      }

      // Si sale bien, lo mandamos a que inicie sesión
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      router.push("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-cava-brown/20 w-full max-w-md">
        <h1 className="text-3xl font-serif font-bold text-cava-dark mb-2 text-center">
          Crear Cuenta
        </h1>
        <p className="text-cava-brown text-center mb-8">
          Únete a nuestra cava exclusiva
        </p>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-cava-dark mb-1 block">
              Nombre completo
            </label>
            <input
              type="text"
              required
              className="w-full p-3 rounded-lg border border-cava-brown/30 bg-cava-bg focus:outline-none focus:border-cava-brown transition-colors"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-cava-dark mb-1 block">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              className="w-full p-3 rounded-lg border border-cava-brown/30 bg-cava-bg focus:outline-none focus:border-cava-brown transition-colors"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-cava-dark mb-1 block">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full p-3 rounded-lg border border-cava-brown/30 bg-cava-bg focus:outline-none focus:border-cava-brown transition-colors"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cava-brown text-white font-bold py-3 rounded-lg mt-2 hover:bg-cava-dark transition-colors disabled:opacity-50"
          >
            {loading ? "Creando..." : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-cava-dark mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            href="/login"
            className="text-cava-brown font-bold hover:underline"
          >
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
