import { events } from '../data/events';
import { EventCard } from '../components/EventCard';
import { Ticket } from 'lucide-react';

export function EventsPage() {
  return (
    <div className="min-h-screen">
      <section className="relative bg-black py-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <Ticket className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Upcoming Events</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4 leading-tight">
            The Hinge<br />
            <span className="text-amber-400">Live Events</span>
          </h1>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Amsterdam's premier underground club. Get your tickets before they sell out.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-white mb-8">
          {events.length} upcoming events
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
