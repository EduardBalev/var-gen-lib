import {
  TokenMapEntity,
  TokenPrimitiveMapType,
} from '../../domains/entities/token-map.entity';
import { ConvertStrategy } from '../../domains/ports/in/convert.strategy';
import { deepObjToString } from './utils/obj-to-string';
import { camelToKebab } from './utils/parsers';

export class CssConvertorStrategy implements ConvertStrategy {
  public convert(value: TokenMapEntity): string {
    const obj = value.value as TokenPrimitiveMapType;
    const result = deepObjToString(
      obj,
      (_val) => `  --${camelToKebab(_val)}`,
      true,
    );
    return `${this._addComment(
      `This file to generated by VarGen!`,
    )}\n\nhtml{\n${result}\n}`;
  }

  private _addComment(text: string): string {
    return `/* ${text} */`;
  }
}
