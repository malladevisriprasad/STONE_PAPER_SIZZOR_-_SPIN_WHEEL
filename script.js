/* ==========================================
   TAB SYSTEM
========================================== */

function openGame(id, button) {

    document.querySelectorAll(".game").forEach(game => {
        game.classList.remove("active");
    });

    document.querySelectorAll(".tab-btn").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    button.classList.add("active");
}


/* ==========================================
   SOUND
========================================== */

function beep(frequency = 500, duration = 100) {

    try {

        const audio =
            new (window.AudioContext ||
            window.webkitAudioContext)();

        const oscillator =
            audio.createOscillator();

        const gain =
            audio.createGain();

        oscillator.frequency.value = frequency;

        oscillator.connect(gain);

        gain.connect(audio.destination);

        oscillator.start();

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + duration / 1000
        );

        oscillator.stop(
            audio.currentTime + duration / 1000
        );

    } catch(e) {}

}


/* ==========================================
   STONE PAPER SCISSORS
========================================== */

let playerScore = 0;
let computerScore = 0;


const handIcons = {

    stone: "✊",

    paper: "🖐️",

    scissors: "✌️"

};


function playSPS(playerChoice) {

    const choices = [
        "stone",
        "paper",
        "scissors"
    ];

    const computerChoice =
        choices[Math.floor(Math.random() * 3)];


    const playerHand =
        document.getElementById("playerHand");

    const computerHand =
        document.getElementById("computerHand");


    playerHand.classList.remove("hand-changing");

    computerHand.classList.remove("hand-changing");


    void playerHand.offsetWidth;
    void computerHand.offsetWidth;


    playerHand.classList.add("hand-changing");
    computerHand.classList.add("hand-changing");


    playerHand.textContent =
        handIcons[playerChoice];

    computerHand.textContent =
        handIcons[computerChoice];


    let result;


    if (playerChoice === computerChoice) {

        result = "🤝 It's a Draw!";

    }

    else if (

        (playerChoice === "stone" &&
            computerChoice === "scissors") ||

        (playerChoice === "paper" &&
            computerChoice === "stone") ||

        (playerChoice === "scissors" &&
            computerChoice === "paper")

    ) {

        playerScore++;

        result = "🎉 You Win!";

    }

    else {

        computerScore++;

        result = "🤖 Computer Wins!";

    }


    document.getElementById("playerScore")
        .textContent = playerScore;

    document.getElementById("computerScore")
        .textContent = computerScore;


    document.getElementById("spsResult")
        .textContent =
        result +
        `  You: ${playerChoice} | Computer: ${computerChoice}`;


    beep(
        result.includes("You Win") ? 800 : 400,
        180
    );

}


/* ==========================================
   PRIZE PICKER
========================================== */

const prizes = [

    {
        name: "iPhone 18 Pro Max",
        image:
        "https://img.shoplineapp.com/media/image_clips/6aaba6e92e896aad4074d9b5/original.jpg?1789634279="
    },

    {
        name: "Apple MacBook M2",
        image:
        "https://www.apple.com/newsroom/images/product/mac/standard/Apple-MacBook-Air-M2-Midnight-hero-220606.jpg"
    },

    {
        name: "OPPO Reno 16 Pro",
        image:
        "https://welectronics.com/images/stories/virtuemart/product/OppoReno16ProChinaBlack76.jpg"
    },

    {
        name: "Vivo T4",
        image:
        "https://blog.sathya.store/img/product/zHZFXcBISPxFhfJC.png"
    },

    {
        name: "ASUS Vivobook 15",
        image:
        "https://in.store.asus.com/media/catalog/product/x/1/x1502va_qt_blu_mso_rfrsh_bcklt_kbd_6__1.png"
    },

    {
        name: "Dell 15 Laptop",
        image:
        "https://www.ankhang.vn/media/product/250x250/2024/09/12/dell-15-dc15250-dc5i7748w1-1.jpg"
    },

    {
        name: "HP OmniDesk",
        image:
        "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6538/6538094cv12d.jpg"
    },

    {
        name: "Premium Car",
        image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    }

];


let wheelRotation = 0;
let spinning = false;


function spinWheel() {

    if (spinning) return;

    spinning = true;

    const button =
        document.getElementById("spinBtn");

    button.disabled = true;

    beep(600, 100);


    /*
       Select an item randomly.
       This is only a local visual/demo picker.
    */

    const selectedIndex =
        Math.floor(Math.random() * prizes.length);


    /*
       8 sections = 45 degrees each.
       Pointer is at the top.
    */

    const sectionAngle = 360 / prizes.length;

    const targetAngle =
        360 -
        (selectedIndex * sectionAngle + sectionAngle / 2);


    /*
       Add several complete rotations
       for a smooth spinning animation.
    */

    wheelRotation +=
        360 * 6 + targetAngle;


    const wheel =
        document.getElementById("wheel");


    wheel.style.transform =
        `rotate(${wheelRotation}deg)`;


    setTimeout(() => {

        spinning = false;

        button.disabled = false;

        showWinner(selectedIndex);

    }, 5200);

}


/* ==========================================
   WINNER POPUP
========================================== */

function showWinner(index) {

    const prize = prizes[index];

    document.getElementById("winnerName")
        .textContent = prize.name;

    document.getElementById("winnerImage")
        .src = prize.image;

    document.getElementById("resultModal")
        .classList.add("show");


    beep(900, 120);

    setTimeout(() => beep(1200, 180), 140);

}


function closeModal() {

    document.getElementById("resultModal")
        .classList.remove("show");

}


/* Close when clicking outside */

document.getElementById("resultModal")
    .addEventListener("click", function(e) {

        if (e.target === this) {
            closeModal();
        }

    });