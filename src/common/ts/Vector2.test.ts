import Vector2 from './Vector2';

describe('Vector2 tests', () => {
    it('Init vector', () => {
        const v = new Vector2(0, 0);

        expect(v.x).toEqual(0);
        expect(v.y).toEqual(0);
    });

    it('Sub', () => {
        const v = new Vector2(2, 1);
        v.sub(1, 1);

        expect(v.x).toEqual(1);
        expect(v.y).toEqual(0);
    });

    it('Len', () => {
        const v = new Vector2(2, 3);
        const length = v.len();

        expect(length).toEqual(3.605551275463989);
    });

    it('Angle', () => {
        const v = new Vector2(2, 3);
        const v2 = new Vector2(1, 3);

        const radians = v.angleRad(v2);

        expect(radians).toEqual(0.2662520491509253);
    });

    it('Cross Product', () => {
        const v = new Vector2(2, 3);
        const v2 = new Vector2(1, 3);

        const crossProduct = v.crs(v2);

        expect(crossProduct).toEqual(3);
    });

    it('Dot Product', () => {
        const v = new Vector2(2, 3);
        const v2 = new Vector2(1, 3);

        const crossProduct = v.dot(v2);

        expect(crossProduct).toEqual(11);
    });
});
