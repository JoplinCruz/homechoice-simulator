
class Timer {
    constructor() {
        this.set = {
            START: -1,
            CURRENT: 0,
            DURATION: 0,
            ON: false,
            PAUSE: false,
            LOOP: false,
            IN: 0,
            OUT: 0,
            FPS: 30,
        }
        this.memory = {};
        this.defaults();
    }

    defaults() {
        this.default = {
            set: { ...this.set },
        }
    }

    on() {
        this.set.ON = true;
    }

    off() {
        this.set.ON = false;
    }

    pause() {
        this.set.PAUSE = true;
    }

    play() {
        this.set.PAUSE = false
    }

    loop(start, end) {
        if (start) {
            this.set.LOOP = true;
            this.set.IN = end ? start : 0;
            this.set.OUT = end ?? start;
        } else {
            this.set.LOOP = false;
            this.set.IN = 0;
            this.set.OUT = 0;
        }
    }

    getLoop() {
        return { in: this.set.IN, out: this.set.OUT };
    }

    setDuration(duration) {
        this.set.DURATION = duration;
    }

    getDuration() {
        return this.set.DURATION;
    }

    increase() {
        this.set.CURRENT++;
    }

    decrese() {
        this.set.CURRENT--;
    }

    setCurrent(current) {
        this.set.CURRENT = current;
    }

    setFramerate(fps) {
        this.set.FPS = fps
    }

    framerate() {
        return this.set.FPS;
    }

    current() {
        return this.set.CURRENT;
    }

    seconds() {
        return this.set.CURRENT / this.set.FPS >> 0;
    }

    minutes() {
        return this.set.CURRENT / (60 * this.set.FPS) >> 0;
    }

    hours() {
        return this.set.CURRENT / (3600 * this.set.FPS) >> 0;
    }

    save() {
        for (let memo in this.set) this.memory[memo] = this.set[memo];
    }

    load() {
        let memoryLength = this.keys().length;
        if (memoryLength) {
            for (let memo in this.memory) this.set[memo] = this.memory[memo];
        }
    }

    restart() {
        this.set.CURRENT = this.set.START;
    }

    reset(key) {
        let keys = this.keys();
        if (keys.includes(key)) {
            this.set[key] = this.default.set[key];
        }
    }

    resetAll() {
        for (let key in this.default.set) this.set[key] = this.default.set[key];
    }

    keys() {
        return Object.keys(this.set);
    }
}