import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import GlobalGuard from "../components/GlobalGuard"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cava Nueve K | Tienda de Vinos",
  description: "E-commerce de vinos exclusivos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${inter.className} bg-cava-bg text-cava-dark min-h-screen`}
      >
        {/* 💡 2. MAGIA: El Guardián ahora envuelve todo. 
            Él se encargará de mostrar el Navbar, el main (children) y el Footer */}
        <GlobalGuard>{children}</GlobalGuard>

        {/* 💡 3. Las alertas elegantes quedan por fuera del guardián para que nunca se bloqueen */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#4A3B32",
              color: "#fff",
              borderRadius: "12px",
              fontFamily: "serif",
            },
            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
