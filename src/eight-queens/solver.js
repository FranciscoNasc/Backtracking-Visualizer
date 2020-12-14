export default class Solver{
    constructor(){
        this.arr = [
            // [ 
            //     [ 1, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 1, 0, 0, 0, 0, 0],
            // ],
            [ 
                [ 1, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 1],
                [ 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 0, 0, 0, 0, 0, 0],
                [ 0, 0, 1, 0, 0, 0, 0, 0],
            ],
            // [ 
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 1, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 1, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            // ],
            // [ 
            //     [ 1, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 1, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            //     [ 0, 1, 0, 0, 0, 0, 0, 0],
            //     [ 0, 0, 0, 0, 0, 0, 0, 0],
            // ],
        ]
    }


    generateRandom(){
        return Math.floor(Math.random() * this.arr.length);
    }

    getRandomBoard(){
        return this.arr[this.generateRandom()];
    }


    getRows(board){
        let arr = Array(8).fill(false);
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                // console.log(this.state.board());
                if(board[i][j] === 1){
                    arr[i] = true;
                    j = 8;
                }
            }
        }

        return arr;
    }

    getCols(board){
        let arr = Array(8).fill(false);
        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(board[j][i] === 1){
                    arr[i] = true;
                    j = 8;
                }
            }
        }
        return arr;
    }

    getDiagonals(board, row, col){
        let i = row, j = col;
        while(i >=0 && j >= 0){ // top left
            if(board[i][j] === 1){
                return true;
            }
            i--;
            j--;
        }
        i = row;
        j = col;
        while(i >=0 && j < 8){ // top right
            if(board[i][j] === 1){
                return true;
            }
            i--;
            j++;
        }
        i = row;
        j = col;
        while(i < 8 && j >= 0){ // bottom left
            if(board[i][j] === 1){
                return true;
            }
            i++;
            j--;
        }
        i = row;
        j = col;
        while(i < 8 && j < 8){ // bottom right
            if(board[i][j] === 1){
                return true;
            }
            i++;
            j++;
        }

        return false;
    }


}