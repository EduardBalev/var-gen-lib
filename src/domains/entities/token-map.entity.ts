export type TokenType = string | number;
export type TokenMatItemType<T = TokenMapEntity> = TokenType | T;

export type TokenMapType = {
  [key: string]: TokenMatItemType;
};

export type TokenPrimitiveMapType = {
  [key: string]: TokenMatItemType<TokenPrimitiveMapType>;
};

export type TokenMapEntityEntryType = [string, TokenMatItemType][];

export class TokenMapEntity {
  private _map = new Map<string, TokenMatItemType>();

  public readonly isMap = true;

  constructor(_value?: TokenPrimitiveMapType) {
    if (_value) {
      this.add(_value);
    }
  }

  static entry(value: TokenMapEntity | TokenMapEntityEntryType): TokenMapEntityEntryType {
    return Array.isArray(value) ? value : Object.entries(value);
  }

  static fromEntry(value: TokenMapEntityEntryType): TokenMapType {
    return Object.fromEntries(value);
  }

  public get value() {
    return TokenMapEntity.fromEntry(this.valueEntry);
  }

  public get valueEntry() {
    return [...this._map.entries()];
  }

  public add(value: TokenPrimitiveMapType) {
    const entry = Object.entries(value);
    entry.forEach(([k, _v]) => {
      let v: TokenMatItemType;
      if (typeof _v === 'object') {
        v = new TokenMapEntity(_v);
      } else {
        v = _v;
      }
      this._map.set(k, v);
    });
  }
}
