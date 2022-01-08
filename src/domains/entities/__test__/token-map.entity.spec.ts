import { TokenMapEntity } from '../token-map.entity';

describe('TokenMapEntity', () => {
  describe('add()', () => {
    it('flat value', () => {
      const entity = new TokenMapEntity();
      const input = {
        colorBg: '#ffffff',
        colorText: 'hsl(0, 0%, 0%)',
        fontFamily: `'Custom Font Name', Helvetica, sans-serif`,
      };
      entity.add(input);
      expect(entity.map).toEqual(new Map(Object.entries(input)));
    });

    it('deeper value', () => {
      const entity = new TokenMapEntity();
      const input = {
        colorBg: '#ffffff',
        colorText: 'hsl(0, 0%, 0%)',
        fontFamily: `'Custom Font Name', Helvetica, sans-serif`,
        deep: {
          deeperProp: 'any',
        },
      };
      entity.add(input);
      const expected: any = new Map(Object.entries(input));
      expected.set('deep', new TokenMapEntity(input.deep));
      expect(entity.map).toEqual(expected);
    });
  });
});
