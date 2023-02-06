import { exec } from 'node:child_process'

export const rg = (args: {
  rgPath: string
  text: string
  cwd: string
  wordPattern: string
  timeout: number
}): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(
      `${args.rgPath} -e "\\b(${args.text}${args.wordPattern}+)\\b" --json .`,
      {
        cwd: args.cwd,
        timeout: args.timeout
      },
      (error, stdout, stderr) => {
        if (stdout) {
          resolve(stdout)
          return
        }
        if (stderr) {
          reject(stderr)
          return
        }
        if (error) {
          reject(error)
          return
        }
        reject('')
      }
    )
  })
}
