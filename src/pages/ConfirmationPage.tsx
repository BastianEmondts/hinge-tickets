import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Ticket, Home } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Order } from '../types';
import { formatPrice } from '../utils/formatters';
import { useRef } from 'react';

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;
  const qrRef = useRef<HTMLDivElement>(null);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-white text-xl font-bold">No order found</p>
        <button onClick={() => navigate('/')} className="text-amber-400 hover:underline">Back to events</button>
      </div>
    );
  }

  const qrData = JSON.stringify({
    orderId: order.id,
    customer: order.customer.name,
    email: order.customer.email,
    total: order.total,
    items: order.items.length,
  });

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `${order.id}-ticket.png`;
      a.click();
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
        <CheckCircle className="w-10 h-10 text-green-400" />
      </div>

      <h1 className="text-4xl font-black text-white mb-3">You're in! 🎉</h1>
      <p className="text-zinc-400 mb-2">Order <span className="text-amber-400 font-mono font-bold">{order.id}</span> confirmed</p>

      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-10">
        <Mail className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-sm">A confirmation email would be sent to <strong>{order.customer.email}</strong> (demo)</span>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-6">
        <h2 className="text-white font-bold text-lg mb-6">Your Entry QR Code</h2>
        <div ref={qrRef} className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-xl inline-block">
            <QRCodeCanvas value={qrData} size={200} level="H" />
          </div>
        </div>
        <p className="text-zinc-500 text-sm mb-4">Present this QR code at the venue entrance</p>
        <button
          onClick={handleDownloadQR}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-medium px-5 py-2.5 rounded-xl transition-colors mx-auto"
        >
          <Download className="w-4 h-4" />
          Download QR Code
        </button>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6 text-left">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Ticket className="w-4 h-4 text-amber-400" /> Order Details</h3>
        <div className="space-y-2 mb-4">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-zinc-400">
                {item.type === 'ticket' ? `${item.eventName} — ${item.ticketTypeName}` : item.packageName}
                {' '}× {item.quantity}
              </span>
              <span className="text-white">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-700 pt-3 flex justify-between font-bold">
          <span className="text-white">Total Paid</span>
          <span className="text-amber-400">{formatPrice(order.total)}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-zinc-500">Name</span>
            <p className="text-white">{order.customer.name}</p>
          </div>
          <div>
            <span className="text-zinc-500">Email</span>
            <p className="text-white">{order.customer.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Order ID</span>
            <p className="text-amber-400 font-mono">{order.id}</p>
          </div>
          <div>
            <span className="text-zinc-500">Date</span>
            <p className="text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold px-8 py-3 rounded-full transition-colors"
      >
        <Home className="w-4 h-4" />
        Back to Events
      </button>
    </div>
  );
}
