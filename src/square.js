class PsSquare {
    static color = {
        r: 212,
        g: 145,
        b: 189,
    }
    constructor(x = 0, y = 0, scale = 1) {
        this.x = x
        this.y = y
        this.scale = scale
        this.thickness = 20
        this.brightness = 1
        this.opacity = 255
        this.size = 120
        this.offset = 6
        this.outterBox = {
            x1: null,
            x2: null,
            y1: null,
            y2: null,
        }
        this.innerBox = {
            x1: null,
            x2: null,
            y1: null,
            y2: null,
        }
        this._calc()
    }
    _calc() {
        const x1 = this.x + this.offset * this.scale
        const y1 = this.y + this.offset * this.scale
        const outterSize = (this.size - this.offset) * this.scale

        const thickness = this.thickness * this.scale
        this.outterBox = {
            x1,
            x2: this.x + outterSize,
            y1,
            y2: this.y + outterSize,
        }
        this.innerBox = {
            x1: x1 + thickness,
            x2: this.outterBox.x2 - thickness,
            y1: y1 + thickness,
            y2: this.outterBox.y2 - thickness,
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
        beginShape()
        // Exterior part of shape, clockwise winding
        const outter = this.outterBox
        const inner = this.innerBox
        vertex(outter.x1, outter.y1)
        vertex(outter.x2, outter.y1)
        vertex(outter.x2, outter.y2)
        vertex(outter.x1, outter.y2)
        // Interior part of shape, counter-clockwise winding
        beginContour()
        vertex(inner.x1, inner.y1)
        vertex(inner.x1, inner.y2)
        vertex(inner.x2, inner.y2)
        vertex(inner.x2, inner.y1)
        endContour()
        const r = Math.min(255, PsSquare.color.r * this.brightness)
        const g = Math.min(255, PsSquare.color.g * this.brightness)
        const b = Math.min(255, PsSquare.color.b * this.brightness)
        fill(r, g, b, this.opacity)
        endShape(CLOSE)
        pop()
    }
}
