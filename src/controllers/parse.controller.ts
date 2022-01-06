export abstract class Convertor {
  abstract convert(obj: { [key: string]: string }): string;
}

export class ParseController {
  static parse(obj: { [key: string]: string }, convertor: Convertor): string {
    return convertor.convert(obj);
  }
}
