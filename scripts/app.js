let config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let character, item, cursors, txtScore, score;
let bgMusic, sfxSound;

function preload() {
    // Load images
    this.load.image("character", "assets/img/pusheen_cat.png");
    this.load.image("item", "assets/img/cooked_fish.png");
    this.load.image("background", "assets/img/room_bg.png");

    // Load sounds
    this.load.audio("bgMusic", "assets/sfx/Cute Circus.mp3");
    this.load.audio("sfxSound", "assets/sfx/Meow Sound Effect.mp3");
}

function create() {
    // Add background image
    this.add.image(0, 0, "background").setOrigin(0, 0);

    // Add character sprite
    character = this.physics.add.sprite(0, 400, "character"); 
    character.setBounce(0);
    character.setCollideWorldBounds(true);
    character.setScale(0.25);

    // Add item sprite
    item = this.physics.add.sprite(550, 425, "item"); 
    item.setScale(0.35);

    // Add score
    score = 0;
    let style = { font: "bold 25px Tahoma", fill: "#000000" };
    txtScore = this.add.text(25, 25, "Score: " + score.toString(), style);

    // Set up keyboard controls
    cursors = this.input.keyboard.createCursorKeys();

    // Play background music
    bgMusic = this.sound.add("bgMusic", {loop: true});
    bgMusic.play();
}

function update() {
    // Character movement (left & right)
    if (cursors.left.isDown) {
        character.x -= 5;
        character.flipX = true;
    } else if (cursors.right.isDown) {
        character.x += 5;
        character.flipX = false;
    }

    // Overlapping assets
    this.physics.overlap(character, item, goal, null, this);
}

function goal(character, item) {
    score += 100;
    txtScore.setText("Score: " + score);
    item.disableBody(true, true);
    
    sfxSound = this.sound.add("sfxSound");
    sfxSound.play();

    alert("Congratulations! You fed the kitten! :3");
}