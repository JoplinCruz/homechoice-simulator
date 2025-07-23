
class Display {
    constructor(display, console) {
        this.display = display;
        this.console = console;
    }
    
    live(command, align="center") {
        command = command.trim().toUpperCase();
        this.display.style.justifyContent = align;
        this.display.innerHTML = command;
    }

    description(description, message) {
        description = description.trim().toUpperCase();
        this.console.innerHTML = `
            <h3>${description}:</h3>
            <p>====================================</p>
            <br>
            ${message}
        `
    }
}