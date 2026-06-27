import AdminGuard from "../../components/AdminGuard";

// 💡 El toque final: Metadatos exclusivos para todo el sector de administración
export const metadata = {
  title: "Panel de Control | Cava Nueve K",
  description:
    "Espacio de gestión de inventario, precios y estadísticas financieras.",
};

export default function AdminLayout({ children }) {
  return (
    // Envolvemos TODO el sector /admin dentro de nuestro Guardián
    <AdminGuard>{children}</AdminGuard>
  );
}
