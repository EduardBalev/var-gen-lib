import { CreateFile } from './src/controllers/create-file.controller';

const VARS = {
  black: '#000000',
  white: '#ffffff',
};

const creator = new CreateFile();

const parseContent = (obj: { [key: string]: string }): string => {
  const entry = Object.entries(obj);
  let result = 'html {';
  entry.forEach(([key, value]) => {
    result += '\n  ';
    result += `--${key}: ${value};`;
  });
  result += '\n}';

  return result;
};

creator.writeFile('dist/testFile.css', parseContent(VARS)).then((result) => {
  console.log(result);
});
