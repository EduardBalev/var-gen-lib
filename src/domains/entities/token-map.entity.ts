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
  private _value: TokenPrimitiveMapType | null = null;

  constructor(__value?: TokenPrimitiveMapType) {
    if (!!__value && (typeof __value !== 'object' || Array.isArray(__value))) {
      throw new TypeError(
        `expected an argument of type object, but got ${typeof __value}`,
      );
    }

    this._value = __value ?? {};
  }

  public get value(): TokenPrimitiveMapType {
    return this._value ?? {};
  }
}
