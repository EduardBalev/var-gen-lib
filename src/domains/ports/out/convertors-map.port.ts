import { ConvertorEntity } from '../../entities/convertor.entity';

export interface ConvertorsMapPort {
  get(extension: string): ConvertorEntity | null;
}
