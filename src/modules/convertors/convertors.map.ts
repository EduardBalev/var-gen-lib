import { ConvertToCss } from '.';
import { ConvertorsMapPort } from '../../domains/ports/out/convertors-map.port';

export const ConvertorsMap: ConvertorsMapPort = new Map([
  ['css', new ConvertToCss()],
  ['scss', new ConvertToCss('scss')],
  ['sass', new ConvertToCss('sass')],
]);
