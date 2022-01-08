import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { TokenMapEntity } from './domains/entities/token-map.entity';
import { GenerateFileService } from './domains/services/parse.service';
import { ConvertorsMap } from './modules/convertors/convertors.map';

const VARS = new TokenMapEntity({
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
});

VARS.add({
  alala: 22,
});

VARS.add({
  alalaBlock: {
    test: '120px',
  },
});

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

let pathToFile = argv._[0] ? `${argv._[0]}` : './result/colors.css';
let mode = argv._[1] ? `${argv._[1]}` : null;
if (pathToFile.split('/').length === 1) {
  pathToFile = `./${pathToFile}`;
}

const genService = new GenerateFileService(ConvertorsMap);

genService.generate(pathToFile, VARS, mode).then((result) => {
  console.log(`File ${result.path} to be generated successfully!`);
});
