"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, ShieldCheck, LogOut, Menu, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // 💡 Nuevo estado para controlar si el menú de celular está abierto o cerrado
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem("cava-token");

    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.role === "ADMIN") {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error("Error leyendo token en Navbar");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cava-token");
    clearCart();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setIsMobileMenuOpen(false); // Cierra el menú móvil al salir
    router.push("/login");
  };

  // Función para cerrar el menú móvil cuando se hace clic en un enlace
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-cava-bg border-b border-cava-brown/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
          <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-white p-1 shadow-sm border border-cava-brown/10 group-hover:scale-105 transition-transform">
            <img
              src="./logo.jpeg"
              alt="Cava Nueve K Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-serif font-bold text-cava-dark tracking-wider leading-none">
              CAVA <span className="text-cava-brown">NUEVE K</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-cava-brown font-semibold mt-1">
              Vinoteca Exclusiva
            </span>
          </div>
        </Link>

        {/* ENLACES DE ESCRITORIO (Ocultos en celular) */}
        <div className="hidden md:flex gap-6 items-center text-cava-dark">
          <Link href="/" className="hover:text-cava-brown font-medium transition-colors">Catálogo</Link>
          <Link href="/about" className="hover:text-cava-brown font-medium transition-colors">Historia</Link>
          <Link href="/reviews" className="hover:text-cava-brown font-medium transition-colors">Reseñas</Link>
          <Link href="/contact" className="hover:text-cava-brown font-medium transition-colors">Contacto</Link>
          {isMounted && isLoggedIn && (
            <Link href="/orders" className="hover:text-cava-brown font-medium transition-colors">Mis Compras</Link>
          )}
        </div>

        {/* ÍCONOS DE ACCIÓN (Visibles siempre) */}
        <div className="flex gap-2 sm:gap-4 items-center text-cava-dark">
          {isMounted && isAdmin && (
            <Link
              href="/admin"
              className="hidden md:flex hover:text-cava-brown transition-colors items-center gap-1 font-medium bg-cava-rose/30 px-3 py-1 rounded-lg"
            >
              <ShieldCheck size={20} />
              <span className="text-sm font-bold text-cava-dark">Panel Admin</span>
            </Link>
          )}

          <div className="hidden md:block h-6 w-[1px] bg-cava-brown/20 mx-1"></div>

          <Link href="/cart" className="relative p-2 hover:bg-cava-brown/10 rounded-full transition-colors" onClick={closeMobileMenu}>
            <ShoppingCart size={24} />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-cava-rose text-cava-dark text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border border-cava-bg">
                {totalItems}
              </span>
            )}
          </Link>

          {isMounted && isLoggedIn ? (
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors" title="Cerrar Sesión">
              <LogOut size={22} />
            </button>
          ) : (
            <Link href="/login" className="p-2 hover:bg-cava-brown/10 rounded-full transition-colors hidden md:block" title="Iniciar Sesión">
              <User size={22} />
            </Link>
          )}

          {/* 💡 BOTÓN HAMBURGUESA PARA CELULARES */}
          <button
            className="md:hidden p-2 hover:bg-cava-brown/10 rounded-full transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 💡 MENÚ DESPLEGABLE PARA CELULARES */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-cava-bg border-b border-cava-brown/20 shadow-lg py-4 px-6 flex flex-col gap-4 text-cava-dark font-medium">
          <Link href="/" onClick={closeMobileMenu} className="hover:text-cava-brown transition-colors">Catálogo</Link>
          <Link href="/about" onClick={closeMobileMenu} className="hover:text-cava-brown transition-colors">Historia</Link>
          <Link href="/reviews" onClick={closeMobileMenu} className="hover:text-cava-brown transition-colors">Reseñas</Link>
          <Link href="/contact" onClick={closeMobileMenu} className="hover:text-cava-brown transition-colors">Contacto</Link>
          
          {isMounted && isLoggedIn && (
            <Link href="/orders" onClick={closeMobileMenu} className="hover:text-cava-brown transition-colors">Mis Compras</Link>
          )}

          {isMounted && isAdmin && (
            <Link href="/admin" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-cava-brown transition-colors text-cava-brown font-bold">
              <ShieldCheck size={20} />
              Panel de Administrador
            </Link>
          )}

          {!isLoggedIn && (
            <Link href="/login" onClick={closeMobileMenu} className="flex items-center gap-2 hover:text-cava-brown transition-colors mt-2 pt-2 border-t border-cava-brown/20">
              <User size={20} />
              Iniciar Sesión
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}