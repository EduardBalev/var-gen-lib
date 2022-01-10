import { TokenPrimitiveMapType } from '../../../domains/entities/token-map.entity';
import { SuccessCreateFilePort } from '../../../domains/ports/out/success-create-file.port';

export interface BuildUseCase {
  generate(
    path: string,
    value: TokenPrimitiveMapType,
    mode?: string | null,
  ): Promise<SuccessCreateFilePort>;
}
