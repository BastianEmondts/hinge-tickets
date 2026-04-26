import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { formatPrice, generateOrderId } from '../utils/formatters';
import { Order } from '../types';

export function CheckoutPage() {
  const { items, customer, setCustomer, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const total = getTotal();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customer.name.trim()) newErrors.name = 'Name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!customer.phone.trim()) newErrors.phone = 'Phone is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const order: Order = {
      id: generateOrderId(),
      items: [...items],
      customer: { ...customer },
      total: total * 1.05,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      clearCart();
      navigate('/confirmation', { state: { order } });
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-black text-white mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-6">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-white font-bold text-lg mb-5">Your Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="Your full name"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1.5">Email Address *</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                  placeholder="+31 6 12345678"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Payment - Stripe Placeholder */}
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
            <h2 className="text-white font-bold text-lg mb-2">Payment</h2>
            <p className="text-zinc-500 text-sm mb-5">
              {/* STRIPE INTEGRATION PLACEHOLDER */}
              {/* Replace this section with Stripe Elements or Stripe Checkout */}
              Secure payment powered by Stripe
            </p>

            <div className="border-2 border-dashed border-zinc-700 rounded-xl p-6 text-center bg-zinc-800/50">
              <CreditCard className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium mb-1">Stripe Payment Element</p>
              <p className="text-zinc-600 text-sm">
                {/* TODO: Initialize Stripe with your publishable key and mount Stripe Elements here */}
                This is a placeholder — integrate Stripe Elements or redirect to Stripe Checkout
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-left">
                <div>
                  <label className="block text-zinc-500 text-xs mb-1">Card Number</label>
                  <div className="bg-zinc-700 rounded-lg px-3 py-2.5 text-zinc-500 text-sm">•••• •••• •••• ••••</div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-xs mb-1">Expiry</label>
                  <div className="bg-zinc-700 rounded-lg px-3 py-2.5 text-zinc-500 text-sm">MM / YY</div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-xs mb-1">CVC</label>
                  <div className="bg-zinc-700 rounded-lg px-3 py-2.5 text-zinc-500 text-sm">•••</div>
                </div>
                <div>
                  <label className="block text-zinc-500 text-xs mb-1">Name on Card</label>
                  <div className="bg-zinc-700 rounded-lg px-3 py-2.5 text-zinc-500 text-sm">Cardholder</div>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-700 text-black disabled:text-zinc-500 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
          >
            <Lock className="w-5 h-5" />
            {loading ? 'Processing...' : `Pay ${formatPrice(total * 1.05)}`}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </button>
          <p className="text-zinc-600 text-xs text-center">
            By completing purchase you agree to our Terms & Conditions. This is a demo — no real payment is taken.
          </p>
        </form>

        <div className="lg:col-span-2">
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sticky top-20">
            <h3 className="text-white font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-zinc-400">
                    {item.type === 'ticket' ? `${item.eventName} — ${item.ticketTypeName}` : item.packageName}
                    {' '}× {item.quantity}
                  </span>
                  <span className="text-white">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-zinc-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Subtotal</span>
                <span className="text-white">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Service fee (5%)</span>
                <span className="text-white">{formatPrice(total * 0.05)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t border-zinc-700">
                <span className="text-white">Total</span>
                <span className="text-amber-400 text-lg">{formatPrice(total * 1.05)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
