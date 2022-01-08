import { ConvertorEntity } from '../entities/convertor.entity';
import { FileEntity } from '../entities/file.entity';
import { TokenMapEntity } from '../entities/token-map.entity';
import { GenerateFileQuery } from '../ports/in/generate-file.query';
import { ConvertorsMapPort } from '../ports/out/convertors-map.port';

export class GenerateFileService implements GenerateFileQuery {
  constructor(private readonly _convertorsMap: ConvertorsMapPort) {}

  public parse(value: TokenMapEntity, convertor: ConvertorEntity): string {
    return convertor.convert(value);
  }

  public convertorFactory(extension: string): ConvertorEntity {
    const convertor = this._convertorsMap.get(extension);

    if (convertor == null) {
      throw `Extension '.${extension}' is unsupported format!`;
    }

    return convertor;
  }

  public async generate(
    pathToFile: string,
    value: TokenMapEntity,
    mode?: string | null
  ): Promise<FileEntity> {
    const { path, name, extension } = FileEntity.destructurePath(pathToFile);
    const convertor = this.convertorFactory(mode ?? extension);
    const content = this.parse(value, convertor);
    const creator = new FileEntity(path, name, extension, content);
    return await creator.write();
  }
}
