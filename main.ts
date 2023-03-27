function finns_plats_under () {
    for (let pixel of block) {
        if (y_av(pixel) == 4) {
            return false
        }
        if (är_tänd(pixel + 5)) {
            return false
        }
    }
    return true
}
function ta_bort_rad (y: number) {
    for (let index = 0; index < 5; index++) {
        basic.pause(100)
        for (let x = 0; x <= 4; x++) {
            led.toggle(x, y)
        }
    }
    while (y >= 0) {
        for (let x = 0; x <= 4; x++) {
            if (led.point(x, y - 1)) {
                led.plot(x, y)
            } else {
                led.unplot(x, y)
            }
        }
        y += -1
    }
}
function x_av (pixel: number) {
    return pixel % 5
}
function ta_bort_rader () {
    y = 4
    while (y >= 0) {
        if (är_rad_full(y)) {
            game.setScore(game.score() + 1)
            ta_bort_rad(y)
        } else {
            y += -1
        }
    }
}
function är_rad_full (y: number) {
    for (let x = 0; x <= 4; x++) {
        if (!(led.point(x, y))) {
            return false
        }
    }
    return true
}
function ändra_värden_i_block (värde: number) {
    for (let index = 0; index < block.length; index++) {
        block.push(block.shift() + värde)
    }
}
input.onButtonPressed(Button.A, function () {
    sudda_block()
    if (finns_plats_vänster()) {
        ändra_värden_i_block(-1)
    }
    rita_block()
})
function block_över_kanten () {
    for (let pixel of block) {
        if (pixel < 0) {
            return true
        }
    }
    return false
}
function rita_block () {
    for (let pixel of block) {
        led.plot(x_av(pixel), y_av(pixel))
    }
}
function finns_plats_höger () {
    for (let pixel of block) {
        if (x_av(pixel) == 4) {
            return false
        }
        if (är_tänd(pixel + 1)) {
            return false
        }
    }
    return true
}
function är_tänd (pixel: number) {
    return led.point(x_av(pixel), y_av(pixel))
}
function skapa_block () {
    while (block.length == 0) {
        for (let pixel of [
        -9,
        -8,
        -4,
        -3
        ]) {
            if (Math.randomBoolean()) {
                block.push(pixel)
            }
        }
    }
}
function finns_plats_vänster () {
    for (let pixel of block) {
        if (x_av(pixel) == 0) {
            return false
        }
        if (är_tänd(pixel - 1)) {
            return false
        }
    }
    return true
}
input.onButtonPressed(Button.B, function () {
    sudda_block()
    if (finns_plats_höger()) {
        ändra_värden_i_block(1)
    }
    rita_block()
})
function y_av (pixel: number) {
    return Math.floor(pixel / 5)
}
function sudda_block () {
    for (let pixel of block) {
        led.unplot(x_av(pixel), y_av(pixel))
    }
}
function rensa_block () {
    while (block.length > 0) {
        block.pop()
    }
}
let y = 0
let block: number[] = []
block = []
while (true) {
    skapa_block()
    while (finns_plats_under()) {
        ändra_värden_i_block(5)
        rita_block()
        basic.pause(600)
        sudda_block()
    }
    rita_block()
    if (block_över_kanten()) {
        game.gameOver()
    }
    rensa_block()
    ta_bort_rader()
}
