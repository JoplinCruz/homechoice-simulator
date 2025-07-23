
const homePanel = document.querySelector("#panel");
const homePower = document.querySelector("#power");
const homeCassete = document.querySelector("#cassete");
const homeConnections = document.querySelector("#connections");

const homeButtonOnIMG = document.querySelector("#on");
const homeButtonOffIMG = document.querySelector("#off");

const homeDisplay = document.querySelector("#display");
const homeConsole = document.querySelector("#console");

const buttonGO = document.querySelector("#go");
const buttonSTOP = document.querySelector("#stop");
const buttonENTER = document.querySelector("#enter");
const buttonUP = document.querySelector("#arrow-up");
const buttonDOWN = document.querySelector("#arrow-down");
const buttonPOWER = document.querySelector("#on-off")

homeButtonOnIMG.style.display = "none";

const display = new Display(
    homeDisplay,
    homeConsole
);
const procedurals = new Procedurals(
    display,
    { homePanel, homePower, homeCassete, homeConnections }
);

function pressButton(event) {
    let button = event.target.id;

    switch (button) {
        case "go":
            procedurals.buttons.GO = true;
            break;
        case "stop":
            procedurals.buttons.STOP = true;
            break;
        case "enter":
            procedurals.buttons.ENTER = true;
            break;
        case "arrow-up":
            procedurals.buttons.UP = true;
            break;
        case "arrow-down":
            procedurals.buttons.DOWN = true;
            break;
        case _:
            break;
    }
}

function activeButtons() {
    buttonGO.addEventListener("click", pressButton);
    buttonSTOP.addEventListener("click", pressButton);
    buttonENTER.addEventListener("click", pressButton);
    buttonUP.addEventListener("click", pressButton);
    buttonDOWN.addEventListener("click", pressButton);

    procedurals.power.INIT = true;
}

function deactiveButtons() {
    buttonGO.removeEventListener("click", pressButton);
    buttonSTOP.removeEventListener("click", pressButton);
    buttonENTER.removeEventListener("click", pressButton);
    buttonUP.removeEventListener("click", pressButton);
    buttonDOWN.removeEventListener("click", pressButton);

    procedurals.power.INIT = false;
}

function running() {
    procedurals.intervals.ID = setInterval(mainframe, 1000 / procedurals.fps);
}

function breaking() {
    deactiveButtons();
    clearInterval(procedurals.intervals.ID);
}

function mainframe() {

    if (procedurals.timer.ON && !procedurals.timer.PAUSE) procedurals.timer.CURRENT++;

    homePanel.style.display = procedurals.modules.DISPLAY ? "" : "none";
    homePower.style.display = procedurals.modules.POWER ? "" : "none";
    homeCassete.style.display = procedurals.modules.CASSETE ? "" : "none";
    homeConnections.style.display = procedurals.modules.CONNECTIONS ? "" : "none";
    
    if (procedurals.power.ON) {
        if (!procedurals.power.INIT) {
            activeButtons();
        }
    }
    if (!procedurals.power.ON && procedurals.power.INIT) deactiveButtons();

    switch (procedurals.treatment()) {
        case procedurals.proc.INIT:
            procedurals.init();
            break;
        case procedurals.proc.STARTUP:
            procedurals.start();
            break;
        case procedurals.proc.CASSETE:
            procedurals.cassete()
            break;
        case procedurals.proc.BAGS:
            procedurals.bags();
            break;
        case procedurals.proc.CONNECT:
            procedurals.connect();
            break;
        case procedurals.proc.DRAIN:
            procedurals.drain();
            break;
        case procedurals.proc.INFUND:
            procedurals.infund();
            break;
        case procedurals.proc.SHUTDOWN:
            procedurals.shutdown();
            break;
        case procedurals.proc.OPTIONS:
            procedurals.options();
            break;
        case procedurals.proc.INTERRUPTION:
            procedurals.interruption();
            break;
    }

    if (procedurals.timer.ON) {
        if (procedurals.timer.LOOP) {
            procedurals.timer.DURATION = procedurals.timer.DURATION < procedurals.timer.OUT ? procedurals.timer.OUT : procedurals.timer.DURATION;
            procedurals.timer.CURRENT = procedurals.timer.CURRENT === procedurals.timer.OUT ? procedurals.timer.IN : procedurals.timer.CURRENT;
        }
        if (procedurals.timer.CURRENT < procedurals.timer.DURATION) procedurals.timer.ON = true;
        if (procedurals.timer.CURRENT >= procedurals.timer.DURATION) {
            procedurals.timer.ON = false;
            procedurals.timer.CURRENT = procedurals.timer.START;
        }
    }
}

running();
