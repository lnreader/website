# LNReader Web

This repository hosts the official website and documentation for [LNReader](https://github.com/LNReader/lnreader), the open source light novel reader for Android.

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`.

## Project structure

- `src/app/(features)`: Landing page UI, shared chrome, and feature sections
- `src/app/docs`: Documentation routes and layout shell
- `src/content/docs`: MDX guides and FAQ content
- `public/screens`: App imagery referenced on the landing page

## Contributing

PRs are welcome! Feel free to open issues for design tweaks, new guides, or corrections. Align copy with the Android app and keep TypeScript strict.
