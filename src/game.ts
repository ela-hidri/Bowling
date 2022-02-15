type frame = {
    leftBox: any;
    rightBox: any;
    lastFrameBox: any;
    totalScore: any;
}

export class Game {
    score: frame[] = [];
    throwNumber: number = 0;
    pins: number[] = [];
    public pinRest: number = 11;
    totalScore: any = '';
    gameEnded: boolean = false;

    constructor() {
    }

    setFrame = (roll: any) => {
        this.pins[this.throwNumber++] = roll;
        this.score = this.affectScore();
    };
    initialise_game = () => {
        this.score = [];
        this.pins = [];
        this.throwNumber = 0;
        this.pinRest = 11;
        this.gameEnded = false;
    };

    affectScore = () => {
        let curentRoll = 0;
        let FrameData: frame[] = [];
        FrameData = [];
        let Score: any = 0;
        this.pinRest = 11;
        const frstBall = () => {
            return (this.pins[curentRoll])
        };
        const sndBall = () => {
            return this.pins[curentRoll + 1];
        };
        const thrdBall = () => {
            return this.pins[curentRoll + 2];
        };
        const pinLeft = () => {

            if (!isNaN(frstBall()) && isNaN(sndBall())) {
                this.pinRest = 11 - frstBall();
            }

        };


        const sumTwoRoll = (): number => {
            return (frstBall() + sndBall())
        };
        const spareScore = (): number => {
            return (10 + thrdBall());
        };
        const strikeScore = () => {
            return (10 + sndBall() + thrdBall())
        };
        const isStrike = () => {
            return frstBall() == 10
        };
        const isSpare = () => {
            return (frstBall() + sndBall()) == 10
        };
        const StoreData = (frameData: frame[] , leftBox: any , rightBox: any , lastBox: any , score: any) => {
            if (frameData.length < 9) {
                FrameData.push({
                    leftBox : leftBox ,
                    rightBox : rightBox ,
                    lastFrameBox : lastBox ,
                    totalScore : score
                });
            } else {
                let LastBoxLeft = frstBall() == 10 ? 'X' : frstBall();
                let lastBoxRight = sndBall() == 10 ? 'X' : sumTwoRoll() === 10 && !isStrike() ? '/' : sndBall();
                let lastBoxExtra: any;
                if (sndBall() + thrdBall() === 10 && frstBall() == 10) {
                    lastBoxExtra = thrdBall() == 10 ? 'X' : '/';
                } else {
                    lastBoxExtra = thrdBall() == 10 ? 'X' : sumTwoRoll() != 10 && frstBall() != 10 ? '' : thrdBall();
                }
                if (
                    (isStrike() && sndBall() != undefined && sndBall() != 10 && thrdBall() == undefined)) {
                    this.pinRest = 11 - sndBall();
                }

                FrameData.push({
                    leftBox : LastBoxLeft ,
                    rightBox : lastBoxRight ,
                    lastFrameBox : lastBoxExtra ,
                    totalScore : score
                });
                if (((isStrike() || isSpare()) && lastBoxExtra != undefined) || (lastBoxRight != undefined && !(isStrike() || isSpare()))) {
                    this.gameEnded = true;
                }
            }
        };
        for (let i = 0; i <= 9; i++) {
            if (isStrike()) {
                isNaN(strikeScore()) ? Score = '' : Score += strikeScore();
                StoreData(FrameData , '' , 'X' , '' , Score);
                curentRoll++;
            } else if (isSpare()) {
                isNaN(spareScore()) ? Score = '' : Score += spareScore();
                StoreData(FrameData , frstBall() , '/' , '' , Score);
                curentRoll += 2;
            } else {
                pinLeft();

                isNaN(sumTwoRoll()) ? Score = '' : Score += sumTwoRoll();

                StoreData(FrameData , frstBall() , sndBall() , '' , Score);
                curentRoll += 2;
            }
            if (!isNaN(Score)) {
                this.totalScore = Score;
            }

        }

        return FrameData;
    }


}
