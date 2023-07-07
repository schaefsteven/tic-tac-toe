class Cell {
    constructor(div, game) {
        this.div = div
        this.div.addEventListener("click", this.cellClick.bind(this))
        this.value = ""
        this.game = game // This is the parent Game element
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
        this.game.onCellClick()
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
        this.statusLine = document.querySelector("#turn-indicator")
        this.resetGame()
    }

    onCellClick() {
        this.togglePlayer()
        const gameStatus = this.checkWin()
        if (gameStatus == 'tie') {
            this.declareTie()
        }
        else if (gameStatus) { 
            this.declareWinner(gameStatus)
        }
    }
    
    resetGame() {
        for (const cell of this.cells) {
            cell.value = ""
        }
        this.updateAllCells()
        this.completed = false
        this.currentPlayer = 'X'
        this.statusLine.innerText = "X goes first!"
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
        this.statusLine.innerText = `${this.currentPlayer}'s turn!`
    }

    checkWin() {
        // Checks for a win or a tie of the game. Returns the winning player, 
        // string "tie" or false if the game is not over.
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
                return value
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
                return value
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
            return value
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
            return value
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
            return 'tie'
        }

    return false

    }

    declareWinner(winner) {
        this.completed = true
        this.statusLine.innerText = `${winner} wins!`
    }

    declareTie() {
        this.completed = true
        this.statusLine.innerText = "Tie!"
    }

}

let theGame = new Game()

document.querySelector("#new-game").addEventListener(
    "click", () => theGame.resetGame()
)
