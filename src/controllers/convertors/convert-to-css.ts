import { Convertor } from '../parse.controller';

export class ConvertToCss extends Convertor {
  private readonly ROOT_ELEMENT = 'html';
  private readonly NEW_LINE = '\n';
  private readonly TAB = '  ';

  public convert(obj: { [key: string]: string }): string {
    const entry = Object.entries(obj);
    let result = `${this.ROOT_ELEMENT} {`;
    entry.forEach(([key, value]) => {
      result += `${this.NEW_LINE}${this.TAB}`;
      result += `--${key}: ${value};`;
    });
    result += `${this.NEW_LINE}}`;

    return result;
  }
}
