const React = require('react');
const ReactDOM = require('react-dom');
const buildTree = require('./Tree.js');
const questions = require('./questions.js');

const images = {
  sky: 'assets/title-screen-background.png',
  tanya: 'assets/tanya-frontend.png', 
  roySales: 'assets/roy-sales.png',
  designer01: 'assets/designer-01.png',
  designer02: 'assets/designer-02.png',
  backenddev01: 'assets/backend-dev-01.png',
  rapper02: 'assets/rapper-02.png',
  rapper03: 'assets/rapper-03.png',
  defeatDefault: 'assets/defeat-default.png',
  victory: 'assets/victory-01.png',
  assistant: 'assets/assistant.png',
  productManager: 'assets/product-manager.png'
}

const months = {
  0: 'September',
  1: 'October',
  2: 'November',
  3: 'December',
  4: 'January',
  5: 'February',
  6: 'March',
  7: 'April',
  8: 'May',
}

const blankSlate = {
  gpa: 250,
  happiness: 50,


  initialized: false,
  decisionSet: buildTree(questions),
  questionsPerMonth:  0,
  questionsSoFar: 0,
  currentMonthIndex: 0,
  finished: false,
  value: 0,

  currentCharacter: null,
  question: null,
  choice1: null,
  choice2: null,
  index: 0,
  obj: null,
  reply: null,
  win: false,
  immediate: -1
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankSlate
  }

  componentDidMount() {
    this.setState({
      questionsPerMonth: 4
    });
  }

  restart() {
    this.setState(blankSlate);
    let decisionSet = buildTree(questions);
    this.setState({
      questionsPerMonth: 4,
      decisionSet: decisionSet
    });
  }

  setGPA(value) {
    if ((this.state.gpa + value) > 400) {
      return 400;
    } else {
      return this.state.gpa + value;
    }
  }

  setHappiness(value) {
    if ((this.state.happiness + value) > 100) {
      return 100;
    }else {
      return this.state.happiness + value;
    }
  }

  choiceHandler(e) {
    let response = e.target.value;
    let decisionSet = this.state.decisionSet;
    let index = this.state.index;

    if (response === this.state.choice1) {
      decisionSet[index] = this.state.obj.left;
    } else if (response === this.state.choice2) {
      decisionSet[index] = this.state.obj.right;
    }

    this.setState({
      decisionSet: decisionSet
    });

    let gpa = this.setGPA(this.state.decisionSet[this.state.index].val[0]);
    let happiness =  this.setHappiness(this.state.decisionSet[this.state.index].val[1]);
    let consequence = this.state.decisionSet[this.state.index].consequence || this.state.consequence;

    if (gpa < 0 || happiness < 0) {
      this.setState({
        choice1: null,
        choice2: null,
        question: null, 
        currentCharacter: images['defeatDefault'],
        finished: true,
        gpa: 0,
        happiness: 0,
        consequence: consequence
      });
    } else {
      this.setState({
        gpa: gpa,
        happiness: happiness,
        consequence: consequence,
      });

      if (this.state.decisionSet[this.state.index].prompt === undefined) {
        decisionSet = this.state.decisionSet;
        decisionSet.splice(this.state.index, 1);
        this.setState({
          decisionSet: decisionSet
        });
      }

      let questionsSoFar = this.state.questionsSoFar + 1;

      if (this.state.currentMonthIndex + 1 > 8 || !decisionSet.length) {
        let win = gpa > 300 ? true : false;
        let character = gpa > 300 ? images['victory'] : images['defeatDefault'];
        this.setState({
          choice1: null,
          choice2: null,
          finished: true,
          win: win,
          question: null,
          currentCharacter: character,
          consequence: "You failed to achieve at least a 3.0 GPA during the school year"
        });
      } else {
        this.setState({
          questionsSoFar: questionsSoFar
        });

        if (questionsSoFar === this.state.questionsPerMonth) {
          this.setState({
            currentMonthIndex: this.state.currentMonthIndex + 1,
            questionsSoFar: 0
          })
        }

        this.initializeHandler();

      }
    }
  }


  initializeHandler(e) {
    var context = this;
    let index = this.state.initialized ? Math.floor(Math.random() * context.state.decisionSet.length ) : 0;

    if (this.state.immediate !== -1) {
      console.log('in here');
      index = this.state.index;
    }

    if (!this.state.initialized) {
      this.setState({
        index: index,
        initialized: true
      });
    } else {
      this.setState({
        index: index
      });
    }
    let obj = this.state.decisionSet[index];
    console.log(obj);
    let choice1 = obj.left ? obj.left.reply : null;
    let choice2 = obj.right ? obj.right.reply : null;
    let immediate = obj.immediate ? index : -1;

    if (obj.immediate) {
      console.log(obj, 'in object immediate');
    }

    this.setState({
      obj: obj,
      question: obj.prompt,
      reply: obj.reply,
      choice1: choice1,
      choice2: choice2,
      currentCharacter: images[obj.img],
      immediate: immediate
    });
  }
  

  render() {
    let question = this.state.question ? <div> {this.state.question} </div> : null;
    let choice1 = this.state.choice1 ? <div><button onClick={this.choiceHandler.bind(this)} value={this.state.choice1}>{this.state.choice1}</button></div> : null;
    let choice2 = this.state.choice2 ? <div><button onClick={this.choiceHandler.bind(this)} value={this.state.choice2}>{this.state.choice2}</button></div> : null;
    let currentCharacter = this.state.currentCharacter ? <div><img className="current-character" src={this.state.currentCharacter}></img></div> : null;
    let finished = this.state.finished ? <div><button onClick={this.restart.bind(this)}> Restart</button></div> : null;
    let consequence = this.state.consequence && this.state.finished && !this.state.win ? <div> {this.state.consequence} </div> : null;
    let win = this.state.finished && this.state.win ? <div> You Won! </div> : null;
    let startButton = !this.state.initialized ? <div><button onClick = {this.initializeHandler.bind(this)}> Start Game </button></div> : null;
    let startImage = !this.state.initialized ? <div><img className="current-character" src={images['victory']}></img><p>UBC Simulator</p></div> : null;
    let startText = !this.state.initialized ? <div> You're goal is to get through the year with at least a 3.0 GPA and still have friends at the end of it! <br/> </div> : null;

    return (
      <div>
      <div className="header">
        <div className="title"> UBC Simulator </div>
        <div className="subtitle"> powered by Slacknotes </div>
      </div>
        <div className="container">
          <div className="align-items">
              <div className="scores"><span className="score1">GPA: {Math.round(this.state.gpa * 100) / 10000}</span><span className="score2"> # Of Friends: {this.state.happiness}</span> <br/><div>Month: {months[this.state.currentMonthIndex]}</div></div>
              <div className="inner-container">
              {startImage}
              {currentCharacter}
              {startText}
              {question}
              {consequence}
              {win}
              </div>
              <div className="bottom">
                {startButton}
                {choice1}
                {choice2}
                {finished}
              </div>
            </div>
        </div>
      </div>
      );
    }
  }



  ReactDOM.render(<App />, document.getElementById('app'))
