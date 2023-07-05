// document.querySelector(".board-cell").addEventListener("click", cellClick)

const allCells = document.querySelectorAll(".board-cell")
allCells.forEach(function(cell) {
    cell.addEventListener("click", cellClick)
})

function cellClick(test){
    console.log(`${test.target.id} clicked`)
}
