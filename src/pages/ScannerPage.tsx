import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats, Html5QrcodeScannerState } from 'html5-qrcode';
import { CheckCircle, XCircle, Camera, RotateCcw, ScanLine } from 'lucide-react';
import { formatPrice } from '../utils/formatters';

const gradientBg = { background: 'linear-gradient(to right, #E8196C, #FF5214)' };
const accentColor = { color: '#FF5214' };

interface TicketData {
  orderId: string;
  customer: string;
  email: string;
  total: number;
  items: number;
}

type ScanState = 'idle' | 'scanning' | 'valid' | 'invalid';

function parseTicketData(raw: string): TicketData | null {
  try {
    const data = JSON.parse(raw);
    if (
      typeof data.orderId === 'string' &&
      typeof data.customer === 'string' &&
      typeof data.email === 'string' &&
      typeof data.total === 'number' &&
      typeof data.items === 'number'
    ) {
      return data as TicketData;
    }
    return null;
  } catch {
    return null;
  }
}

export function ScannerPage() {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [ticketData, setTicketData] = useState<TicketData | null>(null);
  const [rawValue, setRawValue] = useState('');
  const [error, setError] = useState('');
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const regionId = 'qr-scanner-region';

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        const state = scannerRef.current.getState();
        if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
          await scannerRef.current.stop();
        }
      } catch {
        // ignore stop errors
      }
    }
  };

  const startScanner = async () => {
    setScanState('scanning');
    setTicketData(null);
    setRawValue('');
    setError('');

    await stopScanner();

    const scanner = new Html5Qrcode(regionId, {
      verbose: false,
      formatsToSupport: [
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.DATA_MATRIX,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.EAN_13,
      ],
    });
    scannerRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 260, height: 260 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText, scanner);
        },
        () => { /* scan errors are normal while scanning */ }
      );
    } catch (err) {
      setScanState('idle');
      setError(
        err instanceof Error
          ? err.message
          : 'Kamerazugriff verweigert. Bitte erlaube den Kamerazugriff in den Browser-Einstellungen.'
      );
    }
  };

  const handleScanSuccess = async (decodedText: string, scanner: Html5Qrcode) => {
    try {
      const state = scanner.getState();
      if (state === Html5QrcodeScannerState.SCANNING || state === Html5QrcodeScannerState.PAUSED) {
        await scanner.stop();
      }
    } catch {
      // ignore
    }

    setRawValue(decodedText);
    const parsed = parseTicketData(decodedText);
    if (parsed) {
      setTicketData(parsed);
      setScanState('valid');
    } else {
      setScanState('invalid');
    }
  };

  const handleReset = async () => {
    await stopScanner();
    setScanState('idle');
    setTicketData(null);
    setRawValue('');
    setError('');
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={gradientBg}>
          <ScanLine className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Ticket-Scanner</h1>
        <p className="text-zinc-400 text-sm">
          Scanne den QR-Code eines Tickets, um es zu validieren
        </p>
      </div>

      {/* Scanner region – always rendered so html5-qrcode can attach to it */}
      <div
        id={regionId}
        className={`w-full rounded-2xl overflow-hidden mb-6 ${scanState === 'scanning' ? 'block' : 'hidden'}`}
        style={{ minHeight: 300 }}
      />

      {/* Idle state */}
      {scanState === 'idle' && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-zinc-800 flex items-center justify-center">
            <Camera className="w-10 h-10 text-zinc-400" />
          </div>
          <p className="text-zinc-400 text-sm text-center">
            Tippe auf den Button, um die Kamera zu starten und einen Barcode oder QR-Code zu scannen.
          </p>
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-2 w-full">
              {error}
            </p>
          )}
          <button
            onClick={startScanner}
            className="flex items-center gap-2 font-bold px-6 py-3 rounded-full text-white transition-all hover:opacity-90"
            style={gradientBg}
          >
            <Camera className="w-4 h-4" />
            Kamera starten
          </button>
        </div>
      )}

      {/* Scanning hint */}
      {scanState === 'scanning' && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-zinc-400 text-sm">Richte die Kamera auf einen Barcode oder QR-Code…</p>
          <button
            onClick={handleReset}
            className="text-zinc-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Abbrechen
          </button>
        </div>
      )}

      {/* Valid ticket result */}
      {scanState === 'valid' && ticketData && (
        <div className="bg-zinc-900 border border-green-500/40 rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-green-400 font-bold text-lg">Ticket gültig ✓</p>
              <p className="text-zinc-500 text-xs">QR-Code erfolgreich validiert</p>
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">Bestellnummer</span>
              <span className="font-mono font-bold" style={accentColor}>{ticketData.orderId}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">Name</span>
              <span className="text-white">{ticketData.customer}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">E-Mail</span>
              <span className="text-white">{ticketData.email}</span>
            </div>
            <div className="flex justify-between border-b border-zinc-800 pb-2">
              <span className="text-zinc-400">Tickets</span>
              <span className="text-white">{ticketData.items}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">Gesamtbetrag</span>
              <span className="font-bold" style={accentColor}>{formatPrice(ticketData.total)}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Neues Ticket scannen
          </button>
        </div>
      )}

      {/* Invalid result */}
      {scanState === 'invalid' && (
        <div className="bg-zinc-900 border border-red-500/40 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-red-400 font-bold text-lg">Ungültiges Ticket ✗</p>
              <p className="text-zinc-500 text-xs">Der gescannte Code konnte nicht validiert werden</p>
            </div>
          </div>

          {rawValue && (
            <div className="bg-zinc-800 rounded-xl p-3 mb-4">
              <p className="text-zinc-500 text-xs mb-1">Gescannter Inhalt:</p>
              <p className="text-zinc-300 text-sm font-mono break-all">{rawValue}</p>
            </div>
          )}

          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 font-bold px-5 py-2.5 rounded-xl text-white transition-all hover:opacity-90"
            style={gradientBg}
          >
            <RotateCcw className="w-4 h-4" />
            Erneut scannen
          </button>
        </div>
      )}
    </div>
  );
}
