export default class Vector2 {
    x: number = 0;
    y: number = 0;

    constructor(x: number | Vector2, y?: number) {
        if (x instanceof Vector2)
            this.set(x);
        else {
            this.x = x || 0;
            this.y = y || 0;
        }
        return this;

    }

    sub(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            this.x -= x.x;
            this.y -= x.y;
        } else {
            this.x -= x;
            this.y -= y!;
        }
        return this;
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    angleRad(reference: Vector2) {
        return Math.atan2(this.crs(reference), this.dot(reference));
    }

    // Cross Product Perpendicular to both of vectors
    crs(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            return this.x * x.y - this.y * x.x;
        } else {
            return this.x * y! - this.y * x;
        }
    }
    // Dot product of vectors finds difference between those vectors directions
    dot(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            return this.x * x.x + this.y * x.y;
        } else {
            return this.x * x + this.y * y!;
        }
    }
    // Vector normalization
    nor() {
        const len = this.len();
        if (len != 0) {
            this.x /= len;
            this.y /= len;
        }
        return this;
    }

    set(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = y!;
        }

        return this;
    }

    hasSameDirection(v: Vector2) {
        return this.dot(v) > 0;
    }

    /** Rotates the Vector2 by 90 degrees in the specified direction,
     * where >= 0 is counter-clockwise and < 0 is clockwise. */
    rotate90(dir: number) {
        const x = this.x;
        if (dir >= 0) {
            this.x = -this.y;
            this.y = x;
        } else {
            this.x = this.y;
            this.y = -x;
        }
        return this;
    }

    /** Multiplies this vector by a scalar
     * @return This vector for chaining */
    scl(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            this.x *= x.x;
            this.y *= x.y;
        } else if (typeof x === 'number' && y == undefined) {
            this.x *= x;
            this.y *= x;
        } else {
            this.x *= x;
            this.y *= y!;
        }

        return this;
    }

    /** Adds the given components to this vector
     * @return This vector for chaining */
    add(x: number | Vector2, y?: number) {
        if (x instanceof Vector2) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x += x;
            this.y += y!;
        }

        return this;
    }

    /*dst (Vector2 v)*/
    dst(v:Vector2) {
        const x_d = v.x - this.x;
        const y_d = v.y - this.y;
        return Math.sqrt(x_d * x_d + y_d * y_d);
    }

    /*isOnLine (Vector2 other) */
    isOnLine(other: Vector2) {
        return Math.abs(this.x * other.y - this.y * other.x) <= 0.000001;
    }

    /*isCollinearOpposite (Vector2 other)*/
    isCollinearOpposite(other: Vector2) {
        return this.isOnLine(other) && this.dot(other) < 0;
    }

    equals(obj: Vector2) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (this.x != obj.x)
            return false;
        if (this.y != obj.y)
            return false;

        return true;
    }

    epsilonEquals(other: Vector2, epsilon: number) {
        if (other == null)
            return false;
        if (Math.abs(other.x - this.x) > epsilon)
            return false;
        if (Math.abs(other.y - this.y) > epsilon)
            return false;
        return true;
    }

    hasOppositeDirection(vector: Vector2) {
        return this.dot(vector) < 0;
    }

    /** return the angle in degrees of this vector (point) relative to the given vector. Angles are towards the positive y-axis
     *  (typically counter-clockwise.) between -180 and +180 */
    /** return the angle in degrees of this vector (point) relative to the x-axis. Angles are towards the positive y-axis
     *         (typically counter-clockwise) and between 0 and 360. */
    angle(reference?: Vector2) {
        if (reference == undefined) {
            return Math.atan2(this.y, this.x);
        } else {
            return Math.atan2(this.crs(reference), this.dot(reference));
        }

    }

    isCollinear(other: Vector2) {
        return this.isOnLine(other) && this.dot(other) > 0;
    }

}

/*
α°= r*(180°/ π)
 */

/*
SOH CAH TOA

sin a = opp/hyp
cos a = adj/hyp
tan a = opp/adj
cot a = 1 / tan
 */
