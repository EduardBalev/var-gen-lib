import { SuccessCreateFilePort } from '../out/success-create-file.port';
import { GenerateFileCommand } from './generate-file.command';

export interface GenerateFileUseCase {
  generate(command: GenerateFileCommand): Promise<SuccessCreateFilePort>;
}
