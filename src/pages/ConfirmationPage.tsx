import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Ticket, Home } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Order } from '../types';
import { formatPrice } from '../utils/formatters';
import { useRef } from 'react';

const gradientBg = { background: 'linear-gradient(to right, #E8196C, #FF5214)' };
const accentColor = { color: '#FF5214' };

export function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order as Order | undefined;
  const qrRef = useRef<HTMLDivElement>(null);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-white text-xl font-bold">Keine Bestellung gefunden</p>
        <button onClick={() => navigate('/')} className="hover:underline" style={accentColor}>Zurück zu den Events</button>
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

      <h1 className="text-4xl font-black text-white mb-3">Du bist dabei! 🎉</h1>
      <p className="text-zinc-400 mb-2">Bestellung <span className="font-mono font-bold" style={accentColor}>{order.id}</span> bestätigt</p>

      <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-10">
        <Mail className="w-4 h-4 text-blue-400" />
        <span className="text-blue-400 text-sm">Eine Bestätigungs-E-Mail würde an <strong>{order.customer.email}</strong> gesendet (Demo)</span>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 mb-6">
        <h2 className="text-white font-bold text-lg mb-6">Dein Einlass-QR-Code</h2>
        <div ref={qrRef} className="flex justify-center mb-6">
          <div className="bg-white p-4 rounded-xl inline-block">
            <QRCodeCanvas value={qrData} size={200} level="H" />
          </div>
        </div>
        <p className="text-zinc-500 text-sm mb-4">Zeige diesen QR-Code am Eingang der Veranstaltung vor</p>
        <button
          onClick={handleDownloadQR}
          className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-medium px-5 py-2.5 rounded-xl transition-colors mx-auto"
        >
          <Download className="w-4 h-4" />
          QR-Code herunterladen
        </button>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 mb-6 text-left">
        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
          <Ticket className="w-4 h-4" style={accentColor} /> Bestelldetails
        </h3>
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
          <span className="text-white">Gesamtbetrag</span>
          <span style={accentColor}>{formatPrice(order.total)}</span>
        </div>
        <div className="mt-4 pt-4 border-t border-zinc-700 grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-zinc-500">Name</span>
            <p className="text-white">{order.customer.name}</p>
          </div>
          <div>
            <span className="text-zinc-500">E-Mail</span>
            <p className="text-white">{order.customer.email}</p>
          </div>
          <div>
            <span className="text-zinc-500">Bestellnummer</span>
            <p className="font-mono" style={accentColor}>{order.id}</p>
          </div>
          <div>
            <span className="text-zinc-500">Datum</span>
            <p className="text-white">{new Date(order.createdAt).toLocaleDateString('de-DE')}</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate('/')}
        className="inline-flex items-center gap-2 text-white font-bold px-8 py-3 rounded-full transition-all hover:opacity-90"
        style={gradientBg}
      >
        <Home className="w-4 h-4" />
        Zurück zu den Events
      </button>
    </div>
  );
}

