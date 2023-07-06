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
        const winner = this.game.checkWin()
        if (winner) { 
            this.game.declareWinner(winner)
        }
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
        this.currentPlayer = 'X'
        this.turnIndicator = document.querySelector("#turn-indicator")
        this.completed = false
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

        //If no win is detected, return false
        return false
    }

    declareWinner(winner) {
        this.completed = true
        this.turnIndicator.innerText = `${winner} wins!`
    }

}


let theGame = new Game()
