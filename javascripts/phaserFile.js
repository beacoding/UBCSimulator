var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'gameArea', { preload: preload, create: create, update: update });

// Phaser.ScaleManager.EXACT_FIT = 1;
Phaser.ScaleManager.EXACT_FIT = 1;

// //this.scale.pageAlignHorizontally = true;
// this.scale.pageAlignVertically = true;
// this.scale.setScreenSize( true );


WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.QUARTER, addText, this); },

    google: {
      families: ['VT323']
    }

};

function preload() {
  game.load.image('sky', 'assets/title-screen-background.png');
  game.load.image('tanya', 'assets/tanya-frontend.png');
  game.load.image('roy-sales', 'assets/roy-sales.png');
  game.load.image('designer-01', 'assets/designer-01.png');
  game.load.image('designer-02', 'assets/designer-02.png');
  game.load.image('backend-dev-01', 'assets/backend-dev-01.png');
  game.load.image('rapper-02', 'assets/rapper-02.png');
  game.load.image('defeat-default', 'assets/defeat-default.png');

  game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
}



var choiceOneText;
var choiceTwoText;
var questionText;
var choice1;
var choice2;
var happinessText;
var gpaText;
var finishedText;
var monthText;
var restartText;
var initializeText;

var gpa;
var happiness;

var initialized;
var decisionSet;
var questionsPerMonth;
var questionsSoFar;
var currentMonthIndex;

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

var styles = {
  fontSize: '32px', 
  fill: "#000",
  font: 'VT323'
}

function create() {
  //initialize sky
  game.stage.backgroundColor = "#60D6FF";
  sky = game.add.sprite(0, game.world.height - 700, 'sky');
  sky.width = game.width;
  container = Phaser.Rectangle(game.world.centerX, game.world.centerY, 100, 300);

  gpa = 0;
  happiness = 50;

  initialized = false;
  questionsSoFar = 0;
  currentMonthIndex = 0;

  decisionSet = buildTree(questions);
  questionsPerMonth = Math.floor(Object.keys(decisionSet).length / 9);


  //initialize current character
  currentCharacter = game.add.sprite(game.world.centerX, game.world.centerY - 200, 'tanya');
  currentCharacter.anchor.setTo(0.5);
  currentCharacter.scale.setTo(0.5)
}

function addText() {
  //initialize gpaScore and happiness score
  gpaText = createText('GPA: 0', 16,16);
  happinessText = createText('Happiness: 0', 350, 16);
  monthText = createText('Month: ' + months[currentMonthIndex], 600, 16);

  //initialize question text
  initializeText = game.add.text(game.world.centerX,game.world.centerY - 400, "Start game", styles);
  questionText = game.add.text(game.world.centerX,game.world.centerY - 400, "", styles);



  //initialize choices text
  choiceOneText = createText("", game.world.centerX, game.world.centerY);
  choiceTwoText = createText("", game.world.centerX, game.world.centerY + 50);

  finishedText = createText("", game.world.centerX, game.world.centerY);
  restartText = createText("", game.world.centerX, game.world.centerY + 50);



  //set handlers
  choiceOneText.inputEnabled = true;
  choiceTwoText.inputEnabled = true;
  restartText.inputEnabled = true;
  initializeText.inputEnabled = true;
  initializeText.events.onInputDown.add(listener, this);
  choiceOneText.events.onInputDown.add(submitText, this);
  choiceTwoText.events.onInputDown.add(submitText, this);
  restartText.events.onInputDown.add(restart, this);

  //set anchors
  restartText.anchor.setTo(0.5);
  choiceTwoText.anchor.setTo(0.5);
  choiceOneText.anchor.setTo(0.5);
  finishedText.anchor.setTo(0.5);
  questionText.anchor.setTo(0.5);
  initializeText.anchor.setTo(0.5);
}

function createText(text, xshift, yshift) {
  return game.add.text(xshift, yshift, text, styles);
}

function update() {

}

function restart() {
  game.state.restart();
}

function submitText(e) {
  var response = e._text;

  if (response === choice1) {
    decisionSet[index] = obj.left;
  } else if (response === choice2) {
    decisionSet[index] = obj.right;
  }

  gpa = setGPA(decisionSet[index].val[0]);
  happiness =  setHappiness(decisionSet[index].val[1]);
  gpaText = gpaText.setText('GPA: ' + gpa);
  happinessText = happinessText.setText('Happiness: ' + happiness);

  reason = decisionSet[index].consequence

  if (gpa < 0 || happiness < 0) {
    choiceOneText.visible = false;
    choiceTwoText.visible = false;
    questionText.visible = false;
    currentCharacter.loadTexture('defeat-default');
    finishedText.setText(reason);
    restartText.setText('Restart');
    gpaText = gpaText.setText('GPA: 0');
    happinessText = happinessText.setText('Happiness: 0');
    return;
  }

  if (decisionSet[index].prompt === undefined) {
    decisionSet.splice(index, 1);
  }
  
  questionsSoFar++;
  if (questionsSoFar > questionsPerMonth) {
    currentMonthIndex++;
    monthText.setText(months[currentMonthIndex]);
    questionsSoFar = 0;
  }

  listener();
}

function setGPA(value) {
  if ((gpa + value) > 400) {
    return 400;
  } else {
    return gpa + value;
  }
}

function setHappiness(value) {
  if ((happiness + value) > 100) {
    return 100;
  }else {
    return happiness + value;
  }
}

function listener () {
  if (!initialized) {
    index = 0;
    initialized = true;
    initializeText.visible = false;
  } else {
    index =  Math.floor(Math.random() * decisionSet.length);               
  }

  if (!decisionSet.length) {
    choiceOneText.visible = false;
    choiceTwoText.visible = false;
    questionText.visible = false;
    finishedText.setText('Game finished');
    restartText.setText('Restart');
    return;
  } else {

    obj = decisionSet[index];
    question = obj.prompt;
    reply = obj.reply;
    choice1 = obj.left ? obj.left.reply : "";
    choice2 = obj.right ? obj.right.reply : "";

    currentCharacter.loadTexture(obj.img);


    questionText = questionText.setText(question);
    choiceOneText = choiceOneText.setText(choice1);
    choiceTwoText = choiceTwoText.setText(choice2);
  }
}