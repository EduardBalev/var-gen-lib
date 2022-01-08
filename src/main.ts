import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConvertToCss } from './controllers/convertors/convert-to-css';
import { FileEntity } from './domains/entities/file.entity';

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

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

let pathToFile = argv._[0] ? `${argv._[0]}` : './result/colors.css';
if (pathToFile.split('/').length === 1) {
  pathToFile = `./${pathToFile}`;
}

const { path, name, extention } = FileEntity.destructurePath(pathToFile);
const creator = new FileEntity(path, name, extention, FileEntity.parse(VARS, new ConvertToCss()));
creator.write().then((result) => {
  console.log(`File ${name}.${extention} to be generated successfully!`);
});
