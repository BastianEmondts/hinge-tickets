import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Ticket } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItemRow } from '../components/CartItemRow';
import { formatPrice } from '../utils/formatters';

export function CartPage() {
  const { items, getTotal } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
          <ShoppingCart className="w-8 h-8 text-zinc-600" />
        </div>
        <div className="text-center">
          <h2 className="text-white font-bold text-2xl mb-2">Your cart is empty</h2>
          <p className="text-zinc-500">Add tickets to get started</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-6 py-3 rounded-full transition-colors"
        >
          <Ticket className="w-4 h-4" />
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white mb-8">Your Cart</h1>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6">
        {items.map((item, i) => (
          <CartItemRow key={i} item={item} />
        ))}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-400">Subtotal</span>
          <span className="text-white">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-400">Service fee</span>
          <span className="text-white">{formatPrice(total * 0.05)}</span>
        </div>
        <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between items-center">
          <span className="text-white font-bold text-lg">Total</span>
          <span className="text-amber-400 font-black text-2xl">{formatPrice(total * 1.05)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-6 bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
        >
          Proceed to Checkout <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
