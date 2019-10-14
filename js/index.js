const letthers = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "Ñ",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

function randomColors() {
  const color = Math.floor(Math.random() * 16777215).toString(16);
  return `#${color}`;
}

function fillLetther() {
  for (let i = 0; i < letthers.length; i++) {
    document.getElementById(letthers[i]).style.borderColor = randomColors();
  }
}

class GameOfLetther {
  constructor(LAST_LEVEL) {
    this.clickLetther = this.clickLetther.bind(this);
    this.LAST_LEVEL = LAST_LEVEL;
    console.log(typeof this.LAST_LEVEL);
    this.initialize();
    this.generateSecuence();
    this.showLevelContainer(true);
    setTimeout(() => this.nextLevel(), 500);
  }

  initialize() {
    this.Level = 1;
    this.secuenceClick = new Array(this.LAST_LEVEL);
    this.enableDisableButton(true);
  }

  generateSecuence() {
    this.secuence = new Array(this.LAST_LEVEL)
      .fill(0)
      .map(n => Math.floor(Math.random() * letthers.length));
  }

  nextLevel() {
    this.subLevel = 0;
    let showLevel = document.querySelector(`#level-${this.Level}`);
    showLevel.classList.add("lbl-nivel-pass");
    this.paintSecuence();
    this.enableClick();
  }

  paintSecuence() {
    for (let i = 0; i < this.Level; i++) {
      setTimeout(() => this.lightLetther(letthers[this.secuence[i]]), 1000 * i);
    }
    // setTimeout(() => this.notification(), 500)
  }

  lightLetther(lether) {
    document.getElementById(lether).classList.add("lightLetther");
    setTimeout(() => this.dontLightLetther(lether), 350);
  }

  dontLightLetther(lether) {
    document.getElementById(lether).classList.remove("lightLetther");
  }

  notification() {
    swal("Tu turno!!!", "click en el boton OK!", "success");
  }

  enableClick() {
    for (let i = 0; i < letthers.length; i++) {
      document
        .getElementById(letthers[i])
        .addEventListener("click", this.clickLetther);
    }
  }

  disableClick() {
    for (let i = 0; i < letthers.length; i++) {
      document
        .getElementById(letthers[i])
        .removeEventListener("click", this.clickLetther);
    }
  }

  clickLetther(ev) {
    const nameLetther = ev.target.dataset.letter;
    this.secuenceClick[this.Level - 1] = nameLetther;
    this.lightLetther(nameLetther);
  }

  evalGame() {
    for (let i = 0; i < this.Level; i++) {
      if (
        !(
          this.secuenceClick[this.Level - 1] ===
          letthers[this.secuence[this.Level - 1]]
        )
      ) {
        return this.youLost();
      }
    }
    let saludo = "Felicidades!!!";
    let mensaje = `Nivel ${this.Level} alcanzado`;

    swal(saludo, mensaje, { icon: "success" }).then(() => {
      this.Level++;
      this.disableClick();
      if (this.Level === this.LAST_LEVEL + 1) {
        this.youWin();
      } else {
        this.nextLevel();
      }
    });
  }

  youWin() {
    swal("Felicidades!!!", "ganaste el juego", "success");
    this.enableDisableLevelActive();
  }

  youLost() {
    swal("Sorry!!! :)", "El juego a terminado", "error");
    this.enableDisableLevelActive();
  }

  enableDisableButton(value) {
    if (value === true) {
      document.querySelector("#btnInit").classList.remove("no-disabled");
      document.querySelector("#btnInit").classList.add("disabled");
      document.querySelector("#btnInit").setAttribute("disable", "true");
      document.querySelector("#btnEval").classList.remove("disabled");
      document.querySelector("#btnEval").classList.add("no-disabled");
      document.querySelector("#btnEval").removeAttribute("disable");
    } else {
      document.querySelector("#btnInit").classList.add("no-disabled");
      document.querySelector("#btnInit").classList.remove("disabled");
      document.querySelector("#btnInit").removeAttribute("disable");
      document.querySelector("#btnEval").classList.add("disabled");
      document.querySelector("#btnEval").classList.remove("no-disabled");
      document.querySelector("#btnEval").setAttribute("disable", "true");
    }
  }

  showLevelContainer(show) {
    let levelContainer = document.querySelector("#level-container");
    if (show) {
      levelContainer.classList.remove("level__container--inactive");
      levelContainer.classList.add("level__container--active");
    } else {
      levelContainer.classList.remove("level__container--active");
      levelContainer.classList.add("level__container--inactive");
    }
  }

  enableDisableLevelActive() {
    for (let i = 1; i <= this.LAST_LEVEL; i++) {
      let showLevel = document.querySelector(`#level-${i + 1}`);
      showLevel.classList.remove("lbl-nivel-pass");
    }
    this.showLevelContainer(false);
    this.enableDisableButton(false);
  }
}

function initGame() {
  const selectedLevel = document.querySelector("#select-level");
  if (selectedLevel.value !== "-1") {
    const LAST_LEVEL = parseInt(selectedLevel.value);
    window.GameOfLetther = new GameOfLetther(LAST_LEVEL);
  } else {
    swal("Sorry!!! :)", "Debes seleccionar un nivel", "error");
  }
}

function evaluation() {
  window.GameOfLetther.evalGame();
}
