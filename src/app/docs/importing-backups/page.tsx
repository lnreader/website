import type { ReactElement } from "react";

export const metadata = {
  title: "Importing backups",
  description:
    "Restore your progress when switching devices or migrating from Tachiyomi.",
};

export default function ImportingBackupsPage(): ReactElement {
  return (
    <div className="docs-content">
      <h1>Importing backups</h1>
      <p>
        Migrating devices or coming from Tachiyomi? LNReader supports several
        backup formats to restore your library and reading progress.
      </p>
      <h2>Supported backup formats</h2>
      <ul>
        <li>
          <strong>LNReader JSON:</strong> The native format produced by Settings
          → Backup &amp; Restore → Create backup.
        </li>
        <li>
          <strong>Tachiyomi/TachiyomiSY:</strong> Drop-in compatible .json
          exports translate categories, chapters, and history.
        </li>
        <li>
          <strong>Mihon:</strong> Restores library entries; some custom reader
          configurations may need manual tweaks.
        </li>
      </ul>
      <h2>Export from your old device</h2>
      <ol>
        <li>Open your previous reader app.</li>
        <li>
          Navigate to the backup/export option and generate a full backup
          including categories and history.
        </li>
        <li>
          Transfer the resulting file to your new device via cloud storage, USB,
          or ADB.
        </li>
      </ol>
      <h2>Restore in LNReader</h2>
      <ol>
        <li>Open Settings → Backup &amp; Restore → Restore backup.</li>
        <li>Pick the exported backup file (.json or .proto).</li>
        <li>
          Confirm the import summary. Large libraries can take a few minutes.
        </li>
        <li>
          Restart the app to ensure the library rebuilds with fresh metadata.
        </li>
      </ol>
      <h2>Troubleshooting</h2>
      <h3>Missing covers or metadata</h3>
      <ul>
        <li>
          Tap the novel → Refresh metadata to fetch updated titles and
          descriptions.
        </li>
        <li>Run Library → Update library to refresh everything in bulk.</li>
      </ul>
      <h3>Source not installed</h3>
      <ul>
        <li>
          If chapters show as unknown, install the matching extension from the
          Extensions screen.
        </li>
        <li>
          For private/self-hosted sources, add custom connectors via the
          lnreader-sources instructions.
        </li>
      </ul>
      <h3>Failed imports</h3>
      <ul>
        <li>
          Verify the backup is complete and not truncated (some file managers
          split large files).
        </li>
        <li>
          Check Logcat or adb logcat for parse errors if you’re debugging
          locally.
        </li>
      </ul>
      <h2>Next steps</h2>
      <ul>
        <li>
          Configure automatic scheduled backups to your preferred cloud
          provider.
        </li>
        <li>Enable reader sync tools for chapter tracking.</li>
        <li>
          Contribute migration scripts or automation tips in the community docs.
        </li>
      </ul>
    </div>
  );
}
