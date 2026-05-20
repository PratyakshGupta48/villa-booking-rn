// Sample villa catalogue and the active sample booking. Ported verbatim from
// /Users/pratyakshgupta/Downloads/flymeout/project/villas/lib/data.jsx so the
// design and the RN build show identical numbers and copy on every screen.
//
// Photos load from Unsplash via stable photo IDs; the `fallback` colour is
// rendered underneath so layout never collapses on a network failure.

export type Host = 'Eden L.' | 'Harry B.' | 'Sofia M.' | 'Zach L.';

export type Villa = {
  id: string;
  name: string;
  city: string;
  country: string;
  price: number;
  sleeps: number;
  tag: string;
  photo: string;
  fallback: string;
  host: Host;
};

export const VILLAS: readonly Villa[] = [
  {
    id: 'aroma',
    name: 'Villa Aroma',
    city: 'Mykonos',
    country: 'Greece',
    price: 1200,
    sleeps: 6,
    tag: 'Infinity pool, sea view, chef-on-call.',
    photo:
      'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&w=1100&q=70',
    fallback: '#9BAEB5',
    host: 'Eden L.',
  },
  {
    id: 'casa-del-mar',
    name: 'Casa del Mar',
    city: 'Tulum',
    country: 'Mexico',
    price: 850,
    sleeps: 4,
    tag: 'Beachfront, private cenote.',
    photo:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1100&q=70',
    fallback: '#A89A7E',
    host: 'Harry B.',
  },
  {
    id: 'olive',
    name: 'The Olive Estate',
    city: 'Provence',
    country: 'France',
    price: 950,
    sleeps: 8,
    tag: 'Vineyard, wood-fired kitchen.',
    photo:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1100&q=70',
    fallback: '#8E8B6A',
    host: 'Sofia M.',
  },
  {
    id: 'banyan',
    name: 'Banyan House',
    city: 'Ubud',
    country: 'Bali',
    price: 720,
    sleeps: 6,
    tag: 'Jungle, private pool.',
    photo:
      'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=1100&q=70',
    fallback: '#5D6E55',
    host: 'Zach L.',
  },
  {
    id: 'cabo',
    name: 'Cabo Cliffhouse',
    city: 'Cabo San Lucas',
    country: 'Mexico',
    price: 1400,
    sleeps: 8,
    tag: 'Cliff edge, infinity pool.',
    photo:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=70',
    fallback: '#8E6E54',
    host: 'Eden L.',
  },
  {
    id: 'sabi',
    name: 'Sabi Villa',
    city: 'Hvar',
    country: 'Croatia',
    price: 890,
    sleeps: 5,
    tag: 'Yacht-accessible dock.',
    photo:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1100&q=70',
    fallback: '#6F94A8',
    host: 'Harry B.',
  },
  {
    id: 'refugio',
    name: 'El Refugio',
    city: 'Sayulita',
    country: 'Mexico',
    price: 640,
    sleeps: 4,
    tag: 'Surf-town, rooftop.',
    photo:
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1100&q=70',
    fallback: '#B6A082',
    host: 'Sofia M.',
  },
  {
    id: 'suprema',
    name: 'Casa Suprema',
    city: 'Marrakech',
    country: 'Morocco',
    price: 720,
    sleeps: 6,
    tag: 'Riad-style, hammam.',
    photo:
      'https://images.unsplash.com/photo-1539020140153-e479b8c64e1f?auto=format&fit=crop&w=1100&q=70',
    fallback: '#AF7355',
    host: 'Zach L.',
  },
  {
    id: 'phare',
    name: 'Maison du Phare',
    city: 'Saint-Tropez',
    country: 'France',
    price: 1800,
    sleeps: 8,
    tag: 'Old-port view.',
    photo:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1100&q=70',
    fallback: '#7E8C9A',
    host: 'Eden L.',
  },
  {
    id: 'esprit',
    name: 'Villa Esprit',
    city: 'Lake Como',
    country: 'Italy',
    price: 1150,
    sleeps: 6,
    tag: 'Boathouse.',
    photo:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1100&q=70',
    fallback: '#6D7E78',
    host: 'Harry B.',
  },
  {
    id: 'loma',
    name: 'Casa Loma',
    city: 'Aspen',
    country: 'Colorado',
    price: 1650,
    sleeps: 8,
    tag: 'Ski-in/ski-out.',
    photo:
      'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=1100&q=70',
    fallback: '#7E8589',
    host: 'Sofia M.',
  },
  {
    id: 'tides',
    name: 'Tides Villa',
    city: 'Maui',
    country: 'Hawaii',
    price: 1300,
    sleeps: 6,
    tag: 'Oceanfront.',
    photo:
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?auto=format&fit=crop&w=1100&q=70',
    fallback: '#5C7C84',
    host: 'Zach L.',
  },
];

export const VILLA_BY_ID: Readonly<Record<string, Villa>> = Object.fromEntries(
  VILLAS.map((v) => [v.id, v]),
);

/** Look up a villa by id; throws if missing — useful for compile-time-known ids. */
export function requireVilla(id: string): Villa {
  const villa = VILLA_BY_ID[id];
  if (!villa) throw new Error(`villa "${id}" missing from catalogue`);
  return villa;
}

export type Booking = {
  villa: Villa;
  startLabel: string;
  endLabel: string;
  year: number;
  nights: number;
  guests: number;
  nightly: number;
  cleaning: number;
  service: number;
  total: number;
  ref: string;
  cancelBy: string;
};

// The active booking surfaced by Review, Payment, and Confirmation screens.
export const BOOKING: Booking = {
  villa: requireVilla('aroma'),
  startLabel: 'Sep 8',
  endLabel: 'Sep 13',
  year: 2026,
  nights: 5,
  guests: 4,
  nightly: 1200,
  cleaning: 250,
  service: 360,
  total: 6610,
  ref: 'FMO-A4F9D2',
  cancelBy: 'Sep 1',
};
