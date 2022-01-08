import fn from 'fs';
import { FileEntity } from '../file.entity';

jest.mock('fs');

describe('FileEntity', () => {
  it('destructurePath()', () => {
    expect(FileEntity.destructurePath('./test/style.css')).toEqual({
      path: './test',
      name: 'style',
      extension: 'css',
    });
    expect(FileEntity.destructurePath('./test/style.vars.css')).toEqual({
      path: './test',
      name: 'style.vars',
      extension: 'css',
    });
    expect(FileEntity.destructurePath('./test/style-vars.any.css')).toEqual({
      path: './test',
      name: 'style-vars.any',
      extension: 'css',
    });
    expect(FileEntity.destructurePath('./test/style')).toEqual({
      path: './test',
      name: 'style',
      extension: '',
    });
    expect(FileEntity.destructurePath('style.css')).toEqual({
      path: '',
      name: 'style',
      extension: 'css',
    });
    expect(FileEntity.destructurePath('.style.css')).toEqual({
      path: '',
      name: '.style',
      extension: 'css',
    });
  });

  describe('mkDir()', () => {
    it('path falsy > do nothink', () => {
      const existsSyncSpy = jest.spyOn(fn, 'existsSync');
      const mkdirSyncSpy = jest.spyOn(fn, 'mkdirSync');

      FileEntity.mkDir(null as any);
      expect(existsSyncSpy).not.toBeCalled();
      expect(mkdirSyncSpy).not.toBeCalled();

      FileEntity.mkDir(undefined as any);
      expect(existsSyncSpy).not.toBeCalled();
      expect(mkdirSyncSpy).not.toBeCalled();

      FileEntity.mkDir('' as any);
      expect(existsSyncSpy).not.toBeCalled();
      expect(mkdirSyncSpy).not.toBeCalled();

      FileEntity.mkDir(false as any);
      expect(existsSyncSpy).not.toBeCalled();
      expect(mkdirSyncSpy).not.toBeCalled();
    });

    it('directory exist > do nothink', () => {
      const existsSyncSpy = jest.spyOn(fn, 'existsSync');
      const mkdirSyncSpy = jest.spyOn(fn, 'mkdirSync');

      existsSyncSpy.mockReturnValue(true);
      FileEntity.mkDir('./test');
      expect(existsSyncSpy).toBeCalledWith('./test');
      expect(mkdirSyncSpy).not.toBeCalled();
    });

    it('directory not exist > create', () => {
      const existsSyncSpy = jest.spyOn(fn, 'existsSync');
      const mkdirSyncSpy = jest.spyOn(fn, 'mkdirSync');

      existsSyncSpy.mockReturnValue(false);
      FileEntity.mkDir('./test');
      expect(existsSyncSpy).toBeCalledWith('./test');
      expect(mkdirSyncSpy).toBeCalled();
    });
  });
});
