export type ConvertorInput = {
  [key: string]: string | ConvertorInput;
};

export type ConvertorInputEntry = [string, string | ConvertorInput][];

export abstract class Convertor {
  abstract convert(obj: ConvertorInput): string;
}

export class ParseController {
  static parse(obj: ConvertorInput, convertor: Convertor): string {
    return convertor.convert(obj);
  }
}
