import { TokenPrimitiveMapType } from '../../../domains/entities/token-map.entity';
import { BuildSuccessPort } from '../out/build-success.port';

export interface BuildUseCase {
  generate(
    path: string,
    value: TokenPrimitiveMapType,
    mode?: string | null,
  ): Promise<BuildSuccessPort>;
}
