import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
export type Cart = {
  id: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
  rentalDate?: string;
  startTime?: string;
  endTime?: string;
};
interface CartState {
  cart: Cart[];
  addToCart: (item: Cart) => void;
  removeFromCart: (item: Cart) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        addToCart: (item) =>
          set((state) => {
            const findItem = state.cart.find(
              (i) =>
                i.id === item.id &&
                item.rentalDate === i.rentalDate &&
                item.startTime === i.startTime &&
                item.endTime === i.endTime
            );
            if (findItem) {
              return {
                cart: state.cart.map((i) =>
                  i.id === findItem.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            } else {
              return { cart: [...state.cart, item] };
            }
          }),
        removeFromCart: (item) =>
          set((state) => ({
            cart: state.cart.filter(
              (i) =>
                i.id !== item.id ||
                i.rentalDate !== item.rentalDate ||
                i.startTime !== item.startTime ||
                i.endTime !== item.endTime
            ),
          })),
        clearCart: () => set({ cart: [] }),
      }),
      { name: 'cartStore' }
    )
  )
);
export default useCartStore;
