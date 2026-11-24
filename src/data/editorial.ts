// Editorial content data — curated photography via Unsplash

export interface EditorialItem {
  id: string
  title: string
  subtitle: string
  category: string
  location: string
  coordinates: string
  image: string
  issue: string
  readTime: string
  featured?: boolean
}

export interface Category {
  id: string
  label: string
  count: number
  image: string
  description: string
}

// Curated Unsplash images for editorial quality
const UNSPLASH_BASE = 'https://images.unsplash.com'

export const editorialItems: EditorialItem[] = [
  {
    id: 'e1',
    title: 'The Brutalist Towers of São Paulo',
    subtitle: 'Where raw concrete meets the rhythm of a city that never quiets',
    category: 'Architecture',
    location: 'São Paulo, Brazil',
    coordinates: '23.5505° S, 46.6333° W',
    // São Paulo cityscape — Avenida Paulista concrete skyline
    image: `${UNSPLASH_BASE}/photo-1578662996442-48f60103fc96?w=2000&q=90&fit=crop`,
    issue: '№ 001',
    readTime: '8 min',
    featured: true,
  },
  {
    id: 'e2',
    title: 'After Dark in Shinjuku',
    subtitle: 'Neon labyrinths and the golden hour that lasts all night',
    category: 'Night Life',
    location: 'Tokyo, Japan',
    coordinates: '35.6938° N, 139.7034° E',
    image: `${UNSPLASH_BASE}/photo-1540959733332-eab4deabeeaf?w=900&q=85&fit=crop`,
    issue: '№ 001',
    readTime: '6 min',
  },
  {
    id: 'e3',
    title: 'The Last Bookshop in Lisbon',
    subtitle: 'A century-old paper archive on a hill above the Tagus',
    category: 'Hidden Places',
    location: 'Lisbon, Portugal',
    coordinates: '38.7223° N, 9.1393° W',
    image: `${UNSPLASH_BASE}/photo-1521587760476-6c12a4b040da?w=900&q=85&fit=crop`,
    issue: '№ 001',
    readTime: '5 min',
  },
  {
    id: 'e4',
    title: 'Concrete and Mist',
    subtitle: "Le Corbusier's mountain retreat as fog erases its edges",
    category: 'Architecture',
    location: 'Évian-les-Bains, France',
    coordinates: '46.3900° N, 6.5900° E',
    image: `${UNSPLASH_BASE}/photo-1518005068251-37900150dfca?w=900&q=85&fit=crop`,
    issue: '№ 001',
    readTime: '7 min',
  },
  {
    id: 'e5',
    title: 'Steam & Silence in Budapest',
    subtitle: "The thermal baths that have held the city's secrets since 1565",
    category: 'Unusual Experiences',
    location: 'Budapest, Hungary',
    coordinates: '47.5100° N, 19.0384° E',
    image: `${UNSPLASH_BASE}/photo-1555993539-1732b0258235?w=900&q=85&fit=crop`,
    issue: '№ 001',
    readTime: '6 min',
  },
  {
    id: 'e6',
    title: 'The Rooftops of Havana at Dusk',
    subtitle: 'Crumbling grandeur and Caribbean light before it disappears',
    category: 'Cinematic Locations',
    location: 'Havana, Cuba',
    coordinates: '23.1136° N, 82.3666° W',
    image: `${UNSPLASH_BASE}/photo-1547550795-30f9e3a0ce72?w=900&q=85&fit=crop`,
    issue: '№ 001',
    readTime: '9 min',
  },
]

export const categories: Category[] = [
  {
    id: 'architecture',
    label: 'Architecture',
    count: 24,
    // São Paulo concrete skyline for architecture category too
    image: `${UNSPLASH_BASE}/photo-1578662996442-48f60103fc96?w=800&q=80&fit=crop`,
    description: 'Brutalist, modernist, and forgotten structures',
  },
  {
    id: 'hidden-places',
    label: 'Hidden Places',
    count: 31,
    image: `${UNSPLASH_BASE}/photo-1519681393784-d120267933ba?w=800&q=80&fit=crop`,
    description: 'Off-map, overlooked, and worth finding',
  },
  {
    id: 'night-life',
    label: 'Night Life',
    count: 18,
    image: `${UNSPLASH_BASE}/photo-1540959733332-eab4deabeeaf?w=800&q=80&fit=crop`,
    description: 'Cities after dark, neon and shadow',
  },
  {
    id: 'cafes',
    label: 'Cafés & Interiors',
    count: 42,
    image: `${UNSPLASH_BASE}/photo-1442512595331-e89e73853f31?w=800&q=80&fit=crop`,
    description: 'Beautiful rooms, slow mornings, good coffee',
  },
  {
    id: 'cinematic',
    label: 'Cinematic',
    count: 15,
    image: `${UNSPLASH_BASE}/photo-1485846234645-a62644f84728?w=800&q=80&fit=crop`,
    description: 'Locations that feel like film stills',
  },
  {
    id: 'unusual',
    label: 'Unusual Experiences',
    count: 27,
    image: `${UNSPLASH_BASE}/photo-1517760444937-f6397edcbbcd?w=800&q=80&fit=crop`,
    description: 'Strange, memorable, unrepeatable',
  },
]

export const tickerItems = [
  'São Paulo  ·  Architecture',
  'Tokyo  ·  Night Life',
  'Lisbon  ·  Hidden Places',
  'Budapest  ·  Unusual Experiences',
  'Havana  ·  Cinematic Locations',
  'Oslo  ·  Architecture',
  'Marrakech  ·  Cafés & Interiors',
  'Seoul  ·  Night Life',
  'Reykjavik  ·  Hidden Places',
  'Tbilisi  ·  Cinematic Locations',
]
