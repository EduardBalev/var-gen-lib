import { ConvertCommand } from '../ports/in/convert.command';
import { GenerateFileCommand } from '../ports/in/generate-file.command';
import { GenerateFileUseCase } from '../ports/in/generate-file.use-case';
import { SuccessCreateFilePort } from '../ports/out/success-create-file.port';
import { ConvertorEntity } from '../entities/convertor.entity';
import { FileEntity } from '../entities/file.entity';
import { TokenMapEntity } from '../entities/token-map.entity';
import { ConvertorsMapPort } from '../ports/out/convertors-map.port';

export class GenerateFileService implements GenerateFileUseCase {
  constructor(private readonly _convertorsMap: ConvertorsMapPort) {}

  public async generate(
    command: GenerateFileCommand,
  ): Promise<SuccessCreateFilePort> {
    const { path, name, extension } = FileEntity.destructurePath(command.path);
    const convertor = this._convertorFactory(command.mode ?? extension);
    const content = this._parse(command.value, convertor);
    const creator = new FileEntity(path, name, extension, content);
    return await creator.write().then((file) => ({
      path,
      fullPath: file.path,
      extension,
      name,
    }));
  }

  private _parse(value: TokenMapEntity, convertor: ConvertCommand): string {
    return convertor.convert(value);
  }

  private _convertorFactory(extension: string): ConvertorEntity {
    const convertor = this._convertorsMap.get(extension);

    if (convertor == null) {
      throw `Extension '.${extension}' is unsupported format!`;
    }

    return convertor;
  }
}
