import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Ticket } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Ticket className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
          <span className="text-white font-bold text-lg tracking-tight">
            the <span className="text-amber-400">hinge</span> tickets
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-zinc-400 hover:text-white text-sm transition-colors">Events</Link>
          <Link to="/cart" className="text-zinc-400 hover:text-white text-sm transition-colors">Cart</Link>
        </nav>
        <button
          onClick={() => navigate('/cart')}
          className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2 rounded-full text-sm transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Cart</span>
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
