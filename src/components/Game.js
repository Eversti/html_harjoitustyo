import React, { Component } from 'react'
import Board from './Board';

export default class Game extends Component {
    constructor(props){
        super(props);
        this.state = {
            gamemode: "Yksinpeli",
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }
    enemy(){
        setTimeout(() => {
            const history = this.state.history.slice(0, this.state.stepNumber+1);
            const current = history[history.length-1];
            const squares = current.squares.slice();
    
            var r = Math.floor(Math.random() * 8);
            while(squares[r]){
                console.log(r);
                r = Math.floor(Math.random() * 8);
            }
    
            squares[r] = 'O';
            this.setState({
                history: history.concat({
                    squares: squares
                }),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length
            });  
        }, 500);

    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber+1);
        const current = history[history.length-1];
        const squares = current.squares.slice();

        const winner = calculateWinner(squares);
        if(winner || squares[i]){
            return;
        }
            if(this.state.gamemode === "Yksinpeli" && this.state.xIsNext){
                squares[i] = 'X';
                this.setState({
                    history: history.concat({
                        squares: squares
                    }),
                    xIsNext: !this.state.xIsNext,
                    stepNumber: history.length
                });
                const winner = calculateWinner(squares);
                if(winner){
                    return;
                }
                this.enemy(); 
            }
            if(this.state.gamemode === "Kaksinpeli"){
                squares[i] = this.state.xIsNext ? 'X' : 'O';
                this.setState({
                    history: history.concat({
                        squares: squares
                    }),
                    xIsNext: !this.state.xIsNext,
                    stepNumber: history.length
                });
            }
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const startOver = () => {
            this.setState({
                stepNumber: 0,
                xIsNext: true,
            });
        }

        const changeGamemode = () => {
            if(this.state.gamemode === "Yksinpeli"){
                this.setState({
                    gamemode: "Kaksinpeli",
                });
            }else{
                this.setState({
                    gamemode: "Yksinpeli",
                });
            }
            startOver();
        }
        
        let status;
        if(winner){
            status = "Voittaja on " + winner;
        } else if(this.state.stepNumber === 9){
            status = "Tasapeli";
        } else {
            status = 'Seuraava pelaaja on ' + (this.state.xIsNext ? 'X' : 'O');
        }


        return (
            <div class="game">
                <img class="gaming" src={'./gaming.png'}></img>
                <img class="epic" src={'./epic.png'}></img>
                <audio controls>
                    <source src="cum.mp3" type="audio/mpeg"/>
                </audio>
                <div class="game-board">
                <div>
                    <div class="menu">

                        <form className="valikko" ref = {(input)=> this.menu = input}>
                        <label>{"Valitse pelimuoto: "}</label>
                        <select onChange={changeGamemode}>
                        <option value="Yksinpeli">Yksinpeli</option>
                        <option value="Kaksinpeli">Kaksinpeli</option>
                        </select>
                        </form>
                    </div>
                    <div class="game-info">
                        <button onClick={startOver}>Aloita uusi peli</button>
                        <div>{status}</div>
                    </div>
                    <Board onClick={(i)=>this.handleClick(i)}
                    squares={current.squares} />
                    </div>  
                </div>
            </div>
        )
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let i = 0; i < lines.length; i++){
        const [x, y, z] = lines[i];
        if(squares[x] && squares[x] === squares[y] && squares[y] == squares[z])
            return squares[x];
    }

    return null;
}