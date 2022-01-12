import { DEFAULT_TARGET_FILE_PATH } from "../../config";
import { BuildInput } from "../../core/ports/in/build-input.type";
import { BuildService } from "../../core/services/build.service";

export const run = (
  source: string,
  pathToFile?: string | null,
  mode?: string | null
) => {
  let json: BuildInput;
  const _pathToFile = pathToFile ? `${pathToFile}` : DEFAULT_TARGET_FILE_PATH;
  try {
    json = JSON.parse(source);
  } catch (err) {
    throw err;
  }

  return new BuildService().generate(_pathToFile, json, mode)
    .then((result) => {
      console.log(`File ${result.fullPath} to be generated successfully!`);
    })
    .catch((err) => {
      console.log(`File do not be generated!`, err);
    });
}

export default run;