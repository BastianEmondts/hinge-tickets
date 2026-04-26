import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowRight, Ticket } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { CartItemRow } from '../components/CartItemRow';
import { formatPrice } from '../utils/formatters';

const gradientBg = { background: 'linear-gradient(to right, #E8196C, #FF5214)' };

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
          <h2 className="text-white font-bold text-2xl mb-2">Dein Warenkorb ist leer</h2>
          <p className="text-zinc-500">Füge Tickets hinzu und leg los</p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white font-bold px-6 py-3 rounded-full transition-all hover:opacity-90"
          style={gradientBg}
        >
          <Ticket className="w-4 h-4" />
          Events entdecken
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white mb-8">Dein Warenkorb</h1>
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6">
        {items.map((item, i) => (
          <CartItemRow key={i} item={item} />
        ))}
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-400">Zwischensumme</span>
          <span className="text-white">{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-zinc-400">Servicegebühr</span>
          <span className="text-white">{formatPrice(total * 0.05)}</span>
        </div>
        <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between items-center">
          <span className="text-white font-bold text-lg">Gesamt</span>
          <span className="font-black text-2xl" style={{ color: '#FF5214' }}>{formatPrice(total * 1.05)}</span>
        </div>
        <button
          onClick={() => navigate('/checkout')}
          className="w-full mt-6 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 text-lg hover:opacity-90"
          style={gradientBg}
        >
          Zur Kasse <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

