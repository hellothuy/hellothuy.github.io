const game = {
    player: "X",
    winningBoxes: null,
    init: function () {
        const self = this

        // Initialize winningBoxes. These are the combinations of boxes that make a winner.
        self.winningBoxes = []
        self.winningBoxes.push(document.querySelectorAll("#box1, #box2, #box3"))
        self.winningBoxes.push(document.querySelectorAll("#box4, #box5, #box6"))
        self.winningBoxes.push(document.querySelectorAll("#box7, #box8, #box9"))
        self.winningBoxes.push(document.querySelectorAll("#box1, #box4, #box7"))
        self.winningBoxes.push(document.querySelectorAll("#box2, #box5, #box8"))
        self.winningBoxes.push(document.querySelectorAll("#box3, #box6, #box9"))
        self.winningBoxes.push(document.querySelectorAll("#box1, #box5, #box9"))
        self.winningBoxes.push(document.querySelectorAll("#box3, #box5, #box7"))

        // Make each box clickable
        const boxes = self.getBoxes()
        for (var i = 0; i < boxes.length; i++) {
            const element = boxes[i]
            element.addEventListener('click', function () {
                if (self.isElementOccupied(element)) {
                    alert('Please choose another box')
                } else {
                    self.assignElement(element, self.player)
                    if (self.checkWinner()) {
                        alert('Player ' + self.player + ' won the game!')
                    } else if (self.areAllBoxesOccupied()) {
                        alert("Cat's game!")
                    } else {
                        self.switchPlayer()
                    }
                }
            })
        }

        // Reset game board and the player's turn back to X.
        const btn = document.getElementById('reset')
        btn.addEventListener('click', function() {
            for (var i = 0; i < boxes.length; i++) {
                const element = boxes[i]
                self.assignElement(element, '')
            }
            self.player = "X"
            self.updateTurn()
        })

        // Display player's turn
        self.updateTurn()
    },
    isElementOccupied: function (element) {
        return element.innerText !== ""
    },
    assignElement: function (element, value) {
        element.innerText = value
    },
    switchPlayer: function () {
        if (this.player === "X") {
            this.player = "O"
        } else {
            this.player = "X"
        }
        this.updateTurn()
    },
    updateTurn: function() {
        const turn = document.getElementById('turn')
        const text = "Turn: Player " + this.player
        this.assignElement(turn, text)
    },
    checkWinner: function () {
        let winnerExists = false
        this.winningBoxes.forEach(function (boxes) {
            let areAllBoxesFilled = boxes[0].innerText && boxes[1].innerText && boxes[2].innerText
            let areAllBoxesTheSame = boxes[0].innerText === boxes[1].innerText && boxes[1].innerText === boxes[2].innerText
            if (areAllBoxesFilled && areAllBoxesTheSame) {
                winnerExists = true
                return
            }
        })
        return winnerExists
    }, 
    areAllBoxesOccupied: function() {
        const boxes = this.getBoxes()
        for (i = 0; i < boxes.length; i++) {
            const box = boxes[i]
            if (!this.isElementOccupied(box)) {
                return false
            }
        } 
        return true
    },
    getBoxes: function(){
        const boxes = document.querySelectorAll(".board > div")
        return boxes
    }
}

game.init()

