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
  defeatDefault: 'assets/defeat-default.png',
  victory: 'assets/victory-01.png'
}

var blankSlate = {
  gpa: 250,
  happiness: 50,


  initialized: false,
  decisionSet: buildTree(questions),
  questionsPerMonth:  0,
  questionsSoFar: 0,
  currentMonthIndex: 0,
  finished: false,

  currentCharacter: null,
  question: null,
  choice1: null,
  choice2: null,
  index: 0,
  obj: null,
  reply: null,
  win: false
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = blankSlate
  }

  componentDidMount() {
    this.setState({
      questionsPerMonth: Math.floor(Object.keys(this.state.decisionSet).length / 9)
    });
  }

  restart() {
    this.setState(blankSlate);
    this.setState({
      questionsPerMonth: Math.floor(Object.keys(this.state.decisionSet).length / 9),
      decisionSet: buildTree(questions)
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
      console.log('IN HERE');
      this.setState({
        gpa: gpa,
        happiness: happiness,
        consequence: consequence
      });

      if (this.state.decisionSet[this.state.index].prompt === undefined) {
        decisionSet = this.state.decisionSet;
        decisionSet.splice(this.state.index, 1);
        this.setState({
          decisionSet: decisionSet
        });
      }

      this.setState({
        questionsSoFar: this.state.questionsSoFar + 1,
      });

      if (this.state.questionsSoFar > this.state.questionsPerMonth) {
        this.setState({
          currentMonthIndex: this.state.currentMonthIndex + 1,
          questionsSoFar: 0
        })
      }

      this.initializeHandler();
    }
  }


  initializeHandler(e) {
    var context = this;
    let index = this.state.initialized ? Math.floor(Math.random() * context.state.decisionSet.length ) : 0;
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

    if (!this.state.decisionSet.length) {
      this.setState({
        choice1: null,
        choice2: null,
        finished: true,
        win: true,
        question: null,
        character: images['victory']
      });
    } else {
      let obj = this.state.decisionSet[index];
      let choice1 = obj.left ? obj.left.reply : null;
      let choice2 = obj.right ? obj.right.reply : null;

      this.setState({
        obj: obj,
        question: obj.prompt,
        reply: obj.reply,
        choice1: choice1,
        choice2: choice2,
        currentCharacter: images[obj.img]
      });
    }
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

    let startText = !this.state.initialized ? <div> You're goal is to get through the year with a 4.0 GPA and still have friends at the end of it! <br/> </div> : null;

    return (
      <div>
        <div className="container">
          <div className="align-items">
            <div className="scores">GPA: {this.state.gpa} Social Life: {this.state.happiness}</div>
            {startText}
            {startButton}
            {question}
            {currentCharacter}
            {choice1}
            {choice2}
            {consequence}
            {win}
            {finished}
          </div>
        </div>
      </div>
      );
    }
  }



  ReactDOM.render(<App />, document.getElementById('app'))
