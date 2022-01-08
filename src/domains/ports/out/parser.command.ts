import { TokenMapEntity } from '../../entities/token-map.entity';
import { Convertor } from '../in/parse.use-case';

export class ParseCommand {
  static parse(value: TokenMapEntity, convertor: Convertor): string {
    return convertor.convert(value);
  }
}
