import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../types';
import { formatPrice } from '../utils/formatters';
import { useCartStore, getItemKey } from '../store/cartStore';

interface Props {
  item: CartItem;
}

export function CartItemRow({ item }: Props) {
  const { updateQuantity, removeItem } = useCartStore();
  const key = getItemKey(item);

  const label = item.type === 'ticket'
    ? `${item.eventName} — ${item.ticketTypeName}`
    : item.packageName;

  const sublabel = item.type === 'ticket'
    ? item.eventDate
    : item.packageType === 'merch' ? '🎁 Merchandise' : '🍺 Drink Package';

  return (
    <div className="flex items-center gap-4 py-4 border-b border-zinc-800 last:border-0">
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">{label}</p>
        <p className="text-zinc-500 text-sm">{sublabel}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => updateQuantity(key, item.quantity - 1)}
          className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-white w-5 text-center text-sm font-medium">{item.quantity}</span>
        <button
          onClick={() => updateQuantity(key, item.quantity + 1)}
          className="w-7 h-7 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
      <div className="text-right min-w-[80px]">
        <p className="text-white font-semibold">{formatPrice(item.price * item.quantity)}</p>
        <p className="text-zinc-500 text-xs">{formatPrice(item.price)} each</p>
      </div>
      <button
        onClick={() => removeItem(key)}
        className="text-zinc-600 hover:text-red-400 transition-colors ml-1"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
