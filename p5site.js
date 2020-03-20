/*
    Test code used on https://editor.p5js.org/
*/

function ngon(n, x, y, d) {
    let px = 0
    let py = 0
    let angle = 0

    beginShape()
    for (let i = 0; i < n; i++) {
        angle = (TWO_PI / n) * i
        px = x + sin(angle) * d
        py = y - cos(angle) * d
        vertex(px, py, 0)
    }
    beginContour()

    for (let i = n; i > 0; i--) {
        angle = (TWO_PI / n) * i
        px = x + sin(angle) * (d - 20)
        py = y - cos(angle) * (d - 20)
        vertex(px, py, 0)
    }
    endContour()
    fill(237, 34, 93)
    endShape(CLOSE)
}
console.log('asdasd')
function setup() {
    createCanvas(400, 400)
}

function pssquare() {
    noStroke()
    beginShape()
    // Exterior part of shape, clockwise winding
    vertex(0, 0)
    vertex(120, 0)
    vertex(120, 120)
    vertex(0, 120)
    // Interior part of shape, counter-clockwise winding
    beginContour()
    vertex(20, 20)
    vertex(20, 100)
    vertex(100, 100)
    vertex(100, 20)
    endContour()
    fill(212, 145, 189)
    endShape(CLOSE)
}

function x() {
    push()
    noStroke()
    angleMode(DEGREES)
    rectMode(CENTER)
    fill(156, 173, 229)
    translate(60, 60)
    push()
    rotate(45)
    rect(0, 0, 150, 20)
    pop()
    push()
    rotate(-45)
    rect(0, 0, 150, 20)
    pop()
    pop()
}

function draw() {
    background(0)
    pssquare()
    //translate(50, 50);
    // x()
    ngon(40, 60, 60, 60)
    // cross.render()
}
