/**
 * Client-side fallback dataset matching server/db.json
 * Ensures the application is resilient and can render rich initial data
 * even before the JSON Server is started.
 */
export const initialUsers = [
  {
    id: "u1",
    name: "Alex Morgan",
    username: "alexmorgan",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Visual storyteller & landscape photographer 📸 | Capturing life one frame at a time.",
    website: "https://alexmorgan.gallery",
    location: "London, UK",
    followers: ["u2", "u3", "u4", "u5", "u7", "u8"],
    following: ["u2", "u3", "u6", "u9"],
    savedPosts: ["p3", "p7", "p12"],
    isPrivate: false,
    createdAt: "2026-01-10T10:00:00Z"
  },
  {
    id: "u2",
    name: "Maya Chen",
    username: "mayachen",
    email: "maya@example.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    bio: "Architecture & minimal design enthusiast. Tokyo / San Francisco.",
    website: "https://mayachen.design",
    location: "Tokyo, Japan",
    followers: ["u1", "u3", "u4", "u6", "u10"],
    following: ["u1", "u4", "u5"],
    savedPosts: ["p1", "p5"],
    isPrivate: false,
    createdAt: "2026-02-14T09:15:00Z"
  },
  {
    id: "u3",
    name: "Marcus Vance",
    username: "marcusv",
    email: "marcus@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    bio: "Coffee connoisseur, street runner, and indie software dev ☕💻",
    website: "https://marcusv.dev",
    location: "Berlin, Germany",
    followers: ["u1", "u2", "u5", "u8"],
    following: ["u1", "u2", "u7", "u10"],
    savedPosts: ["p2", "p6", "p11"],
    isPrivate: false,
    createdAt: "2026-02-20T14:30:00Z"
  },
  {
    id: "u4",
    name: "Elena Rostova",
    username: "elena_r",
    email: "elena@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
    bio: "Culinary arts, sourdough bread recipes & Mediterranean cuisine 🌿🥖",
    website: "https://elenacooks.com",
    location: "Barcelona, Spain",
    followers: ["u1", "u2", "u3", "u5", "u6"],
    following: ["u1", "u2", "u3"],
    savedPosts: ["p4", "p8"],
    isPrivate: false,
    createdAt: "2026-03-01T11:00:00Z"
  },
  {
    id: "u5",
    name: "David Kim",
    username: "davidkim",
    email: "david@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    bio: "Urban explorer & vinyl collector. Documenting city nightscapes.",
    website: "https://davidkim.photo",
    location: "Seoul, South Korea",
    followers: ["u1", "u3", "u7"],
    following: ["u1", "u2", "u4", "u8"],
    savedPosts: ["p1", "p9"],
    isPrivate: false,
    createdAt: "2026-03-12T16:45:00Z"
  },
  {
    id: "u6",
    name: "Sophie Dubois",
    username: "sophied",
    email: "sophie@example.com",
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
    bio: "Fashion designer & vintage textile collector. Paris dreaming 🎨✨",
    website: "https://atelier-sophie.fr",
    location: "Paris, France",
    followers: ["u1", "u2", "u4", "u9"],
    following: ["u1", "u2", "u4", "u7"],
    savedPosts: ["p3", "p10"],
    isPrivate: false,
    createdAt: "2026-03-25T08:20:00Z"
  },
  {
    id: "u7",
    name: "Liam O'Connor",
    username: "liam_oc",
    email: "liam@example.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    bio: "Coastal climber, drone pilot & wild camping lover 🏕️🌊",
    website: "https://liamadventures.ie",
    location: "Dublin, Ireland",
    followers: ["u1", "u3", "u5", "u6"],
    following: ["u1", "u3", "u8"],
    savedPosts: ["p1", "p14"],
    isPrivate: false,
    createdAt: "2026-04-02T13:10:00Z"
  },
  {
    id: "u8",
    name: "Priya Sharma",
    username: "priyasharma",
    email: "priya@example.com",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    bio: "Brand identity strategist & ceramic pottery maker. Living slowly 🏺",
    website: "https://priyastudio.co",
    location: "Melbourne, Australia",
    followers: ["u1", "u3", "u5", "u7"],
    following: ["u1", "u2", "u3"],
    savedPosts: ["p2", "p15"],
    isPrivate: false,
    createdAt: "2026-04-18T17:00:00Z"
  },
  {
    id: "u9",
    name: "Carlos Gomez",
    username: "carlos_g",
    email: "carlos@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    bio: "Surfer, sound engineer & analog synthesizers fanatic 🏄‍♂️🎛️",
    website: "https://carloswaves.fm",
    location: "Lisbon, Portugal",
    followers: ["u1", "u6", "u10"],
    following: ["u1", "u6"],
    savedPosts: ["p7"],
    isPrivate: false,
    createdAt: "2026-05-01T12:00:00Z"
  },
  {
    id: "u10",
    name: "Amina Morales",
    username: "aminam",
    email: "amina@example.com",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
    bio: "Botanical illustrator, greenhouse guardian & plant mom 🌿🌸",
    website: "https://aminabotanicals.com",
    location: "Austin, USA",
    followers: ["u2", "u3", "u9"],
    following: ["u1", "u2", "u4"],
    savedPosts: ["p4", "p16"],
    isPrivate: false,
    createdAt: "2026-05-15T09:40:00Z"
  }
];

