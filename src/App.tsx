import React from 'react';
import './App.css';
import {Game} from "./game";

type IProps = {}
type IState = {
    Score: frame[]
}
type frame = {
    leftBox: any;
    rightBox: any;
    lastFrameBox: any;
    totalScore: any;
}

const game = new Game();

function App() {
    return (
        <ScoreBoard/>

    )

}

const Starter = () => {
    // const [starter ,setStarter]=React.useState<any[]>([]);
    const [show , toggleShow] = React.useState(true);
    return (
        <div className={show ? 'StarterContainer' : 'StarterContainer hideStarter'}>
            <div className={show ? 'imageContainer' : 'imageContainer slideimg'}/>
            <div className={show ? 'introContainer' : 'introContainer closeIntro'}>
                <div className='bowlingBall'/>
                <h1 className='title'><span>Bo</span>wling <br/><span>Score bord</span></h1>
                <p className='introduction'>Welcome to the Bowling Scoreboard, where you can keep track of your pins and
                    calculate your score immediately.<br/> To get started, click Calculate Score.</p>
                <button onClick={() => toggleShow(!show)}>Calculate score</button>
            </div>
        </div>
    );
};

const Frame = ({framenbr , leftbox , rightbox , lastbox , score}: any) => {

    return (<div className='frame'>
            <div className='frame_title'>Frame {framenbr} </div>
            <div className='dataBox'>
                <div className='inputbox'>
                    <div className='box left'> {leftbox}</div>
                    <div className='box right'> {rightbox}</div>
                    {framenbr == 10 && <div className='box last'>{lastbox}</div>}
                </div>
                <div className='box score'>{score}</div>
            </div>
        </div>
    );
};
const TotalScoreFrame = ({totalScore}: any) => {

    return (<div className='frame'>
            <div className='frame_title'> Total Score</div>
            <div className='box score'>{totalScore}</div>
        </div>

    );
};
const Rolls = ({rollValue , handleRolls}: any) => {
    return (<button onClick={() => handleRolls}>{rollValue}</button>)

};
const Header = () => {
    return (
        <div className='headerContainer'>
            <div className='bowlingBall'/>
            <h1 className='headerTitle '><span>Bo</span>wling <span>Score bord</span></h1>
        </div>
    )
};

export class ScoreBoard extends React.Component<IProps , IState> {
    constructor(props: IProps) {

        super(props);
        this.state = {
            Score : game.score ,

        };

    }

    handleRolls(roll: any) {

        game.setFrame(roll);
        this.setState({Score : game.score});

    }

    reset = () => {
        game.initialise_game();
        this.setState({Score : game.score});

    };

    render() {

        return (
            <div>

                <Starter/>

                <div className='container'>

                    <Header/>

                    <div className="RollsContainer">
                        <div className='rolls'>
                            {[...Array(game.pinRest)].map((e , i) =>
                                <button key={i} onClick={() => this.handleRolls(i)}>{i}</button>
                            )
                            }</div>
                        <div className='ResetButton'>
                            {this.state.Score.length != 0 && <button onClick={() => this.reset()}>Reset Game</button>}
                        </div>
                    </div>
                    <div className="frameContainer">
                        {[...Array(10)].map((e , i) =>
                            <Frame
                                framenbr={i + 1}
                                leftbox={this.state.Score[i]?.leftBox}
                                rightbox={this.state.Score[i]?.rightBox}
                                lastbox={this.state.Score[i]?.lastFrameBox}
                                score={this.state.Score[i]?.totalScore}
                                key={i}/>)
                        }
                        <TotalScoreFrame totalScore={game.totalScore}/>

                    </div>

                    <div>
                        {game.gameEnded && <p className='GameOverTitle'>game Over</p>}
                        {game.gameEnded &&
                        <p className='totalScoreTitle'>you scored <span>" {game.totalScore} "</span></p>}

                    </div>


                </div>
            </div>
        );


    }

}

export default App;
