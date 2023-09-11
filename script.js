// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll("[data-cell]");
    const message = document.getElementById("message");
    const scoreDisplay = document.getElementById("score");
    const resetButton = document.getElementById("reset");

    let currentPlayer = "X";
    let gameOver = false;
    let score = { X: 0, O: 0 };

    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const checkWinner = () => {
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                cells[a].textContent &&
                cells[a].textContent === cells[b].textContent &&
                cells[a].textContent === cells[c].textContent
            ) {
                cells[a].classList.add("winner");
                cells[b].classList.add("winner");
                cells[c].classList.add("winner");
                gameOver = true;
                score[currentPlayer]++;
                message.textContent = `${currentPlayer} is the winner!`;
                updateScore();
                return;
            }
        }

        if ([...cells].every((cell) => cell.textContent)) {
            gameOver = true;
            message.textContent = "It's a draw!";
        }
    };

    const handleCellClick = (cell) => {
        if (!cell.textContent && !gameOver && currentPlayer === "X") {
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = "O";
            message.textContent = `${currentPlayer}'s turn`;
            if (!gameOver) {
                setTimeout(computerMove, 500); // Delay the computer's move
            }
        }
    };

    const computerMove = () => {
        const emptyCells = [...cells].filter((cell) => !cell.textContent);
        if (emptyCells.length > 0 && currentPlayer === "O" && !gameOver) {
            const randomIndex = Math.floor(Math.random() * emptyCells.length);
            const randomCell = emptyCells[randomIndex];
            randomCell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = "X";
            message.textContent = `${currentPlayer}'s turn`;
        }
    };

    const handleResetClick = () => {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove("winner");
        });
        currentPlayer = "X";
        gameOver = false;
        message.textContent = `${currentPlayer}'s turn`;
        updateScore();
    };

    const updateScore = () => {
        scoreDisplay.textContent = `Score - X: ${score.X} O: ${score.O}`;
    };

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            handleCellClick(cell);
        });
    });

    resetButton.addEventListener("click", () => {
        handleResetClick();
    });

    updateScore();
});
