class Kasten {
    constructor(){
        this.rahmenoben = false;
        this.rahmenrechts = false;
        this.rahmenunten = false;
        this.rahmenlinks = false;
        
        this.nachbarn = [];
        this.zustand = 'unbesucht';
        this.text = "X";
    }
}

const BREITE = 10;
const HOEHE = 10;
const WAHRSCHEINLICHKEIT = 0.21;

const App = {
    data(){
        return {
            board: [
                [ 1, 2, 3] ,
                [4,5,6],
                [7,8,9]
            ]
        }
    },
    methods:{
        rahmensetzen(){
            for(let spalte = 0; spalte < BREITE; spalte++){
                this.board[0][spalte].rahmenoben = true;
                this.board[HOEHE-1][spalte].rahmenunten = true;
            }
            for(let zeile = 0; zeile < HOEHE; zeile++){
                this.board[zeile][0].rahmenlinks = true;
                this.board[zeile][BREITE-1].rahmenrechts = true;
            }
        },
        layrinthsetzen(){
            for(let zeile = 0; zeile < HOEHE; zeile++){                
                for(let spalte = 0; spalte < BREITE; spalte++){
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenoben = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenrechts = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenunten = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenlinks = true;
                    }                    
                }
            }
        }
    },
    mounted(){     
        // Leeres Board   
        for(let zeile = 0; zeile < HOEHE; zeile++){
            this.board[zeile] = [];
            for(let spalte = 0; spalte < BREITE; spalte++){
                this.board[zeile].push(new Kasten());
            }
        }
        this.rahmensetzen();
        this.layrinthsetzen();
    }
};
Vue.createApp(App).mount('#app');