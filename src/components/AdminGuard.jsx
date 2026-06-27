"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // 1. Buscamos el token en la memoria
    const token = localStorage.getItem("cava-token");

    // 2. Si no hay token, lo mandamos a loguearse
    if (!token) {
      router.push("/login");
      return;
    }

    try {
      // 3. Magia de JS: Leemos la información que está dentro del Token (Payload)
      // Los JWT tienen 3 partes separadas por puntos. La del medio [1] tiene los datos.
      const payloadBase64 = token.split(".")[1];
      const decodedPayload = JSON.parse(atob(payloadBase64));

      // 4. Verificamos el Rol
      if (decodedPayload.role !== "ADMIN") {
        // Si es un usuario común (como Tom o Lisa), lo devolvemos al catálogo
        router.push("/");
      } else {
        // Si es Administrador, le abrimos la puerta
        setIsAuthorized(true);
      }
    } catch (error) {
      console.error("Token corrupto", error);
      localStorage.removeItem("cava-token"); // Limpiamos la basura
      router.push("/login");
    }
  }, [router]);

  // Mientras decide si lo deja pasar o no, mostramos una pantalla en blanco o un textito
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cava-bg">
        <p className="text-cava-brown font-serif text-xl animate-pulse">
          Verificando credenciales...
        </p>
      </div>
    );
  }

  // Si pasó la prueba, renderizamos la página que quería ver
  return <>{children}</>;
}
