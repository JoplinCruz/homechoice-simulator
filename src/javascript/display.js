
class Display {
    constructor(display, console) {
        this.display = display;
        this.console = console;
        this.info = {
            command: "",
            descriptor: "",
            message: "",
        }
    }

    save() {
        this.backup = { ...this.info };
    }

    load(option = "all" | "command" | "description") {

        if (!this.backup) this.backup = { ...this.info };
        
        switch (option) {
            case "all":
                this.live(this.backup.command);
                this.description(this.backup.descriptor, this.backup.message);
                break;
            case "command":
                this.live(this.backup.command);
                break;
            case "description":
                this.description(this.backup.descriptor, this.backup.message);
                break;
        }
    }

    clear() {
        this.display.innerHTML = "";
        this.console.innerHTML = "";
    }
    
    live(command, align="center") {
        this.info.command = command.trim().toUpperCase();
        this.display.style.justifyContent = align;
        this.display.innerHTML = `<pre>${this.info.command}</pre>`;
    }

    description(descriptor, message) {
        this.info.descriptor = descriptor.trim().toUpperCase();
        this.info.message = message;
        this.console.innerHTML = `
            <h3>${this.info.descriptor}:</h3>
            <p>====================================</p>
            <br>
            ${this.info.message}
        `
    }
}