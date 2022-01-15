import { camelToKebab } from './parsers';

const notObjError = (styleObj: any) => {
  if (!styleObj || typeof styleObj !== 'object' || Array.isArray(styleObj)) {
    throw new TypeError(
      `expected an argument of type object, but got ${typeof styleObj}`,
    );
  }
};

export const objToString = (
  styleObj: { [key: string]: any },
  parser = camelToKebab,
): string => {
  notObjError(styleObj);
  const lines = Object.entries(styleObj).map(([key, property]) => {
    return `${parser(key)}: ${property};`;
  });
  return lines.join('\n');
};

export const deepObjToString = (
  styleObj: { [key: string]: any },
  parser = camelToKebab,
  prefix: string | boolean = false,
): string => {
  notObjError(styleObj);

  const lines = Object.entries(styleObj).map(([key, value]) => {
    const _key = prefix
      ? `${typeof prefix === 'string' ? `${prefix}-` : ''}${key}`
      : key;

    if (typeof value === 'object') {
      return deepObjToString(value, parser, _key);
    }
    return `${parser(_key)}: ${value};`;
  });

  return lines.join('\n');
};
