import { TokenValueType } from './token.entity';

export type TokenMapInputType = {
  [key: string]: TokenValueType | TokenMapInputType;
};

export type TokenMapEntityEntryType = [string, TokenValueType | TokenMapEntity][];

export class TokenMapEntity {
  private _map = new Map<string, TokenValueType | TokenMapEntity>();

  public readonly isMap = true;

  constructor(private readonly _value: TokenMapInputType) {}

  public get value() {
    return this._value;
  }

  static toMap(value: TokenMapInputType) {
    const entry = Object.entries(value);
    this._map;
    // entry.forEach(([k, v]) => {
    // })
  }

  static entry(value: TokenMapEntity | TokenMapEntityEntryType): TokenMapEntityEntryType {
    return Array.isArray(value) ? value : Object.entries(value);
  }

  static fromEntry(value: TokenMapEntityEntryType) {
    return Object.fromEntries(value);
  }
}
