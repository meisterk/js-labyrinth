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
            board: [],
            stack: [],
            gefunden: false
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
                    
                    if(zeile>0){
                        let oben = this.board[zeile-1][spalte];
                        if(!kasten.rahmenOben && !oben.rahmenUnten){
                            kasten.nachbarn.push(oben);
                        }
                    } 
                    
                    if(spalte<BREITE-1){
                        let rechts = this.board[zeile][spalte+1];
                        if(!kasten.rahmenRechts && !rechts.rahmenLinks){
                            kasten.nachbarn.push(rechts);
                        }
                    }                     
                    
                    if(zeile<HOEHE-1){
                        let unten = this.board[zeile+1][spalte];
                        if(!kasten.rahmenUnten && !unten.rahmenOben){
                            kasten.nachbarn.push(unten);
                        }
                    } 
                    
                    if(spalte>0){
                        let links = this.board[zeile][spalte-1];
                        if(!kasten.rahmenLinks && !links.rahmenRechts){
                            kasten.nachbarn.push(links);
                        }
                    }                     
                }
            }
        },
        labyrinthLoesen(){
            const start = this.board[0][0];
            const ziel = this.board[HOEHE-1][BREITE-1];

            let aktuell = start;
            aktuell.zustand = 'X';
            this.stack.push(aktuell);            
            do{
                const anzahlNachbarn = aktuell.nachbarn.length;
                if(anzahlNachbarn > 0){
                    // aktuell hat noch mindestens einen unbesuchten Nachbarn
                    const nachbar = aktuell.nachbarn.pop();
                    nachbar.zustand = 'X';
                    this.stack.push(nachbar);
                    aktuell = nachbar;
                }else{
                    // aktuell hat keine Nachbarn                    
                    aktuell = this.stack.pop();
                }                              
            }while(this.stack.length>0 && aktuell!==ziel);
            if(aktuell===ziel){
                this.gefunden = true;
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
        this.labyrinthLoesen();
    }
};
Vue.createApp(App).mount('#app');