const SCALE = 0.1
const FONT_WIDTH = 120 * SCALE
const WIDTH = 800
const HEIGHT = 600
const COLUMNS_TOTAL = WIDTH / FONT_WIDTH
const ROWS_TOTAL = HEIGHT / FONT_WIDTH
const FRAME_RATE = 20

let doLoop = true

const storm = []
function setup() {
    frameRate(FRAME_RATE)
    createCanvas(WIDTH, HEIGHT)
    for (let i = 0; i < COLUMNS_TOTAL; i++) {
        const chance = Math.random()
        if (chance > 0.9) {
            const rain = new Rain(ROWS_TOTAL, i, FONT_WIDTH, SCALE)
            storm.push([rain])
        } else {
            storm.push([])
        }
    }
}

function draw() {
    background(0)
    for (let i = 0; i < storm.length; i++) {
        const cloud = storm[i]
        if (cloud.length) {
            const clear = []
            for (let y = 0; y < cloud.length; y++) {
                const rain = cloud[y]
                rain.addDrop()
                rain.render()
                if (rain.offScreen) {
                    clear.push(y)
                }
                if (rain.allowTrail && rain.hasTrail === false) {
                    const chance = Math.random()
                    if (chance > 0.8) {
                        const newRain = new Rain(
                            ROWS_TOTAL,
                            i,
                            FONT_WIDTH,
                            SCALE
                        )
                        cloud.push(newRain)
                        rain.hasTrail = true
                    }
                }
            }
            for (const c of clear) cloud.splice(c, 1)
        } else {
            const chance = Math.random()
            if (chance > 0.4) {
                const rain = new Rain(ROWS_TOTAL, i, FONT_WIDTH, SCALE)
                cloud.push(rain)
            }
        }
    }
    // tri.render()
}

function mousePressed() {
    if (doLoop) {
        noLoop()
        doLoop = false
    } else {
        loop()
        doLoop = true
    }
}
