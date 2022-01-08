import { TokenMapEntity, TokenMatItemType } from '../../entities/token-map.entity';

export type ConvertorInputEntry = [string, TokenMatItemType][];

export interface Convertor {
  convert(obj: TokenMapEntity): string;
}
