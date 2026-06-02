# Project screenshots

Drop screenshots for each project into its own folder here:

```
public/projects/
├── buddy-assist/
│   ├── 01-home.png
│   ├── 02-request.png
│   ├── 03-dashboard.png
│   └── 04-tracking.png
├── symple/
│   ├── 01-dashboard.png
│   ├── 02-calendar.png
│   ├── 03-quote.png
│   └── 04-invoice.png
├── 39dollarglasses/
│   ├── 01-home.png
│   ├── 02-plp.png
│   ├── 03-pdp.png
│   └── 04-configurator.png
└── ast-surf-resort/
    ├── 01-home.png
    ├── 02-rooms.png
    ├── 03-trips.png
    └── 04-booking.png
```

Recommended specs:
- 16:10 or 16:9 aspect ratio
- 1600×1000 minimum (Retina-ready)
- WebP or PNG
- Naming matches the `screenshots` array in `composables/useProjects.ts`

If an image is missing the UI falls back to a placeholder card so the
page still looks intentional in screenshots-pending state.
