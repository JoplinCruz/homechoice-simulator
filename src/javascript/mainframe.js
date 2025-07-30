
const homePanel = document.querySelector("#panel");
const homePower = document.querySelector("#power");
const homeCassete = document.querySelector("#cassete");
const homeConnections = document.querySelector("#connections");
const homeTutor = document.querySelector("#tutor");

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

const timer = new Timer();
const display = new Display(
    homeDisplay,
    homeConsole
);
const homechoice = new HomeChoice(
    display,
    { homePanel, homePower, homeCassete, homeConnections, homeTutor },
    timer
);

function pressButton(event) {
    let button = event.target.id;

    switch (button) {
        case "go":
            homechoice.buttons.GO = true;
            break;
        case "stop":
            homechoice.buttons.STOP = true;
            break;
        case "enter":
            homechoice.buttons.ENTER = true;
            break;
        case "arrow-up":
            homechoice.buttons.UP = true;
            break;
        case "arrow-down":
            homechoice.buttons.DOWN = true;
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

    homechoice.power.INIT = true;
}

function deactiveButtons() {
    buttonGO.removeEventListener("click", pressButton);
    buttonSTOP.removeEventListener("click", pressButton);
    buttonENTER.removeEventListener("click", pressButton);
    buttonUP.removeEventListener("click", pressButton);
    buttonDOWN.removeEventListener("click", pressButton);

    homechoice.power.INIT = false;
}

function running() {
    homechoice.intervals.ID = setInterval(mainframe, 1000 / homechoice.fps);
}

function breaking() {
    deactiveButtons();
    clearInterval(homechoice.intervals.ID);
}

function mainframe() {

    if (timer.set.ON && !timer.set.PAUSE) timer.increase();

    homePanel.style.display = homechoice.modules.DISPLAY ? "" : "none";
    homePower.style.display = homechoice.modules.POWER ? "" : "none";
    homeCassete.style.display = homechoice.modules.CASSETE ? "" : "none";
    homeConnections.style.display = homechoice.modules.CONNECTIONS ? "" : "none";
    homeTutor.style.display = homechoice.modules.TUTOR ? "" : "none";
    
    if (homechoice.power.ON) {
        if (!homechoice.power.INIT) {
            activeButtons();
        }
    }
    if (!homechoice.power.ON && homechoice.power.INIT) deactiveButtons();

    switch (homechoice.getProcess()) {
        case homechoice.proc.INIT:
            homechoice.init();
            break;
        case homechoice.proc.STARTUP:
            homechoice.start();
            break;
        case homechoice.proc.CASSETE:
            homechoice.cassete()
            break;
        case homechoice.proc.BAGS:
            homechoice.bags();
            break;
        case homechoice.proc.CONNECT:
            homechoice.connect();
            break;
        case homechoice.proc.DRAIN:
            homechoice.drain();
            break;
        case homechoice.proc.INFUND:
            homechoice.infund();
            break;
        case homechoice.proc.DISCONNECT:
            homechoice.disconnect();
            break;
        case homechoice.proc.SHUTDOWN:
            homechoice.shutdown();
            break;
        case homechoice.proc.OPTIONS:
            homechoice.options();
            break;
        case homechoice.proc.INTERRUPTION:
            homechoice.interruption();
            break;
        case homechoice.proc.ERROR:
            homechoice.error();
            break;
    }

    if (timer.set.ON) {
        if (timer.set.LOOP) {
            timer.setDuration(timer.getDuration() < timer.getLoop().out ? timer.getLoop().out : timer.getDuration());
            timer.setCurrent(timer.current() === timer.getLoop().out ? timer.getLoop().in : timer.current());
        }
        if (timer.current() > timer.getDuration()) {
            timer.off();
            timer.restart();
        }
    }
}

running();
