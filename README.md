# rg-source.vs

ripgrep source for vscode

Search for complete words in the workspace based on the entered partial word and then provide completion items.

## Dependencies

- [ripgrep](https://github.com/BurntSushi/ripgrep)

## Usage

1. Install ripgrep.
2. Set `rgPath` as the absolute path to `rg`.

## Known Issues

- extension doesn't' seem to be working

vscode only triggers the completion provider with the highest priority.

[vscode-issue](https://github.com/microsoft/vscode/issues/21611) here.
