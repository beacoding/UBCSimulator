var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameArea', { preload: preload, create: create, update: update });

Phaser.ScaleManager.EXACT_FIT = 1;

function preload() {
    game.load.image('sky', 'assets/title-screen-background.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.image('tanya', 'assets/tanya-frontend.png');

}

var player;
var question;
var text1;
var text2;
var choice1;
var choice2;
var textQuestion;
var loseText;
var fulfilled = false;
var index;
var stars;
var gpa = 0;
var gpaText;
var gpa = 0;
var happiness = 0.5;
var happinessText;
var target;
var decisionSet = buildTree(questions);
var initialized = false;
var questionsPerMonth = Math.floor(Object.keys(decisionSet).length / 9);
var questionsSoFar = 0;
var currentMonthIndex = 0;
var obj;
var question;
var reply;
var months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October'
}

function create() {
    game.stage.backgroundColor = "#60D6FF";

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    sky = game.add.sprite(0, game.world.height - 700, 'sky');
    sky.width = game.width


    // The player and its settings
    player = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'tanya');
    player.anchor.setTo(0.5);
    player.scale.setTo(0.5)

    textQuestion = game.add.text(game.world.centerX,game.world.centerY - 400, "Start game", {fontSize: '32px', fill: "#000"});
    textQuestion.inputEnabled = true;
    textQuestion.events.onInputDown.add(listener, this);
    gpaText = game.add.text(16, 16, 'GPA: 0', { fontSize: '32px', fill: '#000' });
    happinessText = game.add.text(150, 16, 'Happiness: 0', { fontSize: '32px', fill: '#000' });

    text1 = game.add.text(game.world.centerX,game.world.centerY + 75, "", {fontSize: '32px', fill: "#000"});
    text2 = game.add.text(game.world.centerX,game.world.centerY + 125, "", {fontSize: '32px', fill: "#000"});
    loseText = game.add.text(game.world.centerX,game.world.centerY + 125, "", {fontSize: '32px', fill: "#000"});


}

function update() {
    text1.inputEnabled = true;
    text1.events.onInputDown.add(submitText, this);
    text2.inputEnabled = true;
    text2.events.onInputDown.add(submitText, this); 
}

function submitText(e) {
    var response = e._text;

    if (response === choice1) {
      decisionSet[index] = obj.left;
    } else if (response === choice2) {
      decisionSet[index] = obj.right;
    }

    gpa += decisionSet[index].val[0];
    happiness += decisionSet[index].val[1];
    gpaText = gpaText.setText('GPA: ' + gpa);
    happinessText = happinessText.setText('Happiness: ' + happiness);

    reason = decisionSet[index].consequence

      if (gpa < 0 || happiness < 0) {
        text1.visible = false;
        text2.visible = false;
        textQuestion.visible = false;
        loseText.setText(reason);
      }

    if (decisionSet[index].prompt === undefined) {
      decisionSet.splice(index, 1);
    }
    
    questionsSoFar++;
    if (questionsSoFar > questionsPerMonth) {
      currentMonthIndex++;
      questionsSoFar = 0;
    }

    listener();
}

function listener () {
    if (!fulfilled) {
        index = 0;
        fulfilled = true;
    } else {
        index =  Math.floor(Math.random() * decisionSet.length);               
    }

    obj = decisionSet[index];
    question = obj.prompt;
    reply = obj.reply;
    choice1 = obj.left ? obj.left.reply : null;
    choice2 = obj.right ? obj.right.reply : null;

    //  The score
    textQuestion = textQuestion.setText(question);
    text1 = text1.setText(choice1);
    text2 = text2.setText(choice2);
}