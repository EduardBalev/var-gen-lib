import fs from 'fs';

export class CreateFile {
  public async mkDir(path: string | string[]): Promise<string> {
    if (path == null) throw `CreateFile.mkDir: path [${path}] is not a string or an Array<string>`;

    let stringPath: string = Array.isArray(path) ? path.join('/') : path;

    if (!fs.existsSync(stringPath)) {
      fs.mkdirSync(stringPath, { recursive: true });
    }

    return await stringPath;
  }

  public async createFile(path: string | string[]): Promise<string> {
    if (path == null) throw `CreateFile.createFile: path [${path}] is not a string or an Array<string>`;

    const pathSequence: string[] = Array.isArray(path) ? path : path.split('/');
    const dir: string[] = pathSequence.slice(0, pathSequence.length - 1);
    const fileName: string = pathSequence[pathSequence.length - 1];
    const pathStr = await this.mkDir(dir).then((dirPath) => `${dirPath}/${fileName}`);

    try {
      await fs.promises.open(pathStr, 'w');
      return pathStr;
    } catch (err) {
      throw err;
    }
  }

  public async writeFile(path: string, content: string = ''): Promise<string> {
    await this._createIfNotExistFile(path);

    try {
      await fs.promises.writeFile(path, content);
      return 'File is created successfully.';
    } catch (error) {
      throw error;
    }
  }

  public async appendFile(path: string, content: string = ''): Promise<string> {
    await this._createIfNotExistFile(path);

    try {
      await fs.promises.appendFile(path, content);
      return 'File is created successfully.';
    } catch (error) {
      throw error;
    }
  }

  private async _createIfNotExistFile(path: string): Promise<void> {
    if (path == null) throw `CreateFile.writeFile: path [${path}] is not a string`;

    try {
      await fs.promises.access(path);
    } catch (error) {
      await this.createFile(path);
    }
  }
}
