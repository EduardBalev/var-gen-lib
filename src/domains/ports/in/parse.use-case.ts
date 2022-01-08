import { TokenMapEntity } from '../../entities/token-map.entity';
import { TokenValueType } from '../../entities/token.entity';

export type ConvertorInputEntry = [string, TokenValueType][];

export interface Convertor {
  convert(obj: TokenMapEntity): string;
}
