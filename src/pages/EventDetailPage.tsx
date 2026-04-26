import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ChevronLeft, ShoppingCart, Plus, Minus } from 'lucide-react';
import { events } from '../data/events';
import { packages } from '../data/packages';
import { useCartStore } from '../store/cartStore';
import { formatDate, formatPrice } from '../utils/formatters';
import { Package } from '../types';

export function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addTicket, addPackage } = useCartStore();

  const event = events.find((e) => e.id === id);
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [selectedPackages, setSelectedPackages] = useState<Record<string, boolean>>({});
  const [added, setAdded] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-2xl font-bold mb-4">Event not found</p>
          <button onClick={() => navigate('/')} className="text-amber-400 hover:underline">Back to events</button>
        </div>
      </div>
    );
  }

  const totalTickets = event.ticketTypes.reduce((sum, tt) => sum + (quantities[tt.id] || 0) * tt.price, 0);
  const totalPackages = packages.reduce((sum, pkg) => sum + (selectedPackages[pkg.id] ? pkg.price : 0), 0);
  const grandTotal = totalTickets + totalPackages;

  const handleAddToCart = () => {
    let hasItems = false;

    event.ticketTypes.forEach((tt) => {
      const qty = quantities[tt.id] || 0;
      if (qty > 0) {
        hasItems = true;
        addTicket({
          type: 'ticket',
          eventId: event.id,
          eventName: event.name,
          eventDate: event.date,
          ticketTypeId: tt.id,
          ticketTypeName: tt.name,
          price: tt.price,
          quantity: qty,
        });
      }
    });

    packages.forEach((pkg) => {
      if (selectedPackages[pkg.id]) {
        hasItems = true;
        addPackage({
          type: 'package',
          packageId: pkg.id,
          packageName: pkg.name,
          price: pkg.price,
          quantity: 1,
          packageType: pkg.type,
        });
      }
    });

    if (hasItems) {
      setAdded(true);
      setTimeout(() => {
        navigate('/cart');
      }, 800);
    }
  };

  const setQty = (ttId: string, delta: number) => {
    setQuantities((q) => ({
      ...q,
      [ttId]: Math.max(0, (q[ttId] || 0) + delta),
    }));
  };

  const togglePackage = (pkgId: string) => {
    setSelectedPackages((sp) => ({ ...sp, [pkgId]: !sp[pkgId] }));
  };

  const merchPackages = packages.filter((p) => p.type === 'merch');
  const drinkPackages = packages.filter((p) => p.type === 'drink');

  return (
    <div className="min-h-screen pb-24">
      <div className="relative h-72 sm:h-96">
        <img src={event.imageUrl} alt={event.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 flex items-center gap-1 text-white/80 hover:text-white text-sm bg-black/40 backdrop-blur px-3 py-1.5 rounded-full transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> All Events
        </button>
        <div className="absolute bottom-6 left-4 right-4 sm:left-8">
          <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {event.genre}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white mt-3">{event.name}</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Date</p>
                    <p className="text-white text-sm font-medium">{formatDate(event.date)}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Time</p>
                    <p className="text-white text-sm font-medium">Doors open {event.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-zinc-500 text-xs uppercase tracking-wide mb-0.5">Venue</p>
                    <p className="text-white text-sm font-medium">{event.venue}</p>
                    <p className="text-zinc-500 text-xs">{event.location}</p>
                  </div>
                </div>
              </div>
              <p className="text-zinc-300 leading-relaxed">{event.description}</p>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-white font-bold text-xl mb-4">Select Tickets</h2>
              <div className="space-y-3">
                {event.ticketTypes.map((tt) => (
                  <div key={tt.id} className="flex items-center justify-between p-4 border border-zinc-700 rounded-xl hover:border-amber-500/50 transition-colors">
                    <div>
                      <p className="text-white font-semibold">{tt.name}</p>
                      <p className="text-zinc-500 text-sm">{tt.description}</p>
                      <p className="text-amber-400 font-bold mt-1">{formatPrice(tt.price)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setQty(tt.id, -1)} className="w-8 h-8 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-colors">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-white w-6 text-center font-medium">{quantities[tt.id] || 0}</span>
                      <button onClick={() => setQty(tt.id, 1)} className="w-8 h-8 rounded-full border border-zinc-600 flex items-center justify-center text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h2 className="text-white font-bold text-xl mb-1">Upgrade Your Night</h2>
              <p className="text-zinc-500 text-sm mb-5">Add merchandise or drink packages to your order</p>

              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">🎁 Merchandise</h3>
              <div className="space-y-3 mb-6">
                {merchPackages.map((pkg) => (
                  <PackageToggle key={pkg.id} pkg={pkg} selected={!!selectedPackages[pkg.id]} onToggle={() => togglePackage(pkg.id)} />
                ))}
              </div>

              <h3 className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-3">🍺 Drink Packages</h3>
              <div className="space-y-3">
                {drinkPackages.map((pkg) => (
                  <PackageToggle key={pkg.id} pkg={pkg} selected={!!selectedPackages[pkg.id]} onToggle={() => togglePackage(pkg.id)} />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
              <h3 className="text-white font-bold text-lg mb-4">Order Summary</h3>
              {event.ticketTypes.map((tt) => (
                (quantities[tt.id] || 0) > 0 && (
                  <div key={tt.id} className="flex justify-between text-sm mb-2">
                    <span className="text-zinc-400">{tt.name} × {quantities[tt.id]}</span>
                    <span className="text-white">{formatPrice(tt.price * (quantities[tt.id] || 0))}</span>
                  </div>
                )
              ))}
              {packages.filter((p) => selectedPackages[p.id]).map((pkg) => (
                <div key={pkg.id} className="flex justify-between text-sm mb-2">
                  <span className="text-zinc-400">{pkg.name}</span>
                  <span className="text-white">{formatPrice(pkg.price)}</span>
                </div>
              ))}
              {grandTotal > 0 && (
                <div className="border-t border-zinc-700 mt-4 pt-4 flex justify-between">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-amber-400 font-bold text-lg">{formatPrice(grandTotal)}</span>
                </div>
              )}
              <button
                onClick={handleAddToCart}
                disabled={grandTotal === 0 || added}
                className="w-full mt-5 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 disabled:text-zinc-500 text-black font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                {added ? 'Added! Going to cart...' : 'Add to Cart'}
              </button>
              {grandTotal === 0 && (
                <p className="text-zinc-600 text-xs text-center mt-2">Select at least one ticket or package</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageToggle({ pkg, selected, onToggle }: { pkg: Package; selected: boolean; onToggle: () => void }) {
  return (
    <div
      onClick={onToggle}
      className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
        selected ? 'border-amber-500 bg-amber-500/10' : 'border-zinc-700 hover:border-zinc-500'
      }`}
    >
      <div className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${
        selected ? 'border-amber-500 bg-amber-500' : 'border-zinc-600'
      }`}>
        {selected && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="text-white font-semibold text-sm">{pkg.name}</p>
          <p className="text-amber-400 font-bold text-sm flex-shrink-0">{formatPrice(pkg.price)}</p>
        </div>
        <p className="text-zinc-500 text-xs mt-0.5">{pkg.description}</p>
        <ul className="mt-1.5 space-y-0.5">
          {pkg.items.map((item, i) => (
            <li key={i} className="text-zinc-400 text-xs flex items-center gap-1">
              <span className="text-amber-500">·</span> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
