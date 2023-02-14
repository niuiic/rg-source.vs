import * as vscode from 'vscode'
import { rg } from './job'
import { config } from './config'

export const activate = async (context: vscode.ExtensionContext) => {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      { scheme: 'file' },
      {
        provideCompletionItems
      }
    )
  )
}

export const deactivate = () => {}

const provideCompletionItems: vscode.CompletionItemProvider<vscode.CompletionItem>['provideCompletionItems'] = async (
  document,
  position,
  _token,
  _context
) => {
  const word = getWord(document, position)
  if (word.length >= config.prefixLen() && vscode.workspace.workspaceFolders !== undefined) {
    try {
      const outStr = await rg({
        rgPath: config.rgPath(),
        text: word,
        cwd: vscode.workspace.workspaceFolders[0].uri.fsPath,
        wordPattern: config.wordPattern(),
        timeout: config.timeout(),
        caseSensitive: config.caseSensitive()
      })
      const outStrArr = outStr.split('\n').slice(0, outStr.split('\n').length - 1)
      const outObjArr = outStrArr.map((v: string) => JSON.parse(v))
      const matchObjArr = outObjArr.filter((v: { type: string }) => v.type === 'match')
      const matchStrArr = matchObjArr.map((v) => v.data.submatches[0].match.text)
      const uniqueMatchStrArr: string[] = []
      for (const v of matchStrArr) {
        if (!uniqueMatchStrArr.includes(v)) {
          uniqueMatchStrArr.push(v)
        }
      }
      const source = uniqueMatchStrArr.map(
        (v) => new vscode.CompletionItem({ label: v, description: 'rg' }, vscode.CompletionItemKind.Text)
      )
      return source
    } catch {
      return []
    }
  }
  return []
}

const getWord = (document: vscode.TextDocument, position: vscode.Position): string => {
  const line = document.lineAt(position)
  const wordRange = document.getWordRangeAtPosition(position, /\w[-\w\.]*/g)
  if (!wordRange) {
    return ''
  } else {
    return line.text.substring(wordRange.start.character, wordRange.end.character)
  }
}
