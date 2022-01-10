import {
  TokenMapEntity,
  TokenPrimitiveMapType,
} from '../../../domains/entities/token-map.entity';

export class BuildCommand {
  constructor(
    private readonly _path: string,
    private readonly _value: TokenPrimitiveMapType,
    private readonly _mode?: string | null,
  ) {}

  public get path(): string {
    return this._path;
  }

  public get value(): TokenMapEntity {
    return new TokenMapEntity(this._value);
  }

  public get mode(): string | null {
    return this._mode ?? null;
  }
}
