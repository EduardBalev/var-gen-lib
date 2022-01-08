import { Convertor } from '../ports/in/parse.use-case';
import { TokenMapEntity } from './token-map.entity';

export abstract class ConvertorEntity implements Convertor {
  abstract convert(value: TokenMapEntity): string;
}
