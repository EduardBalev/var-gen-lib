import { promises } from "fs";
import { run } from "../src/modules/file";

promises.readFile(`${__dirname}/source.json`)
  .then(buffer => buffer.toString('utf-8'))
  .then(source => {
    run(source, './demo/result/variables-from-file.css');
  })