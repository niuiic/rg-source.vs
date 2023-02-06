import { workspace } from 'vscode'

interface Config {
  rgPath: string
  prefixLen: number
  wordPattern: string
  timeout: number
}

type ConfigFunc = {
  [K in keyof Config]: () => Config[K]
}

export const config: ConfigFunc = {
  rgPath: () => workspace.getConfiguration().get('rg-source.rgPath') as string,
  prefixLen: () => workspace.getConfiguration().get('rg-source.prefixLen') as number,
  wordPattern: () => workspace.getConfiguration().get('rg-source.wordPattern') as string,
  timeout: () => workspace.getConfiguration().get('rg-source.timeout') as number
  // rgPath: () => '/home/niuiic/.cargo/bin/rg',
  // prefixLen: () => 4,
  // wordPattern: () => '[a-zA-Z0-9\\-_]',
  // timeout: () => 5000
}
