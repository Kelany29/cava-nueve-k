"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, ShieldCheck, LogOut } from "lucide-react";
import { useCartStore } from "../store/cartStore";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [isMounted, setIsMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    router.push("/login");
  };

  if (pathname === "/login" || pathname === "/register") {
    return null;
  }

  return (
    <nav className="bg-cava-bg border-b border-cava-brown/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* 💡 SECCIÓN DEL LOGO CORREGIDA */}
        <Link href="/" className="flex items-center gap-3 group">
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

        <div className="flex gap-4 sm:gap-6 items-center text-cava-dark">
          <Link
            href="/"
            className="hover:text-cava-brown font-medium transition-colors hidden md:block"
          >
            Catálogo
          </Link>

          <Link
            href="/about"
            className="hover:text-cava-brown font-medium transition-colors hidden md:block"
          >
            Historia
          </Link>

          <Link
            href="/reviews"
            className="hover:text-cava-brown font-medium transition-colors hidden md:block"
          >
            Reseñas
          </Link>

          <Link
            href="/contact"
            className="hover:text-cava-brown font-medium transition-colors hidden md:block"
          >
            Contacto
          </Link>

          {isMounted && isAdmin && (
            <Link
              href="/admin"
              className="hover:text-cava-brown transition-colors flex items-center gap-1 font-medium bg-cava-rose/30 px-3 py-1 rounded-lg"
            >
              <ShieldCheck size={20} />
              <span className="hidden lg:inline text-sm font-bold text-cava-dark">
                Panel Admin
              </span>
            </Link>
          )}

          <div className="h-6 w-[1px] bg-cava-brown/20 mx-1"></div>

          <Link
            href="/cart"
            className="relative p-2 hover:bg-cava-brown/10 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {isMounted && totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-cava-rose text-cava-dark text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm border border-cava-bg">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 💡 SECCIÓN MIS COMPRAS */}
          {isMounted && isLoggedIn && (
            <Link
              href="/orders"
              className="text-cava-dark hover:text-cava-brown font-medium transition-colors hidden md:block"
            >
              Mis Compras
            </Link>
          )}

          {isMounted && isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut size={22} />
            </button>
          ) : (
            <Link
              href="/login"
              className="p-2 hover:bg-cava-brown/10 rounded-full transition-colors"
              title="Iniciar Sesión"
            >
              <User size={22} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
