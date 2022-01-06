import { CreateFile } from './controllers/create-file.controller';
import { ParseController } from './controllers/parse.controller';
import { ConvertToCss } from './controllers/convertors/convert-to-css';

const VARS = {
  test: `'TEST variable'`,
  colors: {
    'color-black': '#000000',
    'color-white': '#ffffff',
    'color-grey': '#cccccc',
  },
  'bg-color': {
    'bg-color-black': 'hsla(0, 0%, 0%, 0.15)',
    'bg-color-white': 'hsla(0, 0%, 100%, 0.15)',
    'bg-color-grey': 'hsla(0, 0%, 80%, 0.15)',
  },
};

const creator = new CreateFile();

creator.writeFile('./result/colors.css', ParseController.parse(VARS, new ConvertToCss())).then((result) => {
  console.log(result);
});
