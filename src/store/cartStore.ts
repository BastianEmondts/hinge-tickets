import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CustomerDetails } from '../types';

interface CartState {
  items: CartItem[];
  customer: CustomerDetails;
  addTicket: (item: CartItem & { type: 'ticket' }) => void;
  addPackage: (item: CartItem & { type: 'package' }) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  setCustomer: (customer: CustomerDetails) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

function getItemKey(item: CartItem): string {
  if (item.type === 'ticket') {
    return `ticket-${item.eventId}-${item.ticketTypeId}`;
  }
  return `package-${item.packageId}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      customer: { name: '', email: '', phone: '' },

      addTicket: (item) => {
        set((state) => {
          const existing = state.items.findIndex(
            (i) => i.type === 'ticket' && i.eventId === item.eventId && i.ticketTypeId === item.ticketTypeId
          );
          if (existing >= 0) {
            const updated = [...state.items];
            updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + item.quantity };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        });
      },

      addPackage: (item) => {
        set((state) => {
          const existing = state.items.findIndex(
            (i) => i.type === 'package' && i.packageId === item.packageId
          );
          if (existing >= 0) {
            const updated = [...state.items];
            updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + item.quantity };
            return { items: updated };
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (key) => {
        set((state) => ({
          items: state.items.filter((item) => getItemKey(item) !== key),
        }));
      },

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) {
          get().removeItem(key);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            getItemKey(item) === key ? { ...item, quantity } : item
          ),
        }));
      },

      setCustomer: (customer) => set({ customer }),

      clearCart: () => set({ items: [], customer: { name: '', email: '', phone: '' } }),

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
    }),
    {
      name: 'hinge-cart',
    }
  )
);

export { getItemKey };
