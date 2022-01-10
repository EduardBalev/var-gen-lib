import { ConvertorEntity } from '../../domains/entities/convertor.entity';
import { ConvertorsMapPort } from '../../domains/ports/out/convertors-map.port';
import { CssConvertorCommand } from '../convertors';

export class ConvertorsMapAdapter implements ConvertorsMapPort {
  private _map: Map<string, ConvertorEntity> = new Map([
    ['css', new CssConvertorCommand()],
    ['scss', new CssConvertorCommand('scss')],
    ['sass', new CssConvertorCommand('sass')],
  ]);

  get(extension: string): ConvertorEntity | null {
    return this._map.get(extension) ?? null;
  }
}
