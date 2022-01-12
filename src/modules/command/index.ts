import { promises } from 'fs';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { DEFAULT_TARGET_FILE_PATH } from '../../config';
import { BuildInput } from '../../core/ports/in/build-input.type';
import { BuildService } from '../../core/services/build.service';
import { TokenPrimitiveMapType } from '../../domains/entities/token-map.entity';

const argv = yargs(hideBin(process.argv)).argv as {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

let [_sourceFile, _pathToFile, _mode] = argv._ as string[];
if (_pathToFile && _pathToFile.split('/').length === 1) {
  _pathToFile = `./${_pathToFile}`;
}

const sourceFile = _sourceFile ? `${_sourceFile}` : null;
const pathToFile = _pathToFile ? `${_pathToFile}` : DEFAULT_TARGET_FILE_PATH;
const mode = _mode ? `${_mode}` : null;

if (sourceFile == null) {
  throw `Source file not awaitable. Please use '[sourceFile] [pathToFile?] [mode?]'`
}

export const run = () => {
  return promises.readFile(sourceFile)
    .then(buffer => {
      let json: BuildInput;
      try {
        json = JSON.parse(buffer.toString('utf-8'));
      } catch (err) {
        throw err;
      }
      return json;
    })
    .then((json) => new BuildService().generate(pathToFile, json, mode))
    .then((result) => {
      console.log(`File ${result.fullPath} to be generated successfully!`);
    })
    .catch((err) => {
      console.log(`File do not be generated!`, err);
    });
}

export default run;