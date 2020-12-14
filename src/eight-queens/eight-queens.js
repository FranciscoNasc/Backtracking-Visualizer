import React from 'react';
import ReactDOM from 'react-dom';
import './eight-queens.css';
import './../common.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessQueen } from '@fortawesome/free-solid-svg-icons'
import { faChessBoard } from '@fortawesome/free-solid-svg-icons'
import Solver from './solver.js';


function SquarePredefined(props){
    let cssProperties = "square-chess predefined "+props.color;
    return (
        // <span className={cssProperties}
        // ><FontAwesomeIcon icon={faChessQueen} />
        // </span>

        <button className={cssProperties}
        ><FontAwesomeIcon icon={faChessQueen}/>
        </button>
    )
}

function Square(props){
    let cssProperties = "square-chess "+props.color;
    if(props.hasQueen){
        return (
            <button className={cssProperties}      
                onClick={props.onClick}
            >
                <FontAwesomeIcon icon={faChessQueen}/>
            </button>
        )
    }else{
        return (
            <button className={cssProperties}      
                onClick={props.onClick}
            ></button>
        )
    }
}

function DelayInput(props) {
    return (
        <div className="speed">
            <input 
            type="number"
            value={props.value}
            className="delay-input"
            onChange={e => props.onChange(e.target.value)}
            />
            <span className="description">
                Intervalo entre ações em ms
            </span>
        </div>
    )
}

class EightQueens extends React.Component{
    constructor(props){
        super(props);
        let slv = new Solver();
        let boardTemp = slv.getRandomBoard();
        console.log(boardTemp);
        let markTemp = boardTemp.map(x => x.map( y => y === 0? false: true));//this.getMark(boardTemp);
        console.log("aqui")
        console.log(markTemp);
        this.state = {
            board : boardTemp,
            solver: slv,
            mark: markTemp,
            rows: slv.getRows(boardTemp),
            cols: slv.getCols(boardTemp), 
            steps: [],
            index: 0,
            isAvailable: true,
        }
    }

    getMark(board){
        let arr = Array(8).fill(Array(8));
        console.log(arr);
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(board[i][j] === 1){
                    arr[i][j] = 1;
                }else{
                    arr[i][j] = 0;
                }
            }
        }
        return arr;
    }

    renderSquare(color, i, j,  h){
        return <Square  onClick={ () => this.handleSquareClick(i,j)} hasQueen={h} color={color}></Square>
    }

    renderSquarePredefined(color){
        return <SquarePredefined   color={color}></SquarePredefined>
    }

    handleSquareClick(row, col){
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        let boardTemp = this.state.board;
        if(this.state.mark[row][col]){
            console.log("nnnn");
            return;
        }
        console.log(boardTemp[row][col]);
        if(boardTemp[row][col] !== 1 && (this.state.rows[row] || this.state.cols[col] || this.state.solver.getDiagonals(this.state.board, row, col))){
            console.log("abc");
            return; 
        }
        console.log("agh");
        if(boardTemp[row][col] === 1){
            console.log("aaaaaaaa");
            boardTemp[row][col] = 0;
        }else{
            console.log("abd")
            boardTemp[row][col] = 1;
            // boardtemp
        }
        console.log(row, col);
        // console.log()

        this.setState({board: boardTemp}); // add mark on setState
    }


    colorPick(i){
        let a = Math.floor(i/8);
        if(a % 2 === 0){
            if(i%2 === 0)
                return "white";
            else 
                return "black"
        }
        else{
            if(i%2 === 1)
                return "white";
            else 
                return "black" 
        }
    }

    getBoard(){
        let board = [];
        let row = [];

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                let color = this.colorPick(i*8 + j);
                if(this.state.mark[i][j])
                    row.push(this.renderSquarePredefined(color));
                else if(this.state.board[i][j] === 1){
                    console.log("aqui");
                    row.push(this.renderSquare(color + " filled", i, j, true));
                }else
                    row.push(this.renderSquare(color, i, j, false));
            }
            board.push(<div className="row">{row}</div>);
            row = [];
        }

        return board;
    }

    mark(row, col){
        let boardtemp = this.state.board;
        let rowTemp = this.state.rows;
        let colTemp = this.state.cols;
        rowTemp[row] = true;
        colTemp[col] = true;
        boardtemp[row][col] = 1;
        this.setState({rows: rowTemp, cols: colTemp, board: boardtemp});
    }

    unmark(row, col){
        let boardtemp = this.state.board;
        let rowTemp = this.state.rows;
        let colTemp = this.state.cols;
        rowTemp[row] = false;
        colTemp[col] = false;
        boardtemp[row][col] = 0;
        this.setState({rows: rowTemp, cols: colTemp, board: boardtemp});
    }

    recordStep(row, col, vle){
        if(this.state.steps.length < 100000){
            let temp = this.state.steps;
            temp.push({"row": row, "col":col, "value":vle});
            this.setState({steps: temp});
        }
    }

    solve(row){
        // console.log(row);
        if(row === 8){
            console.log("oia so")
            return true;
        }
        
        if(this.state.rows[row]){
            if(this.solve(row + 1)){
                return true;
            }
            return false;
        }
        
        for(let i = 0; i < 8; i++){
            if(!this.state.solver.getDiagonals(this.state.board, row, i) && !this.state.cols[i]){
                this.mark(row, i);
                this.recordStep(row, i, 1);
                if(this.solve(row + 1))
                    return true;
                this.unmark(row, i);
                this.recordStep(row, i, 0);
            }
        }

        return false;
    }

    displaySolution(){
        let ind = this.state.index;
        if(ind === this.state.steps.length){
            clearInterval(this.state.interval);
            this.setState({isAvailable: true});
            return;
        }

        let boardtemp = this.state.board;
        let x = this.state.steps[ind];
        boardtemp[x.row][x.col] = x.value;
        this.setState({board: boardtemp, index: ind + 1});
    }


    resetBoard(){
        let boardtemp = this.state.board;
        console.log(this.state.mark);
        for(let i = 0; i < 8; i++){
            // let rw = [];
            for(let j = 0; j < 8; j++){
                if(this.state.mark[i][j]){ // go back to board if yout scre it
                    boardtemp[i][j] = 1;
                }else 
                    boardtemp[i][j] = 0;
            }
            // boardtemp.push(rw);
        }
        console.log("boardtemp")
        console.log(boardtemp);
        this.setState({board: boardtemp,index: 0, isAvailable: false});
        console.log(this.state.board);
    }

    solveAndDisplay(){
        this.resetBoard();
        if(this.solve(0)){
            console.log("oioi");
            this.resetBoard();

            clearInterval(this.state.interval);
            this.state.interval = setInterval( () => {this.displaySolution()}, 200);
        }else{
            console.log("Não possui solução")
        }
    }

    render(){
        return (
            <div className="game">
                <div className="board">
                    {this.getBoard()}
                    <div className="form-div">
                    <button className="btn get-random-table" >Tabuleiro aleatório</button>
                    <button className="btn custom-board" >Crie seu tabuleiro</button>
                    <DelayInput value={this.state.delayTime} className="delay-input" onChange={(a) => this.handleDelayChange(a)}></DelayInput>
                    <button className="btn solve-button" onClick={() => this.solveAndDisplay()}>Gerar Solução</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default EightQueens;

// ReactDOM.render(
//     <div>
//         <div className="header"><FontAwesomeIcon icon={faChessBoard} /></div>
//         <div className="page"><Board></Board></div>
//     </div>,
//     document.getElementById('root')
// );