class PsTriangle {
    static color = { r: 56, g: 222, b: 200 }
    constructor(x = 0, y = 0, scale = 1) {
        this.x = x
        this.y = y
        this.scale = scale
        this.thickness = 20
        this.size = 120
        this.brightness = 1
        this.opacity = 255
        this.outterBox = {
            x1: null,
            x2: null,
            x3: null,
            y1: null,
            y2: null,
        }
        this.innerBox = {
            x1: null,
            x2: null,
            x3: null,
            y1: null,
            y2: null,
        }
        this._calc()
    }
    _calc() {
        const topX = this.x + (this.size / 2) * this.scale
        const leftX = this.x
        const rightX = this.x + this.size * this.scale

        const thickness = this.thickness * this.scale
        this.outterBox = {
            x1: topX,
            x2: rightX,
            x3: leftX,
            y1: this.y,
            y2: this.y + (this.size - 14 )* this.scale,
        }
        this.innerBox = {
            x1: topX,
            x2: this.outterBox.x2 - thickness - this.scale * 3,
            x3: this.outterBox.x3 + thickness + this.scale * 3,
            y1: this.outterBox.y1 + thickness + this.scale * 4,
            y2: this.outterBox.y2 - this.scale * 13,
        }
    }
    move(x, y) {
        this.x += x
        this.y += y
        this._calc()
    }
    setPosition(x, y) {
        this.x = x
        this.y = y
        this._calc()
    }
    render() {
        push()
        noStroke()
        const r = Math.min(255, PsTriangle.color.r * this.brightness * 2)
        const g = Math.min(255, PsTriangle.color.g * this.brightness * 2)
        const b = Math.min(255, PsTriangle.color.b * this.brightness * 2)
        fill(r, g, b, this.opacity)
        beginShape()
        // Exterior part of shape, clockwise winding
        const outter = this.outterBox
        const inner = this.innerBox
        vertex(outter.x1, outter.y1)
        vertex(outter.x2, outter.y2)
        vertex(outter.x3, outter.y2)
        // Interior part of shape, counter-clockwise winding
        beginContour()
        vertex(inner.x1, inner.y1)
        vertex(inner.x3, inner.y2)
        vertex(inner.x2, inner.y2)
        endContour()
        endShape(CLOSE)
        pop()
    }
}
