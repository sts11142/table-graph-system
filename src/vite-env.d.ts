/* eslint-disable @typescript-eslint/naming-convention */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REMOTE_CSV_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
