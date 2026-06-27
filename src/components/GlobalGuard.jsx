"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function GlobalGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  // Detectamos si el usuario está en la pantalla de login o registro
  const isAuthPage = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    const token = localStorage.getItem("cava-token");

    // Si NO hay token y NO está intentando loguearse o registrarse...
    if (!token && !isAuthPage) {
      // Lo pateamos sin piedad a la pantalla de login
      router.replace("/login");
    } else {
      // Si todo está en orden, dejamos de revisar
      setIsChecking(false);
    }
  }, [pathname, router]);

  // Mientras verifica la seguridad, mostramos un fondo limpio (evita pantallazos de información)
  if (isChecking) {
    return <div className="min-h-screen bg-cava-bg"></div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 💡 MAGIA: Si está en Login o Register, ocultamos la barra de navegación superior */}
      {!isAuthPage && <Navbar />}

      {/* El contenido de la página */}
      <main
        className={
          isAuthPage
            ? "flex-grow flex flex-col"
            : "max-w-7xl mx-auto p-6 flex-grow w-full"
        }
      >
        {children}
      </main>

      {/* 💡 MAGIA: Si está en Login o Register, también ocultamos el Footer */}
      {!isAuthPage && (
        <footer className="bg-cava-dark text-white/80 py-8 mt-auto border-t border-cava-brown">
          <div className="max-w-7xl mx-auto px-6 text-center text-sm flex flex-col items-center gap-1">
            <p className="font-serif text-xl mb-1 text-white font-bold tracking-widest">
              CAVA <span className="text-cava-brown">NUEVE K</span>
            </p>
            <p className="mb-4 text-white/80">
              Experiencia y exclusividad en cada botella.
            </p>

            <div className="flex flex-col gap-1 mt-2 text-white/50">
              <p>© 2026 Cava Nueve K. Todos los derechos reservados.</p>
              <p>
                Diseñado y desarrollado por{" "}
                <span className="text-cava-brown font-bold tracking-wide">
                  Kelany Blanco
                </span>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
