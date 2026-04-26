import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

function HingeLogo() {
  return (
    <span className="flex items-baseline gap-1 select-none">
      <span className="text-white font-semibold text-xs tracking-[0.2em] uppercase leading-none">THE</span>
      <span
        className="font-black text-2xl italic leading-none"
        style={{
          background: 'linear-gradient(to right, #E8196C, #FF5214)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        hinge
      </span>
      <span className="text-white/60 font-medium text-xs tracking-widest uppercase leading-none ml-1">tickets</span>
    </span>
  );
}

export function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-white/10" style={{ background: 'rgba(15,5,10,0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <HingeLogo />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-zinc-300 hover:text-white text-sm transition-colors">Events</Link>
          <Link to="/cart" className="text-zinc-300 hover:text-white text-sm transition-colors">Warenkorb</Link>
        </nav>
        <button
          onClick={() => navigate('/cart')}
          className="relative flex items-center gap-2 font-semibold px-4 py-2 rounded-full text-sm transition-all text-white hover:opacity-90"
          style={{ background: 'linear-gradient(to right, #E8196C, #FF5214)' }}
        >
          <ShoppingCart className="w-4 h-4" />
          <span className="hidden sm:inline">Warenkorb</span>
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

