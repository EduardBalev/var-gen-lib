import { TokenMapEntity } from '../../entities/token-map.entity';

export interface ConvertStrategy {
  convert(value: TokenMapEntity): string;
}
