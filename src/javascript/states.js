
class States {

    fps = 30;

    buttons = {
        GO: false,
        STOP: false,
        ENTER: false,
        UP: false,
        DOWN: false
    }

    power = { ON: false, INIT: false };
    intervals = { ID: null };
    timer = {
        START: -1,
        CURRENT: 0,
        DURATION: 0,
        ON: false,
        PAUSE: false,
        LOOP: false,
        IN: 0,
        OUT: 0,
    }

    proc = {
        INIT: 0,
        STARTUP: 1,
        CASSETE: 2,
        BAGS: 3,
        CONNECT: 4,
        DISCONNECT: 5,
        DRAIN: 6,
        INFUND: 7,
        CLAMP: 8,
        UNCLAMP: 9,
        SHUTDOWN: 10,
        INTERRUPTION: 11,
        OPTIONS: 12,
    }

    modules = {
        DISPLAY: true,
        POWER: false,
        CASSETE: false,
        CONNECTIONS: false,
        TUTOR: false,
    }
}


/*
states

const fps = 30;
const buttons = {
    GO: false,
    STOP: false,
    ENTER: false,
    UP: false,
    DOWN: false
}
const power = { ON: false, INIT: false };
const intervals = { ID: null };
const timer = {
    START: -1,
    CURRENT: 0,
    DURATION: 0,
    ON: false,
    PAUSE: false,
    LOOP: false,
    IN: 0,
    OUT: 0,
}
const proc = {
    INIT: 0,
    STARTUP: 1,
    CASSETE: 2,
    BAGS: 3,
    CONNECT: 4,
    DISCONNECT: 5,
    DRAIN: 6,
    INFUND: 7,
    CLAMP: 8,
    UNCLAMP: 9,
    SHUTDOWN: 10,
    INTERRUPTION: 11,
    OPTIONS: 12,
}
const modules = {
    DISPLAY: true,
    POWER: false,
    CASSETE: false,
    CONNECTIONS: false,
}
*/