import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { BuildService, TokenPrimitiveMapType } from './main';

const VARS: TokenPrimitiveMapType = {
  test: `'TEST variable'`,
  color: {
    black: '#000000',
    white: '#ffffff',
    grey: '#cccccc',
  },
  'bg-color': {
    black: 'hsla(0, 0%, 0%, 0.15)',
    white: 'hsla(0, 0%, 100%, 0.15)',
    grey: 'hsla(0, 0%, 80%, 0.15)',
  },
};

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

let pathToFile = argv._[0] ? `${argv._[0]}` : './result/colors.css';
const mode = argv._[1] ? `${argv._[1]}` : null;
if (pathToFile.split('/').length === 1) {
  pathToFile = `./${pathToFile}`;
}

new BuildService()
  .generate(pathToFile, VARS, mode)
  .then((result) => {
    console.log(`File ${result.fullPath} to be generated successfully!`);
  })
  .catch((err) => {
    console.log(`File do not be generated!`, err);
  });
