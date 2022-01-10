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

  constructor(_value?: TokenPrimitiveMapType) {
    if (_value) {
      this.fromObj(_value);
    }
  }

  public get map() {
    return this._map;
  }

  public fromObj(value: TokenPrimitiveMapType) {
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
