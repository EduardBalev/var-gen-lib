import { CreateFile } from './controllers/create-file.controller';
import { ParseController } from './controllers/parse.controller';
import { ConvertToCss } from './controllers/convertors/convert-to-css';

const VARS = {
  black: '#000000',
  white: '#ffffff',
  grey: '#cccccc',
};

const creator = new CreateFile();

creator.writeFile('dist/testFile.css', ParseController.parse(VARS, new ConvertToCss())).then((result) => {
  console.log(result);
});
