import { TokenMapEntity } from '../../entities/token-map.entity';

export class GenerateFileCommand {
  constructor(
    private readonly _path: string,
    private readonly _value: TokenMapEntity,
    private readonly _mode?: string | null,
  ) {}

  public get path(): string {
    return this._path;
  }

  public get value(): TokenMapEntity {
    return this._value;
  }

  public get mode(): string | null {
    return this._mode ?? null;
  }
}
