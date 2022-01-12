import {
  TokenMapEntity
} from '../../domains/entities/token-map.entity';
import { GenerateFileCommand } from '../../domains/ports/in/generate-file.command';
import { GenerateFileService } from '../../domains/services/generate-file.service';
import { ConvertorsMapAdapter } from '../adapters/convertors.map';
import { BuildInput } from '../ports/in/build-input.type';
import { BuildUseCase } from '../ports/in/build.use-case';
import { BuildSuccessPort } from '../ports/out/build-success.port';

export class BuildService implements BuildUseCase {
  private readonly genService = new GenerateFileService(
    new ConvertorsMapAdapter(),
  );

  public generate(
    path: string,
    value: BuildInput,
    mode?: string | null,
  ): Promise<BuildSuccessPort> {
    const tokens = new TokenMapEntity(value);
    const genCommand = new GenerateFileCommand(path, tokens, mode);
    return this.genService.generate(genCommand);
  }
}
