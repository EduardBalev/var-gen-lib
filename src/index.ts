import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
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

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

let path = argv._[0] ? `${argv._[0]}` : './result/colors.css';

if (path.split('/').length === 1) {
  path = `./${path}`;
}

creator.writeFile(path, ParseController.parse(VARS, new ConvertToCss())).then((result) => {
  console.log(result);
});