export const initialPosts = [
  {
    id: "p1",
    userId: "u1",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption: "Chasing the morning light through alpine valleys. Silence never sounded so grand.",
    hashtags: ["mountains", "alps", "wanderlust", "landscape"],
    location: "Dolomites, Italy",
    likes: ["u2", "u3", "u4", "u5", "u7"],
    createdAt: "2026-11-08T18:00:00Z"
  },
  {
    id: "p2",
    userId: "u2",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    caption: "Geometry in glass and concrete. Modern architecture never fails to quiet the mind.",
    hashtags: ["architecture", "minimalism", "design", "tokyo"],
    location: "Ginza, Tokyo",
    likes: ["u1", "u3", "u5", "u8"],
    createdAt: "2026-11-08T15:20:00Z"
  },
  {
    id: "p3",
    userId: "u3",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    caption: "First pour of Ethiopian single origin. Crisp acidity, floral notes, ready to code all day.",
    hashtags: ["coffee", "barista", "specialtycoffee", "morningroutine"],
    location: "Kreuzberg, Berlin",
    likes: ["u1", "u2", "u6", "u8"],
    createdAt: "2026-11-08T09:10:00Z"
  },
  {
    id: "p4",
    userId: "u4",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80",
    caption: "Freshly pulled from the wood-fired hearth: 78% hydration sourdough with roasted garlic.",
    hashtags: ["sourdough", "baking", "foodie", "homemade"],
    location: "Gràcia, Barcelona",
    likes: ["u1", "u2", "u3", "u7", "u10"],
    createdAt: "2026-11-07T20:30:00Z"
  },
  {
    id: "p5",
    userId: "u5",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80",
    caption: "Neon rain reflections along the alleyways. The city breathes differently after midnight.",
    hashtags: ["cyberpunk", "nightphotography", "seoul", "neon"],
    location: "Hongdae, Seoul",
    likes: ["u1", "u2", "u4", "u9"],
    createdAt: "2026-11-07T17:45:00Z"
  },
  {
    id: "p6",
    userId: "u6",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    caption: "Autumn silhouettes and drape textures for our upcoming studio collection. Less is more.",
    hashtags: ["fashion", "parisfashion", "styling", "minimal"],
    location: "Le Marais, Paris",
    likes: ["u1", "u4", "u8"],
    createdAt: "2026-11-07T14:15:00Z"
  },
  {
    id: "p7",
    userId: "u7",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    caption: "Where the Atlantic winds sculpt the sea cliffs. Salt spray and clear horizons.",
    hashtags: ["coastal", "wildcamping", "nature", "ireland"],
    location: "Cliffs of Moher, Ireland",
    likes: ["u1", "u3", "u5", "u9"],
    createdAt: "2026-11-07T11:00:00Z"
  },
  {
    id: "p8",
    userId: "u8",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80",
    caption: "Glazing day at the studio. Earthy stoneware bowls finding their tactile harmony.",
    hashtags: ["ceramics", "pottery", "handmade", "slowliving"],
    location: "Fitzroy, Melbourne",
    likes: ["u1", "u2", "u4", "u10"],
    createdAt: "2026-11-06T22:10:00Z"
  },
  {
    id: "p9",
    userId: "u9",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80",
    caption: "Clean offshore swell rolled in at dawn. Nothing washes off stress like cold ocean saltwater.",
    hashtags: ["surfing", "ocean", "waves", "portugal"],
    location: "Ericeira, Portugal",
    likes: ["u1", "u3", "u7"],
    createdAt: "2026-11-06T18:00:00Z"
  },
  {
    id: "p10",
    userId: "u10",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=1200&q=80",
    caption: "My Monstera Deliciosa just unfurled its biggest leaf yet! Nature's perfect fenestration.",
    hashtags: ["houseplants", "urbanjungle", "botany", "greenery"],
    location: "Austin Botanics",
    likes: ["u1", "u2", "u4", "u8"],
    createdAt: "2026-11-06T14:30:00Z"
  }
];

export const initialStories = [
  {
    id: "s1",
    userId: "u1",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80",
    viewers: ["u2", "u3"],
    createdAt: "2026-11-09T08:00:00Z",
    expiresAt: "2026-11-10T08:00:00Z"
  },
  {
    id: "s2",
    userId: "u2",
    image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80",
    viewers: ["u1"],
    createdAt: "2026-11-09T07:30:00Z",
    expiresAt: "2026-11-10T07:30:00Z"
  },
  {
    id: "s3",
    userId: "u3",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    viewers: [],
    createdAt: "2026-11-09T09:00:00Z",
    expiresAt: "2026-11-10T09:00:00Z"
  },
  {
    id: "s4",
    userId: "u4",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    viewers: ["u1", "u2"],
    createdAt: "2026-11-09T06:15:00Z",
    expiresAt: "2026-11-10T06:15:00Z"
  },
  {
    id: "s5",
    userId: "u5",
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=800&q=80",
    viewers: [],
    createdAt: "2026-11-09T08:45:00Z",
    expiresAt: "2026-11-10T08:45:00Z"
  }
];
