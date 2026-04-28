import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../types';
import { formatShortDate, formatPrice } from '../utils/formatters';

interface Props {
  event: Event;
}

export function EventCard({ event }: Props) {
  return (
    <Link
      to={`/events/${event.id}`}
      className="group flex flex-col bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-hinge-pink/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-hinge-pink/10"
    >
      <div className="relative overflow-hidden aspect-video flex-shrink-0">
        <img
          src={event.imageUrl}
          alt={event.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <span
          className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider"
          style={{ background: 'linear-gradient(to right, #E8196C, #FF5214)' }}
        >
          {event.genre}
        </span>
        <span className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
          ab {formatPrice(event.minPrice)}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-white font-bold text-xl mb-3 group-hover:opacity-80 transition-opacity line-clamp-2 min-h-[3.5rem]">{event.name}</h3>
        <div className="space-y-1.5 text-sm text-zinc-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: '#FF5214' }} />
            <span>{formatShortDate(event.date)} · {event.time} Uhr</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: '#FF5214' }} />
            <span>{event.venue} · {event.location}</span>
          </div>
        </div>
        <div className="mt-auto pt-4 border-t border-zinc-800 flex items-center justify-between">
          <span className="text-zinc-500 text-xs">{event.ticketTypes.length} Ticketkategorien</span>
          <span
            className="text-sm font-semibold group-hover:underline"
            style={{ color: '#FF5214' }}
          >
            Tickets kaufen →
          </span>
        </div>
      </div>
    </Link>
  );
}

