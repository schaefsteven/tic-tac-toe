class Cell {
    constructor(div, game) {
        this.div = div
        this.div.parent = this
        this.div.addEventListener("click", this.cellClick.bind(this))
        this.value = ""
        this.game = game
    }

    cellClick() {
        if (this.value != "") {
            return
        }
        if (this.game.completed) {
            return
        }
        this.value = this.game.currentPlayer
        this.updateDisplay()
        this.game.togglePlayer()
        this.game.checkWin()
    }

    updateDisplay() {
        this.div.children[0].innerHTML = this.value
    }
}

class Game {
    constructor() {
        this.cells = []
        const allCells = document.querySelectorAll(".board-cell")
        allCells.forEach( div => this.cells.push(new Cell(div, this)) )
        this.turnIndicator = document.querySelector("#turn-indicator")
        this.resetGame()
    }
    
    resetGame() {
        for (const cell of this.cells) {
            cell.value = ""
        }
        this.updateAllCells()
        this.completed = false
        this.currentPlayer = 'X'
        this.turnIndicator.innerText = "X goes first!"
    }
    
    updateAllCells() {
        for (const cell of this.cells) {
            cell.updateDisplay()
        }
    }
    
    togglePlayer() {
        if (this.currentPlayer == 'X') {
            this.currentPlayer = 'O'
        }
        else {
            this.currentPlayer = 'X'
        }
        this.turnIndicator.innerText = `${this.currentPlayer}'s turn!`
    }

    checkWin() {
        const sideLength = 3

        //Check Rows
        for (let start = 0; start < sideLength ** 2; start += sideLength) {
            const value = this.cells[start].value
            let win = true
            if (value == "") {
                win = false
            }
            else {
                for (let offset = 1; offset < sideLength; offset++) {
                    if (value != this.cells[start + offset].value) {
                        win = false
                    }
                }
            }
            if (win) {
                this.declareWinner(value)
                return
            }
        }

        //Check Columns
        for (let start = 0; start < sideLength; start++) {
            const value = this.cells[start].value
            let win = true
            if (value == "") {
                win = false
            }
            else {
                for (let offset = sideLength; 
                    offset < sideLength ** 2; 
                    offset += sideLength) {
                    if (value != this.cells[start + offset].value) {
                        win = false
                    }
                }
            }
            if (win) {
                this.declareWinner(value)
                return
            }
        }
        
        //Check Diagonals
        let start = 0
        let value = this.cells[start].value
        let win = true
        if (value == "") {
            win = false
        }
        else {
            for (let offset = sideLength + 1; 
                offset < sideLength ** 2; 
                offset += sideLength + 1) {
                if (value != this.cells[start + offset].value) {
                    win = false
                }
            }
        }
        if (win) {
            this.declareWinner(value)
            return
        }

        start = sideLength - 1
        value = this.cells[start].value
        win = true
        if (value == "") {
            win = false
        }
        else {
            for (let offset = sideLength - 1; 
                offset < sideLength ** 2 - sideLength; 
                offset += sideLength - 1) {
                if (value != this.cells[start + offset].value) {
                    win = false
                }
            }
        }
        if (win) {
            this.declareWinner(value)
            return
        }

        //Check for tie 
        let tie = true
        for (const cell of this.cells) {
            if (cell.value == "") {
                tie = false
                break
            }
        }
        if (tie) {
            this.declareTie()
            return
        }

    }

    declareWinner(winner) {
        this.completed = true
        this.turnIndicator.innerText = `${winner} wins!`
    }

    declareTie() {
        this.completed = true
        this.turnIndicator.innerText = "Tie!"
    }

}

let theGame = new Game()

document.querySelector("#new-game").addEventListener(
    "click", () => theGame.resetGame()
)
