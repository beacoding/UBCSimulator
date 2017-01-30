var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'gameArea', { preload: preload, create: create, update: update });

Phaser.ScaleManager.EXACT_FIT = 1;

function preload() {
  game.load.image('sky', 'assets/title-screen-background.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.image('tanya', 'assets/tanya-frontend.png');

}

var choiceOneText;
var choiceTwoText;
var questionText;
var choice1;
var choice2;
var happinessText;
var gpaText;
var loseText;
var monthText;

var gpa = 0;
var happiness = 50;

var initialized = false;
var decisionSet = buildTree(questions);
var questionsPerMonth = Math.floor(Object.keys(decisionSet).length / 9);
var questionsSoFar = 0;
var currentMonthIndex = 0;

var currentCharacter;
var question;
var index;
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
  //initialize sky
  game.stage.backgroundColor = "#60D6FF";
  sky = game.add.sprite(0, game.world.height - 700, 'sky');
  sky.width = game.width


  //initialize current character
  currentCharacter = game.add.sprite(game.world.centerX, game.world.centerY - 100, 'tanya');
  currentCharacter.anchor.setTo(0.5);
  currentCharacter.scale.setTo(0.5)

  //initialize gpaScore and happiness score
  gpaText = game.add.text(16, 16, 'GPA: 0', { fontSize: '32px', fill: '#000' });
  happinessText = game.add.text(350, 16, 'Happiness: 0', { fontSize: '32px', fill: '#000' });
  monthText = game.add.text(600, 16, 'Month: ' + months[currentMonthIndex], {fontSize: '32px', fill: '#000'});

  //initialize question text
  questionText = game.add.text(game.world.centerX,game.world.centerY - 400, "Start game", {fontSize: '32px', fill: "#000"});
  questionText.inputEnabled = true;
  questionText.events.onInputDown.add(listener, this);

  //initialize choices text
  choiceOneText = game.add.text(game.world.centerX,game.world.centerY + 75, "", {fontSize: '32px', fill: "#000"});
  choiceTwoText = game.add.text(game.world.centerX,game.world.centerY + 125, "", {fontSize: '32px', fill: "#000"});

  loseText = game.add.text(game.world.centerX,game.world.centerY + 125, "", {fontSize: '32px', fill: "#000"});
}

function update() {
  choiceOneText.inputEnabled = true;
  choiceOneText.events.onInputDown.add(submitText, this);
  choiceTwoText.inputEnabled = true;
  choiceTwoText.events.onInputDown.add(submitText, this); 
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
    choiceOneText.visible = false;
    choiceTwoText.visible = false;
    questionText.visible = false;
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
  if (!initialized) {
    index = 0;
    initialized = true;
  } else {
    index =  Math.floor(Math.random() * decisionSet.length);               
  }

  obj = decisionSet[index];
  question = obj.prompt;
  reply = obj.reply;
  choice1 = obj.left ? obj.left.reply : null;
  choice2 = obj.right ? obj.right.reply : null;

  questionText = questionText.setText(question);
  choiceOneText = choiceOneText.setText(choice1);
  choiceTwoText = choiceTwoText.setText(choice2);
}