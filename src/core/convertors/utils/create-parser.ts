const createParser = (matcher: RegExp, replacer: any) => {
  const regex = RegExp(matcher, 'g');
  return (value: string) => {
    // throw an error if not a string
    if (typeof value !== 'string') {
      throw new TypeError(
        `expected an argument of type string, but got ${typeof value}`,
      );
    }

    // if no match between string and matcher
    if (!value.match(regex)) {
      return value;
    }

    // executes the replacer function for each match
    // replacer can take any arguments valid for String.prototype.replace
    return value.replace(regex, replacer);
  };
};

export default createParser;
