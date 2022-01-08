/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConvertorEntity } from '../../entities/convertor.entity';
import { FileEntity } from '../../entities/file.entity';
import { TokenMapEntity } from '../../entities/token-map.entity';
import { GenerateFileService } from '../generate-file.service';

const mockPathData = {
  path: './test',
  name: 'file',
  extension: 'css',
  fullPath: './test/file.css',
};

jest.mock('fs');
jest.mock('../../entities/file.entity', () => ({
  FileEntity: class {
    async write() {
      return await {
        path: mockPathData.fullPath,
      };
    }
  },
}));

describe('GenerateFileService > generate()', () => {
  let service: GenerateFileService;

  beforeEach(() => {
    const ConvertorMock = class extends ConvertorEntity {
      convert(value: TokenMapEntity): string {
        return `Converted value`;
      }
    };

    FileEntity.destructurePath = jest.fn().mockReturnValue({
      path: mockPathData.path,
      name: mockPathData.name,
      extension: mockPathData.extension,
    });

    const convertorsMapMock = new Map([
      ['css', new ConvertorMock()],
      ['scss', new ConvertorMock()],
    ]);
    service = new GenerateFileService(convertorsMapMock);
  });

  it('shoult be success processing path and call convertor mock class', () => {
    return service
      .generate(mockPathData.fullPath, new TokenMapEntity({ any: 'any' }))
      .then((result) => {
        expect(result.path).toBe(mockPathData.fullPath);
      });
  });

  it('shoult be success processing with supported mode optional argument', () => {
    return service
      .generate(
        mockPathData.fullPath,
        new TokenMapEntity({ any: 'any' }),
        'scss',
      )
      .then((result) => {
        expect(result.path).toBe(mockPathData.fullPath);
      });
  });

  it('shoult be throw ERROR from convertor mock class > Not supported extension', () => {
    return service
      .generate(
        mockPathData.fullPath,
        new TokenMapEntity({ any: 'any' }),
        'none-supported',
      )
      .catch((error) => {
        expect(error).toBe(
          `Extension '.none-supported' is unsupported format!`,
        );
      });
  });
});
