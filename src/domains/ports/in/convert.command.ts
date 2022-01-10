import { TokenMapEntity } from '../../entities/token-map.entity';

export interface ConvertCommand {
  convert(value: TokenMapEntity): string;
}
