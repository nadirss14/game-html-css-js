
const letthers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const LAST_LEVEL=10

function randomColors() 
{
    const color=Math.floor(Math.random()*16777215).toString(16)
    return `#${color}`
} 

function fillLetther(){        
    for (let i = 0; i < letthers.length; i++) {
        document.getElementById(letthers[i]).style.backgroundColor = randomColors()
    }
}

class GameOfLetther {
    constructor(){
        this.initialize()
        this.generateSecuence()
    }

    initialize(){
        this.Level=1
    }

    generateSecuence(){        
       this.secuence= new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * letthers.length )) 
       this.paintSecuence()
    }

    paintSecuence(){
        for (let i = 0; i < this.Level; i++) {
           setTimeout(() => this.lightLetther(letthers[this.secuence[i]]),1000 * i )
        }
    }

    lightLetther(lether){
        document.getElementById(lether).style.backgroundColor='#000'
        setTimeout(()=> this.dontLightLetther(lether),350)
    }

    dontLightLetther(lether) {
        document.getElementById(lether).style.backgroundColor=randomColors()
    }
    
}


function initGame() {
    window.GameOfLetther = new GameOfLetther()
  }
