let gameSeq = [];
let userSeq = [];
let level = 0;
let started = false;
let stat = document.querySelector("#status");
let btns = document.querySelectorAll(".color_boxes");
let btnList = ["red", "blue", "green", "yellow"];

for (const btn of btns) {
    btn.addEventListener("click", function () {
        btnFlash(this);
    });
}

function btnFlash(btn) {
    btn.style.backgroundColor = "white";
    setTimeout(function () {
        btn.style.backgroundColor = ""; 
    }, 50);
}

function gameOver() {
    stat.innerText = `Game Over! Press Enter to play again.`;
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}

function btnPressed() {
    if (level > 0) {
        btnFlash(this);
        console.log(this);
        let userColor = this.getAttribute("id");
        userSeq.push(userColor);
        console.log(userSeq);
        checkSeq(userSeq.length - 1);
    }
}

for (const btn of btns) {
    btn.addEventListener("click", btnPressed);
}

function levelUp() {
    level++;
    stat.innerText = `Level ${level}`
    
    userSeq = [];
    let randIdx = Math.floor(Math.random() * 3);
    let randColor = btnList[randIdx];
    let randBtn = document.querySelector(`#${randColor}`);

    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
}

function checkSeq(idx) {
    if (gameSeq[idx] === userSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 750);
        }
    } else {
        gameOver();
    }
}

document.addEventListener("keypress", function (event) {
    if (started === false) {
        if (event.key === "Enter") {
            if (started == false) {
                console.log("Game started.");
                started = true;
            }
            levelUp();
        }
    }
});