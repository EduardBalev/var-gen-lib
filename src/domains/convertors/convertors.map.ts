import { CssConvertor } from './convertors-list';
import { ConvertorsMapPort } from '../ports/out/convertors-map.port';

export const ConvertorsMap: ConvertorsMapPort = new Map([
  ['css', new CssConvertor()],
  ['scss', new CssConvertor('scss')],
  ['sass', new CssConvertor('sass')],
]);
