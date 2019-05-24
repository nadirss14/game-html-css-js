
const letthers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z']
const LAST_LEVEL=10

function randomColors() 
{
    const color=Math.floor(Math.random()*16777215).toString(16)
    return `#${color}`
} 

function fillLetther(){        
    for (let i = 0; i < letthers.length; i++) {
        document.getElementById(letthers[i]).style.borderColor = randomColors()
    }
}

class GameOfLetther {
    constructor(){
        this.clickLetther=this.clickLetther.bind(this)
        this.initialize()
        this.generateSecuence()
        setTimeout(() => this.nextLevel(),500)
    }

    initialize(){
        this.Level=1
        this.secuenceClick=new Array(LAST_LEVEL)
    }

    generateSecuence(){        
       this.secuence= new Array(LAST_LEVEL).fill(0).map(n => Math.floor(Math.random() * letthers.length ))
    }

    nextLevel(){
        this.subLevel=0
        this.paintSecuence()
        this.enableClick()
    }

    paintSecuence(){
        for (let i = 0; i < this.Level; i++) {
           setTimeout(() => this.lightLetther(letthers[this.secuence[i]]),1000 * i )
        }
       // setTimeout(() => this.notification(), 500)
    }

    lightLetther(lether){
        document.getElementById(lether).classList.add('lightLetther')
        setTimeout(()=> this.dontLightLetther(lether),350)
    }

    dontLightLetther(lether) {
        document.getElementById(lether).classList.remove('lightLetther')
    }
    
    notification(){
        swal("Tu turno!!!","click en el boton OK!","success")
    }

    enableClick(){
        for (let i = 0; i < letthers.length; i++) {
            document.getElementById(letthers[i]).addEventListener('click',this.clickLetther)
        }
    }

    disableClick(){
        for (let i = 0; i < letthers.length; i++) {
            document.getElementById(letthers[i]).removeEventListener('click',this.clickLetther)
        }
    }

    clickLetther(ev){
        const nameLetther= ev.target.dataset.letter
        this.secuenceClick[this.Level-1]=nameLetther
        this.lightLetther(nameLetther)    
    }

    evalGame(){
        for(let i =0 ;i < this.Level;i++){
            debugger
            if(!(this.secuenceClick[this.Level-1]===letthers[this.secuence[this.Level-1]]) ){
               return this.youLost()
            }
        }
        let saludo= 'Felicidades!!!'
        let mensaje= `Nivel ${this.Level} alcanzado` 
        swal(saludo,mensaje,'info')
        .then(() => {
            this.Level++      
            this.disableClick()     
            if(this.Level=== LAST_LEVEL+1){
                this.youWin()
            }else{
                this.nextLevel()
            }      
        } )
        
    }

    youWin(){
        swal('Felicidades!!!', 'ganaste el juego','success')
    }

    youLost(){
        swal('Sorry!!! :)','El juego a terminado','error')
    }

}

function initGame() {
    window.GameOfLetther = new GameOfLetther()
  }
 
  function evaluation(){
      window.GameOfLetther.evalGame()
  }
