# Lilac Four Clover Africa Ventures

Single-page website for Lilac Four Clover Africa Ventures, a Kenyan business consultancy for business registration, corporate compliance and business support.

Built with React 19 and Vite 7, using plain CSS. It deploys to Cloudflare Workers as static assets with a single-page fallback.

## Editing content

All text is in `src/content.js`. Fields left blank (`''`) are hidden on the site:

- `contact.email`, `contact.phone`, `contact.whatsapp` (digits only, e.g. `254700000000`), `contact.linkedin`
- `leader.photo`: put the photo in `public/` (e.g. `public/lilian.jpg`) and set `photo: '/lilian.jpg'`. Until then the card shows her initials.

Colours are defined at the top of `src/styles.css`. Plum `#5B3171` and grey `#5B5F67` come from the company letterhead.

## Commands

```bash
npm install
npm run dev        # local preview
npm run build      # production build in dist/
npx wrangler deploy  # deploy to Cloudflare (after npm run build)
```

Built by SpenceTec and Logistics Limited.
