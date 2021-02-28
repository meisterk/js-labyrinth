class Kasten {
    constructor(){
        this.rahmenOben = false;
        this.rahmenRechts = false;
        this.rahmenUnten = false;
        this.rahmenLinks = false;
        
        this.nachbarn = [];
        this.zustand = '⋅';        
    }
}

const BREITE = 20;
const HOEHE = 20;
const WAHRSCHEINLICHKEIT = 0.21;

const App = {
    data(){
        return {
            board: []
        }
    },
    methods:{
        rahmenSetzen(){
            for(let spalte = 0; spalte < BREITE; spalte++){
                this.board[0][spalte].rahmenOben = true;
                this.board[HOEHE-1][spalte].rahmenUnten = true;
            }
            for(let zeile = 0; zeile < HOEHE; zeile++){
                this.board[zeile][0].rahmenLinks = true;
                this.board[zeile][BREITE-1].rahmenRechts = true;
            }
        },
        layrinthSetzen(){
            for(let zeile = 0; zeile < HOEHE; zeile++){                
                for(let spalte = 0; spalte < BREITE; spalte++){
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenOben = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenRechts = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenUnten = true;
                    }                    
                    if(Math.random()<WAHRSCHEINLICHKEIT){
                        this.board[zeile][spalte].rahmenLinks = true;
                    }                    
                }
            }
        },
        nachbarnFinden(){
            for(let zeile = 0; zeile < HOEHE; zeile++){                
                for(let spalte = 0; spalte < BREITE; spalte++){
                    const kasten = this.board[zeile][spalte];

                    let oben = null;
                    if(zeile>0){
                        oben = this.board[zeile-1][spalte];
                        if(!kasten.rahmenOben && ! oben.rahmenUnten){
                            kasten.nachbarn.push(oben);
                        }
                    } 
                    let rechts = null;
                    if(spalte<BREITE-1){
                        rechts = this.board[zeile][spalte+1];
                        if(!kasten.rahmenRechts && ! rechts.rahmenLinks){
                            kasten.nachbarn.push(rechts);
                        }
                    } 
                     
                    let unten = null;
                    if(zeile<HOEHE-1){
                        unten = this.board[zeile+1][spalte];
                        if(!kasten.rahmenUnten && ! unten.rahmenOben){
                            kasten.nachbarn.push(unten);
                        }
                    } 
                    let links = null;
                    if(spalte>0){
                        links = this.board[zeile][spalte-1];
                        if(!kasten.rahmenLinks && ! links.rahmenOben){
                            kasten.nachbarn.push(unten);
                        }
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
        this.rahmenSetzen();
        this.layrinthSetzen();
        this.nachbarnFinden();
    }
};
Vue.createApp(App).mount('#app');