kaboom({
    scale: 4,
    background: [ 0, 0, 0 ],
});
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
    '!^^^^^^^^^^     &',
    '!^^^^^^^^^^     &',
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

function spawnBullet(p) {
    add([
        rect(3, 6), //creates rectangle
        pos(p),  //player position
        origin("center"),
        color(255, 0, 0),
        "bullet",
        area()
    ])
};

keyPress("space", () => {
    spawnBullet(player.pos.add(0, -12))
});

const BULLET_SPEED = 400;

action("bullet", (b) => {
    b.move(0, -BULLET_SPEED)
    if(b.pos.y < 0) {
        destroy(b)
    }
});

collides("bullet", "space-invader", (b,s) => {
    shake(2)  //shakes the camera when bullet hits the space invader
    destroy(b)
    destroy(s)
    score.value++
    score.text = "Score: " + score.value
})

const score = add([
    text("Score: 0"),
    pos(290, 10),
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

scene("lose", () => {
    add([
        scale(0.2),
        pos(100, 70),
        text("Game Over, " + "Score: " + score.value)
    ])
})

player.onCollide("space-invader", () => {
    go("lose")
});
