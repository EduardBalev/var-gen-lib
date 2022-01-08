export type TokenValueType = string | number | boolean | TokenEntity;

export class TokenEntity {
  private _value!: TokenValueType;

  constructor(private readonly _key: string, private readonly __value: TokenValueType) {
    this.value = __value;
  }

  public get key() {
    return this._key;
  }

  public get value() {
    return this._value;
  }

  public set value(value: TokenValueType) {
    this._value = value;
  }
}
