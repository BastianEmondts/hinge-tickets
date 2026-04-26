import { events } from '../data/events';
import { EventCard } from '../components/EventCard';

export function EventsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A0510 0%, #0F0308 50%, #1A0010 100%)' }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #E8196C 0%, transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto text-center relative">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-white text-sm font-medium border border-white/10"
            style={{ background: 'linear-gradient(to right, rgba(232,25,108,0.15), rgba(255,82,20,0.15))' }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'linear-gradient(to right, #E8196C, #FF5214)' }}
            />
            Aktuelle Veranstaltungen
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
            WIR MACHEN FESTE,<br />
            <span
              style={{
                background: 'linear-gradient(to right, #E8196C, #FF5214)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              PARTYS UND EVENTS
            </span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-8">
            Sichere dir jetzt deine Tickets für die besten Events. Unvergessliche Nächte garantiert.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          {events.length} bevorstehende Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
}

