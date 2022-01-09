kaboom()
focus()

loadSprite("space-invader", "/sprites/space-invader.png");
loadSprite("wall", "/sprites/wall.png");
loadSprite("space-ship", "/sprites/space-ship.png");

const MOVE_SPEED = 200; // for player movement
const player = add([
    sprite("space-ship"),
    pos(width() / 2.6, height() / 1.1),
    origin("center"),
    area()
]);

layer(["obj", "ui"], "obj"); // for score

addLevel(
    ['!^^^^^^^^^^     &',
    '!^^^^^^^^^^     &',
    '!^^^^^^^^^^     &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
    '!               &',
], {
    width: 16,
    height: 16,
    "^" : () => [
        sprite("space-invader"), 
        "space-invader",
        scale(0.9),
        area(),
        solid()
    ],
    "!" : () => [
        sprite("wall"), 
        "left-wall",
        area(),
        solid()
    ],
    "&" : () => [
        sprite("wall"),
         "right-wall",
        area(),
        solid()
    ],
});

keyDown("right", () => {
    player.move(MOVE_SPEED, 0)
});

keyDown("left", () => {
    player.move(-MOVE_SPEED, 0)
});

const score = add([
    text("0"),
    pos(50, 50),
    layer("ui"), 
    scale(0.2), {
        value: 0
    }
]);

const INVADER_SPEED = 50;
let CURRENT_SPEED = INVADER_SPEED; // let zato sto ce se menjati brzina
const LEVEL_DOWN = 100;

action("space-invader", (s) => {
    s.move(CURRENT_SPEED, 0)
});

collides("space-invader", "right-wall", () => {
    CURRENT_SPEED = -INVADER_SPEED
    every("space-invader", (s) => {
        s.move(0, LEVEL_DOWN)
    })
});

collides("space-invader", "left-wall", () => {
    CURRENT_SPEED = INVADER_SPEED
    every("space-invader", (s) => {
        s.move(0, LEVEL_DOWN)
    })
});

player.onCollide("space-invader", () => {
    go("lose", { score: score.value })
});
