/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cava: {
          bg: "#FAFAF9", // Marfil suave (Fondo principal)
          brown: "#8C7A6B", // Marrón visón (Botones y Navbar)
          dark: "#292524", // Gris carbón (Textos)
          rose: "#E6D3D3", // Rosa pastel (Acentos)
        },
      },
    },
  },
  plugins: [],
};
