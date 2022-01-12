import { ConvertorEntity } from '../../domains/entities/convertor.entity';
import { ConvertorsMapPort } from '../../domains/ports/out/convertors-map.port';
import { CssConvertorStrategy } from '../convertors';

export class ConvertorsMapAdapter implements ConvertorsMapPort {
  private _map: Map<string, ConvertorEntity> = new Map([
    ['css', new CssConvertorStrategy()],
    ['scss', new CssConvertorStrategy('scss')],
    ['sass', new CssConvertorStrategy('sass')],
  ]);

  public get(extension: string): ConvertorEntity | null {
    return this._map.get(extension) ?? null;
  }
}
