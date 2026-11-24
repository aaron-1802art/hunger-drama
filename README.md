# HUNGER DRAMA — Official Website

> **Lights. Bites. Action.**  
> Handcrafted street-style loaded fries, grilled sandwiches, gourmet burgers, pasta, midnight Maggi, and dessert pancakes in Vikaspuri, Delhi. Direct kitchen ordering via WhatsApp.

---

## 🚀 Quick Start (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (starts on http://localhost:5173)
npm run dev

# 3. Build for production (outputs optimized static assets to dist/)
npm run build

# 4. Preview production build locally
npm run preview
```

---

## ⚙️ Business Configuration Guide

All business details, operating hours, phone numbers, external URLs, and reviews are located in **one single file**:  
📁 `src/data/hungerDramaData.ts` -> `BRAND_CONFIG`

### 1. Phone & WhatsApp Number
```typescript
whatsappNumber: '919217668663', // Used automatically across all WhatsApp ordering links
```

### 2. Location & Operating Hours
```typescript
locationArea: 'Vikaspuri',
city: 'Delhi',
hours: {
  openHour: 12,                  // 12:00 PM
  openMinute: 0,
  closeHour: 24,                 // 12:00 AM (Midnight)
  closeMinute: 0,
  displayHours: '12:00 PM – 12:00 AM (Midnight)',
  displayDays: 'Mon – Sun',
},
```
*Note: The "OPEN NOW" / "CURRENTLY CLOSED" live badge automatically evaluates the user's local clock against these hours.*

### 3. FSSAI Licence Number (Hidden until filled)
```typescript
// Add your official FSSAI registration number when issued.
// When left as '', the FSSAI line in the footer remains completely hidden.
fssaiNumber: '2332XXXXXXXXXX',
```

### 4. Google Maps & Delivery Coverage
```typescript
// Google Maps pin link: button appears in "Find us / Delivery" once filled
googleMapsUrl: 'https://maps.app.goo.gl/YourPinUrl',

// Specific delivery coverage text:
deliveryAreaText: 'Delivering hot across Vikaspuri, Janakpuri, Uttam Nagar, Tilak Nagar & nearby West Delhi areas.',
```

### 5. Swiggy & Zomato Links
```typescript
// Platform badges only render once these URLs are populated
swiggyUrl: 'https://www.swiggy.com/restaurants/hunger-drama-...',
zomatoUrl: 'https://www.zomato.com/ncr/hunger-drama-...',
```

### 6. Customer Reviews ("Scene Reviews")
```typescript
// The "Scene Reviews" section remains hidden until real reviews are added here.
reviews: [
  {
    id: 'rev-1',
    name: 'Aman S.',
    text: 'Best cheese-drizzled fries in Vikaspuri! Crunchy and sizzling hot on arrival.',
    source: 'Google Review',
    rating: 5,
    date: 'Nov 2026'
  }
],
```

### 7. Hero Video (Optional)
```typescript
// Drop an mp4 into /public/video/hero.mp4 and set:
heroVideoUrl: '/video/hero.mp4',
// If empty (''), the website automatically uses the high-res food hero photo.
```

---

## 🍔 Menu Items & Pricing Guide

All menu items, prices, dietary tags, and spice indicators are stored in:  
📁 `src/data/hungerDramaData.ts` -> `MENU_ITEMS` array.

To edit an item or price:
```typescript
{
  id: "wrap-paneer-crunch",
  name: "Paneer Crunch Wrap",
  category: "Sandwiches & Wraps",
  categorySlug: "sandwiches",
  description: "Crispy spiced cottage cheese chunks wrapped in a warm toasted tortilla with chipotle drizzle, crunchy greens and house herbs.",
  price: 140,              // Single price source used across cards, modal, builder, cart & WhatsApp
  dietary: "veg",          // 'veg' (green dot) or 'non-veg' (red dot)
  spiceLevel: "medium",     // 'mild', 'medium', or 'spicy'
  act: "The Craving",
  featured: true,
  image: menuImages["paneer-crunch-wrap"],
  available: true,
}
```

---

## 🌐 Production Deployment

### Option A: Netlify (Recommended)
1. Link your repository on [Netlify](https://netlify.com).
2. The included `netlify.toml` file will automatically set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **SPA Redirect:** `/* -> /index.html 200`
   - **Asset Caching:** 1-year immutable caching on `/assets/*`

### Option B: Cloudflare Pages
1. Link repository in Cloudflare Pages dashboard.
2. Set Framework preset to **Vite** (`npm run build`, output directory `dist`).
3. The included `public/_redirects` and `public/_headers` configure SPA routing and security headers automatically.

---

## 📋 Pre-Launch Verification Checklist
- [ ] Fill in real FSSAI registration number in `BRAND_CONFIG.fssaiNumber`.
- [ ] Add Google Maps URL for Vikaspuri kitchen in `BRAND_CONFIG.googleMapsUrl`.
- [ ] Add specific delivery area text in `BRAND_CONFIG.deliveryAreaText`.
- [ ] Add Swiggy / Zomato links if you are listed on those platforms.
- [ ] Replace `/public/images/menu/paneer-crunch-wrap.webp` with an authentic vegetarian paneer photo.
- [ ] Add genuine customer reviews to `BRAND_CONFIG.reviews` to reveal the Scene Reviews section.
- [ ] Review the transparent Privacy Policy and Terms of Service modal templates.

