class PsCircle {
    static color = { r: 240, g: 110, b: 108 }
    constructor(x = 0, y = 0, scale = 1) {
        this.x = x
        this.y = y
        this.scale = scale
        this.thickness = 20
        this.length = 150
        this.radius = 60
        this.brightness = 1
        this.opacity = 255
        this.resolution = 40
        this.outterRing = []
        this.innerRing = []
        this._calc()
    }
    _calc() {
        const resolution = this.resolution
        const piRes = TWO_PI / resolution
        const scale = this.radius * this.scale
        const innerScale = (this.radius - this.thickness) * this.scale
        for (let i = 0; i < resolution; i++) {
            const angle = piRes * i
            const s = Math.sin(angle)
            const c = Math.cos(angle)
            const x = s * scale
            const y = c * scale
            const v = [x, y]
            this.outterRing.push(v)
        }

        for (let i = resolution; i > 0; i--) {
            const angle = piRes * i
            const x = Math.sin(angle) * innerScale
            const y = Math.cos(angle) * innerScale
            const v = [x, y]
            this.innerRing.push(v)
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
        const scale = this.radius * this.scale
        push()
        noStroke()
        translate(scale + this.x, scale + this.y)
        beginShape()
        for (const v of this.outterRing) {
            vertex(v[0], v[1], 0)
        }
        beginContour()
        for (const v of this.innerRing) {
            vertex(v[0], v[1], 0)
        }
        endContour()
        const r = Math.min(255, PsCircle.color.r * this.brightness)
        const g = Math.min(255, PsCircle.color.g * this.brightness)
        const b = Math.min(255, PsCircle.color.b * this.brightness)
        fill(r, g, b, this.opacity)
        endShape(CLOSE)
        pop()
    }
}
