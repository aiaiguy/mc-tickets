# MC Tickets — Your Ticket Concierge

Premium brand-positioning site for MC Tickets, a private Melbourne ticket concierge run by Mark Faber.

Marketing site only. Single-page static HTML/CSS/JS. Deploy target: Vercel.

## Structure
- `index.html` — the site
- `styles.css` — dark / purple / gold / silver premium theme
- `script.js` — scroll fades, smooth scroll, nav state
- `strategy.md` — positioning, personas, brand direction
- `README.md` — this file

## Run locally
```
cd /Users/justin/Claude/experiments/mc-tickets
python3 -m http.server 8080
```
Then visit http://localhost:8080

## Deploy (later)
```
npx vercel --prod --yes
```

## Holding fields to replace before launch
- ABN in footer (`[TBC]`)
- Mark's direct mobile / WhatsApp (currently not shown)
- Optional: real sample events if we decide to update quarterly

## Not included (v1, intentionally)
- Live inventory feed
- Member login
- Mailchimp / newsletter integration (recommended for v2)
- Payment / checkout (never, by design)
- WhatsApp automation (v2)
