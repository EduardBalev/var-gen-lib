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
});
