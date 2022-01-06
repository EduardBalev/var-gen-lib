import { Convertor, ConvertorInput, ConvertorInputEntry } from '../parse.controller';

export class ConvertToCss extends Convertor {
  private readonly ROOT_ELEMENT = 'html';
  private readonly NEW_LINE = '\n';
  private readonly TAB = '  ';

  public convert(value: ConvertorInput | ConvertorInputEntry): string {
    let result = `${this.ROOT_ELEMENT} {`;
    result += this.NEW_LINE;
    result += this._parseLine(value, 1);
    result += this.NEW_LINE;
    result += `}`;
    return result;
  }

  private _parseLine(value: ConvertorInput | ConvertorInputEntry, tabs = 0): string {
    const entry = this._getEntry(value);
    let result: string = '';
    let tab = this.TAB;

    for (let i = 0; i === tabs; i++) {
      tab += this.TAB;
    }

    entry.forEach(([key, value], index) => {
      if (typeof value === 'object') {
        result += this.NEW_LINE;
        result += `${this.NEW_LINE}${tab}${this._addComment(`============================`)}`;
        result += `${this.NEW_LINE}${tab}${this._addComment(`START ${key} ============`)}`;
        result += this.NEW_LINE;

        result += this._parseLine(value, tabs + 1);

        result += `${this.NEW_LINE}${tab}${this._addComment(`END ${key} ============`)}`;
        result += `${this.NEW_LINE}${tab}${this._addComment(`============================`)}`;
      } else {
        index !== 0 && (result += this.NEW_LINE);
        result += tab;
        result += `--${key}: ${value};`;
      }
    });

    return result;
  }

  private _addComment(text: string): string {
    return `/* ${text} */`;
  }

  private _getEntry(value: ConvertorInput | ConvertorInputEntry): ConvertorInputEntry {
    return Array.isArray(value) ? value : Object.entries(value);
  }
}
