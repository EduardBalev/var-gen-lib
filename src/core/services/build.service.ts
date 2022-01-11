import {
  TokenMapEntity,
  TokenPrimitiveMapType,
} from '../../domains/entities/token-map.entity';
import { GenerateFileCommand } from '../../domains/ports/in/generate-file.command';
import { SuccessCreateFilePort } from '../../domains/ports/out/success-create-file.port';
import { GenerateFileService } from '../../domains/services/generate-file.service';
import { ConvertorsMapAdapter } from '../adapters/convertors.map';
import { BuildUseCase } from '../ports/in/build.use-case';

export class BuildService implements BuildUseCase {
  private readonly genService = new GenerateFileService(
    new ConvertorsMapAdapter(),
  );

  public generate(
    path: string,
    value: TokenPrimitiveMapType,
    mode?: string | null,
  ): Promise<SuccessCreateFilePort> {
    const tokens = new TokenMapEntity(value);
    const genCommand = new GenerateFileCommand(path, tokens, mode);
    return this.genService.generate(genCommand);
  }
}
