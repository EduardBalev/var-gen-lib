import createParser from './create-parser';

const camelToKebab = createParser(
  /[A-Z]/,
  (match: string) => `-${match.toLowerCase()}`,
);
const snakeToKebab = createParser(/_/, () => '-');

export { camelToKebab, snakeToKebab };
