const WIDTH = 20;
const HEIGHT = 20;
const PROBABILITY = 0.21;
const SYMBOL_VISITED = '\uD83D\uDE42'; // :)
const SYMBOL_NOT_VISITED = '⋅';

class Cell {
    constructor(){
        this.borderTop = false;
        this.borderRight = false;
        this.borderBottom = false;
        this.borderLeft = false;
        
        this.visited = false;
        this.neighbors = [];        
    }

    getSymbol(){
        if(this.visited){
            return SYMBOL_VISITED;
        }else{
            return SYMBOL_NOT_VISITED;
        }
    }
}

const App = {
    data(){
        return {
            board: [],
            pathExists: false,
            boardwidth: WIDTH
        }
    },
    methods:{
        createEmptyBoard(){
            this.board = [];
            for(let row = 0; row < HEIGHT; row++){
                this.board[row] = [];
                for(let column = 0; column < WIDTH; column++){
                    this.board[row].push(new Cell());
                }
            }
        },
        setBoardBorders(){
            for(let column = 1; column < WIDTH; column++){
                this.board[0][column].borderTop = true;                
            }
            for(let column = 0; column < WIDTH-1; column++){                
                this.board[HEIGHT-1][column].borderBottom = true;
            }            
            for(let row = 0; row < HEIGHT; row++){
                this.board[row][0].borderLeft = true;
                this.board[row][WIDTH-1].borderRight = true;
            }
        },
        setCellBorders(){
            for(let row = 0; row < HEIGHT; row++){                
                for(let column = 0; column < WIDTH; column++){
                    if(Math.random()<PROBABILITY && column>0){
                        this.board[row][column].borderTop = true;
                    }                    
                    if(Math.random()<PROBABILITY){
                        this.board[row][column].borderRight = true;
                    }                    
                    if(Math.random()<PROBABILITY && column<HEIGHT-1){
                        this.board[row][column].borderBottom = true;
                    }                    
                    if(Math.random()<PROBABILITY){
                        this.board[row][column].borderLeft = true;
                    }                    
                }
            }
        },
        findNeighbors(){
            for(let row = 0; row < HEIGHT; row++){                
                for(let column = 0; column < WIDTH; column++){
                    const cell = this.board[row][column];
                    
                    if(row>0){
                        let oben = this.board[row-1][column];
                        if(!cell.borderTop && !oben.borderBottom){
                            cell.neighbors.push(oben);
                        }
                    } 
                    
                    if(column<WIDTH-1){
                        let rechts = this.board[row][column+1];
                        if(!cell.borderRight && !rechts.borderLeft){
                            cell.neighbors.push(rechts);
                        }
                    }                     
                    
                    if(row<HEIGHT-1){
                        let unten = this.board[row+1][column];
                        if(!cell.borderBottom && !unten.borderTop){
                            cell.neighbors.push(unten);
                        }
                    } 
                    
                    if(column>0){
                        let links = this.board[row][column-1];
                        if(!cell.borderLeft && !links.borderRight){
                            cell.neighbors.push(links);
                        }
                    }                     
                }
            }
        },
        findPathDFS(start, destination){   
            const stack = [];         
            let current = start;            
            stack.push(current);

            while(stack.length>0 && current!==destination){                
                current = stack.pop();

                if(!current.visited){
                    current.visited = true;                   

                    current.neighbors.forEach(neighbor => {
                        stack.push(neighbor);
                    });                    
                }                           
            };
            if(current===destination){
                this.pathExists = true;
            }else{
                this.pathExists = false;
            }          
        }
    },
    mounted(){     
        // Create Labyrinth
        this.createEmptyBoard();        
        this.setBoardBorders();
        this.setCellBorders();
        this.findNeighbors();

        // Find path from start to destination
        const start = this.board[0][0];
        const destination = this.board[HEIGHT-1][WIDTH-1];
        this.findPathDFS(start, destination);
    }
};
Vue.createApp(App).mount('#app');