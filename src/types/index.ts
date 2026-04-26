export interface TicketType {
  id: string;
  name: string;
  description: string;
  price: number;
  available: number;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  genre: string;
  description: string;
  imageUrl: string;
  ticketTypes: TicketType[];
  minPrice: number;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  type: 'merch' | 'drink';
  items: string[];
  imageUrl: string;
}

export interface CartTicketItem {
  type: 'ticket';
  eventId: string;
  eventName: string;
  eventDate: string;
  ticketTypeId: string;
  ticketTypeName: string;
  price: number;
  quantity: number;
}

export interface CartPackageItem {
  type: 'package';
  packageId: string;
  packageName: string;
  price: number;
  quantity: number;
  packageType: 'merch' | 'drink';
}

export type CartItem = CartTicketItem | CartPackageItem;

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer: CustomerDetails;
  total: number;
  createdAt: string;
}
