export interface PluginInfo {
  readonly id: string;
  readonly name: string;
  readonly site: string;
  readonly iconUrl: string;
  readonly lang: string;
}

export interface OldBackupEntry {
  readonly novelId: number;
  readonly sourceUrl: string;
  readonly novelUrl: string;
  readonly sourceId: number;
  readonly source: string;
  readonly novelName: string;
  readonly novelCover?: string;
  readonly novelSummary?: string;
  readonly genre?: string;
  readonly author?: string;
  readonly status?: string;
  readonly followed: number;
  readonly categoryIds?: string;
}

export interface MigratedNovel {
  readonly id: number;
  readonly path: string;
  readonly pluginId: string;
  readonly name: string;
  readonly cover?: string;
  readonly summary?: string;
  readonly author?: string;
  readonly status?: string;
  readonly genres?: string;
  readonly inLibrary: boolean;
  readonly isLocal: boolean;
  readonly totalPages: number;
}

export interface BackupMigrationResult {
  readonly migratedNovels: ReadonlyArray<MigratedNovel>;
  readonly requiredPlugins: ReadonlyArray<PluginInfo>;
  readonly unmatchedEntries: ReadonlyArray<UnmatchedEntry>;
}

export interface UnmatchedEntry {
  readonly novelName: string;
  readonly sourceUrl: string;
  readonly reason: string;
}
