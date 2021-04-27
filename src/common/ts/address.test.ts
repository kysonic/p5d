import { parseHash } from './address';

describe('Address test', () => {
    it('Parse hash', () => {
        const hashObject = parseHash('#hash=123123&hash2=12390213');

        expect(hashObject).toMatchObject({
            hash: '123123',
            hash2: '12390213',
        });
    });
});
