import { TokenMapEntity } from './token-map.entity';

export abstract class ConvertorEntity {
  abstract convert(value: TokenMapEntity): string;
}
