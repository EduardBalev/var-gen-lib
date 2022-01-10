import { TokenPrimitiveMapType } from '../../domains/entities/token-map.entity';
import { GenerateFileCommand } from '../../domains/ports/in/generate-file.command';
import { SuccessCreateFilePort } from '../../domains/ports/out/success-create-file.port';
import { GenerateFileService } from '../../domains/services/generate-file.service';
import { ConvertorsMapAdapter } from '../adapters/convertors.map';
import { BuildCommand } from '../ports/in/build.command';
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
    const buildCommand = new BuildCommand(path, value, mode);
    const genCommand = new GenerateFileCommand(
      buildCommand.path,
      buildCommand.value,
      buildCommand.mode,
    );
    return this.genService.generate(genCommand);
  }
}
