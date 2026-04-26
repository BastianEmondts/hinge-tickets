# The Hinge Tickets

A customer-facing ticket shop for **The Hinge** — Amsterdam's underground club. Built with React, Vite, TypeScript, and TailwindCSS.

## Features

- 🎟️ **6 upcoming events** with multiple ticket tier types (GA, VIP, Early Bird, Platinum)
- 🛒 **Persistent cart** via Zustand + localStorage
- 🎁 **Add-on packages** — merch bundles and drink packages per event
- 💳 **Checkout flow** with customer details + Stripe payment placeholder
- 📱 **QR code generation** on the confirmation page (downloadable PNG)
- 📲 **PWA-ready** — manifest + service worker for offline/install support
- 🌑 Dark club-style theme (black + amber)
- 📱 Mobile-first, fully responsive

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | Frontend framework & build tool |
| TypeScript | Type safety |
| TailwindCSS v3 | Utility-first styling |
| Zustand | Cart state management |
| React Router v6 | Client-side routing |
| qrcode.react | QR code generation |
| lucide-react | Icons |

## Pages

| Route | Description |
|---|---|
| `/` | Events listing page |
| `/events/:id` | Event detail — select tickets & add-on packages |
| `/cart` | Cart with quantity controls |
| `/checkout` | Customer details + Stripe placeholder |
| `/confirmation` | Order confirmation with QR code |

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Stripe Integration

The checkout page contains a clearly marked placeholder (`src/pages/CheckoutPage.tsx`). To integrate Stripe:

1. Install `@stripe/stripe-js` and `@stripe/react-stripe-js`
2. Replace the dashed placeholder section with a `<PaymentElement />`
3. Handle payment confirmation and redirect to `/confirmation` on success

## Project Structure

```
src/
├── components/     # Header, Footer, EventCard, CartItemRow
├── data/           # events.ts, packages.ts (mock data)
├── pages/          # EventsPage, EventDetailPage, CartPage, CheckoutPage, ConfirmationPage
├── store/          # cartStore.ts (Zustand)
├── types/          # index.ts (shared interfaces)
└── utils/          # formatters.ts (price, date, orderId)
public/
├── manifest.json   # PWA manifest
└── sw.js           # Service worker
```
Ticketshop
