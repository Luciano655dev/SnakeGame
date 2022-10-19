let grid = document.querySelector(".grid")
let scoreDisplay = document.querySelector(".scoreDisplay")
let resTimer = document.querySelector(".restartCounter")
let left = document.querySelector(".left")
let bottom = document.querySelector(".bottom")
let right = document.querySelector(".right")
let up = document.querySelector(".top")
let width = 10
let currentIndex = 0
let appleIndex = 0
let currentSnake = [2, 1, 0]
let direction = 1
let score = 0
let speed = 0.8
let intervalTime = 0
let interval = 0

document.addEventListener("DOMContentLoaded", function () {
  createBoard()
  startGame()
})

function createBoard() {
  for (let i = 0; i < 100; i++) {
    let div = document.createElement("div")
    grid.appendChild(div)
  }
}

function startGame() {
  let squares = document.querySelectorAll(".grid div")
  randomApple(squares)
  //random apple
  direction = 1
  scoreDisplay.innerHTML = `Points: ${score}`
  intervalTime = 500
  currentSnake = [2, 1, 0]
  currentIndex = 0
  currentSnake.forEach((index) => squares[index].classList.add("snake"))
  interval = setInterval(moveOutcome, intervalTime)
}

function moveOutcome() {
  let squares = document.querySelectorAll(".grid div")
  if (checkForHits(squares)) {
    resTimer.innerHTML = "Restarting in 3"
    setTimeout(()=>{ resTimer.innerHTML = "Restarting in 2"; return }, 1000)
    setTimeout(()=>{ resTimer.innerHTML = "Restarting in 1"; return }, 2000)
    setTimeout(()=>{ resTimer.innerHTML = ''; replay() }, 3000)
    
    return clearInterval(interval)
  } else {
    moveSnake(squares)
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop()
  squares[tail].classList.remove("snake")
  currentSnake.unshift(currentSnake[0] + direction)
  // movement ends here
  eatApple(squares, tail)
  squares[currentSnake[0]].classList.add("snake")
}

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true
  } else {
    return false
  }
}

function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple")
    squares[tail].classList.add("snake")
    currentSnake.push(tail)
    randomApple(squares)
    score++
    scoreDisplay.textContent = `Points: ${score}`
    clearInterval(interval)
    intervalTime * speed < 10?intervalTime * speed:10
    interval = setInterval(moveOutcome, intervalTime)
  }
}

function randomApple(squares) {
  do {
    appleIndex = Math.floor(Math.random() * squares.length)
  } while (squares[appleIndex].classList.contains("snake"))
  squares[appleIndex].classList.add("apple")
}

up.addEventListener("click", () => (direction = -width))
bottom.addEventListener("click", () => (direction = +width))
left.addEventListener("click", () => (direction = -1))
right.addEventListener("click", () => (direction = 1))

function replay() {
    grid.innerHTML = ""
    score=0
    scoreDisplay.textContent = `Points: ${score}`
    createBoard()
    startGame()
  }