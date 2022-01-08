import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { ConvertToCss } from './modules/convertors';
import { FileEntity } from './domains/entities/file.entity';
import { TokenMapEntity } from './domains/entities/token-map.entity';
import { ParseCommand } from './domains/ports/out/parser.command';

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
if (pathToFile.split('/').length === 1) {
  pathToFile = `./${pathToFile}`;
}

// TODO: implement factory for auto get class for convert from file extension
FileEntity.createNew(pathToFile, ParseCommand.parse(VARS, new ConvertToCss())).then((result) => {
  console.log(`File ${result.path} to be generated successfully!`);
});
