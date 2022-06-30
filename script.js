var character = document.getElementById("character");
var block = document.getElementById("block");
var guy = document.getElementById("guy");
var background = document.getElementById("background");
var title = document.getElementById("title");
const music = new Audio('audio/flatbush-music-2.mp3');
const jumpSound = new Audio('audio/jump-sound.mp3');
const deathSound = new Audio('audio/death-sound-3.mp3');
const ratSound = new Audio('audio/rat-sound.mp3');

function gogo() {
    background.style.animationPlayState = "running";
    block.style.animationPlayState = "running";
    document.getElementById("gogo").style.display = "none";
    document.addEventListener("keydown", jump);
    document.addEventListener("click", jump);
    document.getElementById("instructions").style.display = "none";
    character.style.display = "inherit";
    title.style.display = "none";
    music.play();
    music.volume = 0.3;
}

function jump() {
    if (character.classList != "animate-jump") {
        jumpSound.play();
        character.classList.add("animate-jump");
        guy.src = "img/jump-test.gif";
    }

    var timeoutID;

    timeoutID = setTimeout(function() {
        character.classList.remove("animate-jump");
        guy.src = "img/run-test-trans.gif";
        return;
    }, 600);
}


function die() {
    ratSound.play();
    character.classList.remove("animate-jump");
    document.removeEventListener("keydown", jump);
    document.removeEventListener("click", jump);
    block.style.animationIterationCount = "1";
    background.style.animationPlayState = "paused";
    deathSound.volume = 0.4;

    setTimeout(function() {
        music.volume = 0.1;
        document.getElementById("gameover").innerHTML = "GAME<br>OVER";
        deathSound.play();
        guy.src = "img/dead-test.gif";
        character.classList.add("dead");
    }, 600);

    setTimeout(function() {
        document.getElementById("tryagain").style.display = "block";
    }, 1500);
}

var checkDead = setInterval(function(){
    var characterTop = parseInt(getComputedStyle(character).getPropertyValue("top"));
    var blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));
    if(blockLeft < 265 && blockLeft > 50 && characterTop > 150) {
        die();
    }}, 10);
