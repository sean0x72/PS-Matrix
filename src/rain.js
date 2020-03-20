class Rain {
    static minDrops = 3
    static dropType = {
        0: PsTriangle,
        1: PsCircle,
        2: PsCross,
        3: PsSquare,
    }
    constructor(maxDrops, column, spacing, scale) {
        this.maxAllowedDrops = maxDrops
        this.dropsSizeMax = this.generateLength()
        this.scale = scale
        this.column = column
        this.nextDropPosition = 0
        this.xPos = column * spacing
        this.drops = []
        this.offScreen = false
        this.allowTrail = false
        this.hasTrail = false
        this.dropSpacing = spacing
    }
    generateLength() {
        return (
            Math.floor(
                Math.random() * (this.maxAllowedDrops - Rain.minDrops + 1)
            ) + Rain.minDrops
        )
    }
    addDrop() {
        if (this.drops.length >= this.dropsSizeMax) this.removeDrop()
        const dropIndex = Math.floor(Math.random() * 4)
        const y = this.nextDropPosition * this.dropSpacing
        this.nextDropPosition++
        const drop = new Rain.dropType[dropIndex](this.xPos, y, this.scale)
        this.drops.push(drop)
    }
    removeDrop() {
        this.drops.shift()
    }
    render() {
        const l = this.drops.length
        for (let i = 0; i < l; i++) {
            let drop = this.drops[i]
            const chance = Math.random()
            if (i > 3 && chance > 0.85) {
                const newDropType = Math.floor(Math.random() * 4)
                const newDrop = new Rain.dropType[newDropType](
                    this.xPos,
                    drop.y,
                    this.scale
                )
                newDrop.opacity = drop.opacity
                newDrop.brightness = drop.brightness
                drop = newDrop
                this.drops.splice(i, 1, newDrop)
            }
            if (i === l - 1) {
                drop.brightness = 2
            } else if (i === l - 2) {
                drop.brightness = 1.6
            } else if (i === l - 3) {
                drop.brightness = 1.3
            } else {
                drop.brightness = 1
            }
            if (this.dropsSizeMax > 4 && i < l - 3) {
                drop.opacity -= this.dropsSizeMax / 2
            }
            drop.render()
        }
        if (
            this.drops[0].y + this.dropSpacing >
            this.maxAllowedDrops * this.dropSpacing
        ) {
            this.offScreen = true
        }
        if (
            this.dropsSizeMax === l &&
            this.drops[l - 1].y > this.dropSpacing * 4
        ) {
            this.allowTrail = true
        }
    }
}
