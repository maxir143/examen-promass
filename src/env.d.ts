/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DB_HOST: string
  readonly DB_NAME: string
  readonly DB_USERNAME: string
  readonly DB_PASSWORD: string
  readonly DB_PORT: string
  readonly TOKEN_SECRET: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}