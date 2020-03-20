class PsCross {
    static color = { r: 156, g: 173, b: 229 }
    constructor(x = 0, y = 0, scale = 1) {
        this.x = x
        this.y = y
        this.scale = scale
        this.thickness = 20
        this.length = 130
        this.size = 120
        this.brightness = 1
        this.opacity = 255
        this.rect = {
            center: null,
            length: null,
            thickess: null,
        }
        this._calc()
    }
    _calc() {
        const center = (this.size / 2) * this.scale
        const offsetX = this.size
        const length = this.length * this.scale
        const thickness = this.thickness * this.scale

        this.rect = {
            center,
            length,
            thickness,
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
        const cross = this.rect
        noStroke()
        angleMode(DEGREES)
        rectMode(CENTER)
        translate(this.x, this.y)
        translate(cross.center, cross.center)
        const r = Math.min(255, PsCross.color.r * this.brightness)
        const g = Math.min(255, PsCross.color.g * this.brightness)
        const b = Math.min(255, PsCross.color.b * this.brightness)
        fill(r, g, b, this.opacity)
        push()
        rotate(45)
        rect(0, 0, cross.length, cross.thickness)
        pop()
        push()
        rotate(-45)
        rect(0, 0, cross.length, cross.thickness)
        pop()
        pop()
    }
}
