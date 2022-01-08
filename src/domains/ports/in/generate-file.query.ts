import { FileEntity } from '../../entities/file.entity';
import { TokenMapEntity } from '../../entities/token-map.entity';

export interface GenerateFileQuery {
  generate(
    path: string,
    value: TokenMapEntity,
    mode?: string | null,
  ): Promise<FileEntity>;
}
