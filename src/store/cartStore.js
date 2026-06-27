import { create } from "zustand";
import { persist } from "zustand/middleware"; // 💡 Importamos la magia de la persistencia

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      // 1. Sumar un vino al carrito
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id,
          );
          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      // 2. Restar cantidad (siempre y cuando sea mayor a 1)
      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      // 3. Eliminar el vino del carrito por completo
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      // 4. NUEVO: Vaciar el carrito de golpe (Lo usaremos al cobrar)
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cava-cart-storage", // 💡 El nombre con el que se guardará en el navegador
    },
  ),
);
