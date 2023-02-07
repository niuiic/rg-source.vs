import { workspace } from 'vscode'

interface Config {
  rgPath: string
  prefixLen: number
  wordPattern: string
  timeout: number
  caseSensitive: boolean
}

type ConfigFunc = {
  [K in keyof Config]: () => Config[K]
}

export const config: ConfigFunc = {
  rgPath: () => workspace.getConfiguration().get('rg-source.rgPath') as string,
  prefixLen: () => workspace.getConfiguration().get('rg-source.prefixLen') as number,
  wordPattern: () => workspace.getConfiguration().get('rg-source.wordPattern') as string,
  timeout: () => workspace.getConfiguration().get('rg-source.timeout') as number,
  caseSensitive: () => workspace.getConfiguration().get('rg-source.caseSensitive') as boolean
}
