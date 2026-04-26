import { Package } from '../types';

export const packages: Package[] = [
  {
    id: 'merch-shirt-hoodie',
    name: 'T-Shirt + Hoodie Bundle',
    description: 'Exklusives The Hinge Merch-Paket mit limitiertem T-Shirt und hochwertigem Hoodie.',
    price: 55,
    type: 'merch',
    items: ['The Hinge Logo T-Shirt (Unisex)', 'The Hinge Heavyweight Hoodie'],
    imageUrl: 'https://picsum.photos/seed/merch1/400/300',
  },
  {
    id: 'merch-cap-tote',
    name: 'Cap + Tasche Kombi',
    description: 'Strukturierte 6-Panel-Cap und robuste Canvas-Tasche. Streetwear-Essentials von The Hinge.',
    price: 35,
    type: 'merch',
    items: ['The Hinge 6-Panel-Cap', 'The Hinge Canvas-Tasche'],
    imageUrl: 'https://picsum.photos/seed/merch2/400/300',
  },
  {
    id: 'merch-limited',
    name: 'Limited Edition Collector Set',
    description: 'Ultra-limitiertes Collector-Set – nur für diese Veranstaltung erhältlich. Nummeriert und signiert.',
    price: 80,
    type: 'merch',
    items: ['Nummerierte Vinyl-Single (Event-Mix)', 'Collector-Poster (A2)', 'Emaille-Pin-Set (3 Stück)'],
    imageUrl: 'https://picsum.photos/seed/merch3/400/300',
  },
  {
    id: 'drink-bier',
    name: 'Bier-Token-Paket',
    description: '5 Bier-Token gültig an allen Bars. Spart im Vergleich zum Einzelkauf.',
    price: 20,
    type: 'drink',
    items: ['5× Bier-Token (einlösbar vor Ort)', 'Gültig die gesamte Nacht'],
    imageUrl: 'https://picsum.photos/seed/drinks1/400/300',
  },
  {
    id: 'drink-cocktail',
    name: 'Cocktail-Paket',
    description: '3 Signature-Cocktails von The Hinge. Kreiert von unseren Resident-Bartendern.',
    price: 28,
    type: 'drink',
    items: ['3× Signature-Cocktail nach Wahl', 'Einlösbar an der Hauptbar'],
    imageUrl: 'https://picsum.photos/seed/drinks2/400/300',
  },
  {
    id: 'drink-premium',
    name: 'Premium-Spirituosen-Paket',
    description: 'Eine halbe Flasche Premium-Spirituose mit Mixern. Direkt an deinen Platz geliefert.',
    price: 65,
    type: 'drink',
    items: ['1× halbe Flasche Premium-Spirituose (3 Sorten zur Wahl)', 'Mixer und Garnitur inklusive', 'Tisch-Service inklusive'],
    imageUrl: 'https://picsum.photos/seed/drinks3/400/300',
  },
];

