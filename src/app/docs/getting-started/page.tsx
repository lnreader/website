import type { ReactElement } from "react";

export const metadata = {
  title: "Getting started",
  description: "Install LNReader, add sources, and start reading in minutes.",
};

export default function GettingStartedPage(): ReactElement {
  return (
    <div className="docs-content">
      <h1>Getting started with LNReader</h1>
      <p>
        Thanks for downloading LNReader! This guide walks through installing the
        Android app, adding your first source, and managing the reader
        experience.
      </p>
      <h2>1. Install the latest APK</h2>
      <ol>
        <li>
          Visit the{" "}
          <a href="https://github.com/LNReader/lnreader/releases">
            GitHub releases page
          </a>
          on your device or desktop.
        </li>
        <li>
          Download the <code>app-release.apk</code> artifact from the most
          recent stable release.
        </li>
        <li>
          On Android, open the file and allow installs from unknown sources when
          prompted.
        </li>
        <li>
          After installation, launch <strong>LNReader</strong> from your app
          drawer.
        </li>
      </ol>
      <p>
        Tip: Want to test unreleased features? Pull the most recent build from
        the <strong>Actions</strong>
        tab and install the generated artifact instead.
      </p>
      <h2>2. Add sources</h2>
      <p>
        LNReader ships with a minimal catalogue so you can choose what to
        install.
      </p>
      <ol>
        <li>
          Open the side drawer and tap <strong>Extensions</strong>.
        </li>
        <li>Browse categories or use search to find a light novel provider.</li>
        <li>
          Tap <strong>Install</strong> to add the extension. Repeat for as many
          as you’d like.
        </li>
        <li>
          Access installed catalogues from the <strong>Browse</strong> tab. Each
          source has its own filters and language settings.
        </li>
      </ol>
      <p>
        Need a source that’s missing? Create a request in the{" "}
        <a href="https://github.com/LNReader/lnreader-sources/issues">
          lnreader-sources repository
        </a>
        .
      </p>
      <h2>3. Build your library</h2>
      <ol>
        <li>
          Tap a novel from the catalogue, then press{" "}
          <strong>Add to library</strong>.
        </li>
        <li>
          Chapters can be downloaded in bulk or on demand. Long-press to
          multi-select, then choose
          <strong>Download</strong>.
        </li>
        <li>
          Organize with categories like Ongoing, Completed, or custom tags.
        </li>
        <li>
          Enable library updates to keep track of new chapters across all
          sources.
        </li>
      </ol>
      <h2>4. Customize the reader</h2>
      <ul>
        <li>
          Choose from multiple reader themes or build your own color palette.
        </li>
        <li>Adjust font, text size, and line height per source or globally.</li>
        <li>
          Toggle immersive mode, scroll direction, and reading progress
          indicators.
        </li>
        <li>
          Sync reading positions to the cloud with your preferred backup
          solution.
        </li>
      </ul>
      <h2>5. Stay in sync</h2>
      <ul>
        <li>
          <strong>Backups:</strong> Export your library, categories, and history
          from Settings → Backup & Restore → Create backup.
        </li>
        <li>
          <strong>Discord:</strong> Join the{" "}
          <a href="https://discord.gg/u2pTuQ8">LNReader community</a> for
          support, news, and extension updates.
        </li>
        <li>
          <strong>GitHub:</strong> Star the repository, follow the roadmap, and
          contribute fixes or translations.
        </li>
      </ul>
      <p>You’re all set—happy reading!</p>
    </div>
  );
}
