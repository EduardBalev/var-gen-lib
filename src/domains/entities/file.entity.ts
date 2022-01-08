import { constants, existsSync, mkdirSync, promises } from 'fs';

export class FileEntity {
  private _content: string | null = null;

  constructor(
    private readonly _path: string | string[] | null,
    private readonly _fileName: string,
    private readonly _extension: string,
    readonly __content: string,
  ) {
    if (__content) this._content = __content;
  }

  static destructurePath(path: string): {
    path: string;
    name: string;
    extension: string;
  } {
    const splitLast = (_arr: string[]): [string[], string] => {
      const arr = _arr.slice(0, _arr.length - 1);
      const last = _arr[_arr.length - 1];
      return [arr, last];
    };
    const pathSequence: string[] = Array.isArray(path) ? path : path.split('/');
    const [dirSequence, file] = splitLast(pathSequence);
    const [nameSequence, extension] = splitLast(file?.split('.'));

    return {
      path: dirSequence.join('/'),
      name: nameSequence.join('.'),
      extension,
    };
  }

  static mkDir(path: string): void {
    if (!path) return;

    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  public get path(): string {
    return `${this.dirPath}/${this._fileName}.${this._extension}`;
  }

  public get dirPath(): string {
    if (this._path == null) return '';
    return Array.isArray(this._path) ? this._path.join('/') : this._path;
  }

  public get dirPathSequence(): string[] {
    if (this._path == null) return [];
    return Array.isArray(this._path) ? this._path : this._path.split('/');
  }

  public get content(): string | null {
    return this._content;
  }

  public set content(content: string | null) {
    this._content = content;
  }

  public async create() {
    try {
      await promises.access(this.path, constants.R_OK | constants.W_OK);
    } catch (err) {
      FileEntity.mkDir(this.dirPath);
      await promises.open(this.path, 'w', constants.R_OK);
    }
  }

  public async write(): Promise<FileEntity> {
    await this._write(this.content ?? '', true);
    return this;
  }

  public async append(content: string): Promise<FileEntity> {
    const c = content ?? '';
    this.content = (this.content ?? '') + c;
    await this._write(c, true);
    return this;
  }

  private async _write(content: string, replace = false) {
    try {
      this.create();
      const writeFn = replace ? promises.writeFile : promises.appendFile;
      await writeFn(this.path, content);
    } catch (error) {
      throw error;
    }
  }
}
