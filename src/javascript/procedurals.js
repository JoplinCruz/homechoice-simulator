
class Procedurals extends States {
    constructor(display, panels) {
        super();
        this.display = display;
        this.panels = panels;
        this.process = this.proc.INIT;
        this.processMemo = null;
        this.descriptionMemo = null;
        this.timerMemo = {
            CURRENT: null,
            ON: null,
            LOOP: null,
            PAUSE: null,
        }
        this.menu = [
            "option #1",
            "option #2",
            "option #3",
        ]
        this.index = 0;
    }

    init(duration) {
        this.timer.DURATION = duration * this.fps;

        if (this.timer.CURRENT === 0) {
            this.timer.CURRENT = 1;
            let message = `
                <p>Antes de iniciar reúna todo material necessário para o DPA:</p>
                <br>
                <ul>
                    <li>- Bolsa de solução;</li>
                    <li>- Equipo Cassete para DPA com cicladora;</li>
                    <li>- Clamps;</li>
                    <li>- Extensão da linha de drenagem;</li>
                    <li>- Protetor de conexão MiniCap;</li>
                    <li>- Máscara.</li>
                </ul>
                <br>
                <p>Lembrando que antes de manipular o material você deve lavar bem as mãos.</p>
                <p>
                    Para acessar o botão de <strong>LIGAR / DESLIGAR</strong> clique <button id="access-power"><span>aqui</span></button>.
                </p>
            `;
            this.display.description("bem-vindo(a)", message);
            let buttonAccessPower = document.querySelector("#access-power");
            buttonAccessPower.onclick = () => {
                this.powerON();
            }
        }

        if (this.power.ON) {
            this.process = this.proc.STARTUP;
            this.power.INIT = true;
            this.enableTimer();
        }

        this.uncheckButtons();
    }

    start(duration) {
        this.timer.DURATION = duration * this.fps;

        if (this.timer.CURRENT === 0) {
            this.display.live(""); 
            let text = `
                <p>Inicializando o sistema...</p>
                <br>
                <p>Aguarde até estar pronto.</p>
            `
            this.display.description("homechoice", text);    
        }

        if (this.timer.CURRENT === 3)
            this.display.live("█", "left");

        if (this.timer.CURRENT === 15)
            this.display.live("██████████████████████");

        if (this.timer.CURRENT === 90)
            this.display.live("");

        if (this.timer.CURRENT === 120)
            this.display.live("por favor espere...");

        if (this.timer.CURRENT >= 210) {
            this.display.live("aperte go p/ iniciar");
            let text = `
                <p>Pressione o botão GO para continuar...</p>
            `
            this.display.description("homechoice", text);
        }

        if (this.timer.CURRENT < 210) this.checkERROR("GO", 1);
        
        if (this.timer.CURRENT >= 210) {
            if (this.buttons.GO) {
                this.goto(this.proc.CASSETE);
                this.timerOFF();
                this.unbufferedDisplay();
            }
            this.checkOptions();
        }

        this.uncheckButtons();
    }

    cassete(duration) {
        this.timer.DURATION = duration * this.fps;

        if (this.timer.CURRENT === 0) {
            this.timer.CURRENT = 1;
            let message = `
                <p>O primeiro passo é abrir a bolsa que contém o Equipo Cassete e desenrolar as linhas.</p>
                <p>Clique <button id="access-door">aqui</button> para acessar a porta do compartimento do cassete e ver o procedimento.</p>
            `;
            this.display.description("instale o equipo cassete", message);
            let buttonAccessDoor = document.querySelector("#access-door");
            buttonAccessDoor.onclick = () => {
                this.casseteFIRST();
            };
        }

        if (this.timer.CURRENT === 1) {
            this.display.live("inserir cassete");
            if (this.buttons.GO) this.timer.CURRENT = 2;
        }

        if (this.timer.CURRENT >= 2 && this.timer.CURRENT) {
            this.timerON();
            this.display.live("auto teste");

            if (this.timer.CURRENT === 2) {
                let message = `
                    <p>Iniciado o Auto Teste...</p>
                    <p>Pegue a extremidade da "Linha do Dreno" e leve até o ponto de despejo (ralo do banheiro)</p>
                    <p>Nesse momento é extremamente importante que <strong>lave as mãos</strong> usando a técnica hospitalar.</p>
                    <p>Lembre-se desse importante cuidado, uma vez que será necessário o manuseio com partes sensíveis no procedimento, tais como as <strong>Bolsas de Solução</strong> e o <strong>Equipo do paciente</strong>.</p>
                `;
                this.display.description("homechoice auto teste", message);
            }
            if (this.timer.CURRENT === 210) {   // 1800
                let message = `
                    <p>Iniciado o Auto Teste...</p>
                    <p>Pegue a extremidade da "Linha do Dreno" e leve até o ponto de despejo (ralo do banheiro)</p>
                    <p>Nesse momento é extremamente importante que <strong>lave as mãos</strong> usando a técnica hospitalar.</p>
                    <p>Lembre-se desse importante cuidado, uma vez que será necessário o manuseio com partes sensíveis no procedimento, tais como as <strong>Bolsas de Solução</strong> e o <strong>Equipo do paciente</strong>.</p>
                    <br>
                    <p>... Geralmente o Auto Teste tem uma duração de 5 minutos, mas pelo carater ilustrativo desse simulador você pode clicar <button id="access-bags">aqui</button> para continuar.</p>
                `;
                this.display.description("homechoice auto teste", message);
                let buttonAccessBags = document.querySelector("#access-bags");
                buttonAccessBags.onclick = () => {
                    this.goto(this.proc.BAGS);
                    this.timerON();
                    this.timerRESET();
                    this.unbufferedDisplay();
                }
            }

        }

        if (this.timer.CURRENT >= 9000) {
            this.goto(this.proc.BAGS);
            this.unbufferedDisplay();
            this.timerON();
            this.timerRESET();
        }
        
        this.checkOptions();
        this.uncheckButtons();
    }

    bags(duration) {
        this.timer.DURATION = duration * this.fps;

        let interval = (this.timer.CURRENT / this.fps) >> 0;

        if (this.timer.CURRENT === 0) {
            this.timer.LOOP = true;
            this.timer.IN = 1;
            this.timer.OUT = 60;

            let message = `
                <p>Logo após o Auto Teste a mensagem "Conectar Bolsas" alternada com "Abrir Clamps" aparecerá no display. Isso significa que é preciso connectar as linhas do segmento do Equipo às bolsas de solução e depois retirar o clamp que foi previamente fixado.</p>
                <p>Vamos lá, o passo a passo desse procedimento é bem simples, clique <button id="access-bag-connection">aqui</button> para acompanhar.</p> 
            `;
            this.display.description("conectar bolsas", message);
            let buttonAccessBagConnection = document.querySelector("#access-bag-connection");
            buttonAccessBagConnection.onclick = () => {
                this.timerMemo.ON = this.timer.ON;
                this.timerMemo.LOOP = this.timer.LOOP;
                this.timerMemo.PAUSE = this.timer.PAUSE;
                this.timerMemo.CURRENT = this.timer.CURRENT;
                this.timerOFF();
                this.timerRESET();
                this.bagsFIRST();
            }
        }        
        
        if (this.timer.CURRENT >= 0 && this.timer.CURRENT < 60) {
            if (interval % 2 === 0)
                this.display.live("conectar bolsas...");
            else
                this.display.live("abrir clamps...");
        }

        if (this.timer.CURRENT > 60) {
            this.display.live("preenchendo linhas...");
            if (this.timer.CURRENT === 61) {
                let message = `
                    <p>Agora é preciso aguardo até que todas as linhas sejam preenchidas com a Solução.</p>
                    <p>Quando todos os seguimentos estiverem preenchidos a frase no visor mudará para CONECTE-SE</p>
                `;
                this.display.description("preenchimento das linhas", message);
            }
            if (this.timer.CURRENT === 120) {
                let message = `
                    <p>Agora é preciso aguardo até que todas as linhas sejam preenchidas com a Solução.</p>
                    <p>Quando todos os seguimentos estiverem preenchidos a frase no visor mudará para CONECTE-SE</p>
                    <br>
                    <p>Normalmente esse procedimento dura cerca de 7 minutos...</p>
                    <p>Se preferir você pode clicar <button id="access-connect">aqui</button> para continuar.</p>
                `;
                this.display.description("preenchimento das linhas", message);
                let buttonAccessConnect = document.querySelector("#access-connect");
                buttonAccessConnect.onclick = () => {
                    this.goto(this.proc.CONNECT);
                    this.timerRESET();
                    this.unbufferedDisplay();
                }
            }
        }

        if (this.timer.CURRENT > 12600) {
            this.goto(this.proc.CONNECT);
            this.timerRESET();
            this.unbufferedDisplay();
        }

        if (this.buttons.GO && this.timer.LOOP) {
            this.timer.LOOP = false;
            this.timer.IN = this.timer.OUT = 0;
            this.timer.CURRENT = 60;
        }

        this.checkOptions();
        this.uncheckButtons();
    }

    connect(duration) { 
        if (this.timer.CURRENT >= 0) this.display.live("conecte-se");
        if (this.timer.CURRENT === 30) this.timer.PAUSE = true;

        if (this.buttons.GO) {
            this.goto(this.proc.DISCONNECT);
            this.timerOFF();
            this.unbufferedDisplay();
        }
        this.checkOptions();
        this.uncheckButtons();
    }

    disconnect(duration) { }

    drain(duration) { }

    infund(duration) { }

    clamp(duration) { }

    unclamp(duration) { }

    shutdown(duration) { }

    interruption(duration) { }

    treatment() {
        return this.process;
    }

    powerON() {
        this.modules.DISPLAY = false;
        this.modules.POWER = true;

        let message = `
            <p>Sempre que ligar um equipamento na tomada verifique se a voltagem é correspondente.</p>
            <br>
            <p>Para iniciar o sistema Homechoice aperte o botão <strong>LIGAR / DESLIGAR</strong> (I/O).</p>
        `;

        this.display.description("homechoice power suply", message);

        buttonPOWER.onclick = () => {
            homeButtonOffIMG.style.display = "none";
            homeButtonOnIMG.style.display = "";
            setTimeout(() => {
                this.modules.POWER = false;
                this.modules.DISPLAY = true;
                this.power.ON = true;
            }, 3000)
        }
    }

    casseteFIRST() {
        this.modules.DISPLAY = false;
        this.modules.CASSETE = true;

        let rootStyles = document.documentElement;
        let panelScale = Number(window.getComputedStyle(document.documentElement).getPropertyValue("--panel-scale"));
        let sticker = document.querySelector("#sticker");

        let message = `
            <p>Puxe a alavanca até o topo da porta para abrir o compartimento do Equipo Cassete.</p>
        `;
        
        this.display.description("porta do compartimento do cassete", message);

        const onExit = () => {
            sticker.onmouseup = null;
            sticker.onmousemove = null;
            sticker.ontouchend = null;
            sticker.ontouchmove = null;
            if (sticker.offsetTop <= -(25 * panelScale)) {
                sticker.onmousedown = null;
                sticker.ontouchstart = null;
                sticker.setAttribute("draggable", "false");
                setTimeout(() => {
                    this.casseteSECOND();
                }, 3000);
            } else {
                let text = `
                    <p>É preciso levar a alanca até o topo da porta.</p>
                `;
                this.display.description("porta do compartimento do cassete", text);
            }
        };

        sticker.ontouchstart = (touchEvent) => {
            touchEvent.preventDefault();

            let pageX = touchEvent.touches[0].clientX >> 0,
                pageY = touchEvent.touches[0].clientY >> 0;
            
            sticker.ontouchmove = (touchMoveEvent) => {
                touchMoveEvent.preventDefault();

                let touchX = pageX - touchMoveEvent.touches[0].clientX,
                    touchY = pageY - touchMoveEvent; touches[0].clientY;
                
                let touchTop = sticker.offsetTop - touchY, toucheLeft = sticker.offsetLeft - touchX;
                touchTop = touchTop >= (35 * panelScale) ? (35 * panelScale) : touchTop <= -(45 * panelScale) ? -(45 * panelScale) : touchTop;

                sticker.style.top = touchTop + "px";
                rootStyles.style.setProperty("--sticker-rotation", -((touchTop - (35 * panelScale)) * .1) + "deg");
            };

            sticker.ontouchend = () => {
                onExit();
            };
        }
        
        sticker.onmousedown = (downEvent) => {
            downEvent.preventDefault();

            let clientX = downEvent.clientX, clientY = downEvent.clientY;

            sticker.onmousemove = (moveEvent) => {
                moveEvent.preventDefault();
                
                let x = clientX - moveEvent.clientX, y = clientY - moveEvent.clientY;
                clientX = moveEvent.clientX;
                clientY = moveEvent.clientY;

                let top = sticker.offsetTop - y, left = sticker.offsetLeft - x;
                top = top >= (35 * panelScale) ? (35 * panelScale) : top <= -(45 * panelScale) ? -(45 * panelScale) : top;

                sticker.style.top = top + "px";
                // sticker.style.left = (sticker.offsetLeft - x) + "px";

                rootStyles.style.setProperty("--sticker-rotation", -((top - (35 * panelScale)) * .1) + "deg");
            };
            
            sticker.onmouseup = () => {
                onExit();
            };
        };
    }

    casseteSECOND() {
        this.modules.CASSETE = false;
        this.modules.TUTOR = true;
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/insert-cassete.png")';

        let message = `
            <p>Depois de abrir a porta do compartimento certifique-se de colocar o Equipo Cassete na posição correta, como mostra a figura acima.</p>
            <p>Perceba que as linhas ficam para a direita do compartimento e que a linha Vermelha fica acima das demais.</p>
            <p>Clique <button id="access-organizer">aqui</button> para continuar.</p>
        `;
        this.display.description("compartimento do equipo cassete", message);
        let buttonAccessOrganizer = document.querySelector("#access-organizer");
        buttonAccessOrganizer.onclick = () => {
            this.casseteTHIRD();
        };
    }

    casseteTHIRD() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/fix-organizer.png")';

        let message = `
            <p>Depois de instalar devidamente o Equipo Casseste, feche a porta do compartimento, lembrando de baixar a alavanca até a base e fixando o organizador em sua extensão superior, como mostrado na figura acima.</p>
            <p>Abra a embalagem que contém a extensão do Dreno e proceda da seguinte forma:</p>
            <ul>
                <li>- Pegue a "Linha do Dreno", ela é a linha branca do orgtanizador que contém o tampo chato e fica do lado direito;</li>
                <li>- Retire o tampo da "Linha do Dreno";</li>
            </ul>
            <p>Em seguida clique <button id="access-drain-extension">aqui</button> para continuar...</p>
        `;
        this.display.description("organizador de linhas", message);
        let buttonAccessDrainExtension = document.querySelector("#access-drain-extension");
        buttonAccessDrainExtension.onclick = () => {
            this.cassesteFOURTH();
        }
    }

    cassesteFOURTH() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/connect-drain-extension.png")';

        let message = `
            <p>Continuando a demonstração:</p>
            <ul>
                <li>- Retire o tampo da "Extensão";</li>
                <li>- Encaixe com firmeza na "Linha do Dreno".</li>
            </ul>
            <br>
            <p>Pronto, para retornar ao Painel Principal da Homechoice clique <button id="access-main-panel">aqui</button></p>
        `;
        this.display.description("extensão do dreno", message);
        let buttonAccessMainPanel = document.querySelector("#access-main-panel");
        buttonAccessMainPanel.onclick = () => {
            this.modules.TUTOR = false;
            this.modules.DISPLAY = true;
            let message = `
                <p>Muito bem, aperte o botão GO para continuar o procedimento.</p>
            `;
            this.display.description("painel do homechoice", message);
        }
    }

    bagsFIRST() {
        this.modules.DISPLAY = false;
        this.modules.TUTOR = true;

        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/connection--get-main-line.png")';

        let message = `
            <p>siga as seguintes instruções:</p>
            <ul>
                <li>- Instale o Clamp primeiro na bolsa que está no aquecedor;</li>
                <li>- Remova do Organizador o segmento do Equipo Cassete que tem a linha Vermelha;</li>
            </ul>
            <br>
            <p>Clique <button id="access-second-bag">aqui</button> para continuar.</p>
        `;
        this.display.description("tirar a linha do organizador", message);
        let buttonAccessSecondBag = document.querySelector("#access-second-bag");
        buttonAccessSecondBag.onclick = () => {
            // this.unbufferedDisplay();
            this.bagsSECOND();
        }

    }

    bagsSECOND() {
        this.timer.CURRENT = 3;
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/connection--main-line-connection.png")';

        let message = `
            <ul>
                <li>- Efetue a conexão do Equipo de linha Vermelha à Bolsa de Solução que está no aquecedor;</li>
                <li>- Instale as Bolsas adicionais no segmento do Equipo com linha Branca (não levar em consideração a linha do Dreno que também é Branca);</li>
            </ul>
            <p><strong>O segmento com linha Azul só deverá ser utilizado quando a concentração de glicose da última Bolsa for diferente</strong>.</p>
            <br>
            <p>Clique <button id="access-third-bag">aqui</button> para continuar.</p>
        `;
        this.display.description("conectar bolsas no equipo cassete", message);
        let buttonAccessThirdBag = document.querySelector("#access-third-bag");
        buttonAccessThirdBag.onclick = () => {
            // this.unbufferedDisplay();
            this.bagsTHIRD();
        }
    }

    bagsTHIRD() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/connection--lines-connected.png")';

        let message = `
            <ul>
                <li>- Abra os Clamps dos segmentos que estão conectados às Bolsas de Solução e à pinça da linha do paciente;</li>
                <li>- Depois de realizar os passos anteriores retornaremos ao display e basta apertar o botão GO;</li>
            </ul>
            <br>
            <p>Clique <button id="access-return-main">aqui</button> para retornar.</p>
        `;
        this.display.description("abrir clamps", message);
        let buttonAccessReturn = document.querySelector("#access-return-main");
        buttonAccessReturn.onclick = () => {
            this.timer.ON = this.timerMemo.ON;
            this.timer.LOOP = this.timerMemo.LOOP;
            this.timer.PAUSE = this.timerMemo.PAUSE;
            this.timer.CURRENT = this.timerMemo.CURRENT;

            this.modules.TUTOR = false;
            this.modules.DISPLAY = true;

            this.display.description("conectar bolsas", "<p>Aperte o botão GO para continuar...");
        }
    }

    options(duration) {
        this.display.live(this.menu[this.index]);
        
        if (this.buttons.UP) {
            this.index -= 1;
        }

        if (this.buttons.DOWN) {
            this.index += 1;
        }
    
        this.index = this.index < 0 ? this.menu.length - 1 : this.index > this.menu.length - 1 ? 0 : this.index;

        this.uncheckOptions();
        this.uncheckButtons();
    }

    enableTimer() {
        this.timer.ON = true;
        this.timer.CURRENT = this.timer.START;
    }

    disableTimer() {
        this.timer.ON = false;
        this.timer.DURATION = 0;
    }

    getPressedButton() {
        return Object.entries(this.buttons).filter((button) => button[1]).map((button) => button[0])[0];
    }
    
    uncheckButtons() {
        for (let button in this.buttons)
            this.buttons[button] = false;
    }

    checkOptions() {
        if (this.buttons.ENTER || this.buttons.UP || this.buttons.DOWN) {
            this.processMemo = this.process;
            this.process = this.proc.OPTIONS;

            for (let memo in this.timerMemo) this.timerMemo[memo] = this.timer[memo];
            
            this.timer.ON = true;
            this.timer.LOOP = false;
            this.timer.PAUSE = false;
            this.timer.CURRENT = this.timer.START;
        }
    }

    uncheckOptions() {
        if (this.buttons.STOP) {
            this.process = this.processMemo;
            for (let memo in this.timerMemo) this.timer[memo] = this.timerMemo[memo];
        }
    }

    goto(process) {
        this.process = process;
    }

    timerRESET() {
        this.timer.CURRENT = this.timer.START;
    }

    timerON() {
        this.timer.ON = true;
    }

    timerOFF() {
        this.timer.ON = false;
        this.timer.CURRENT = 0;
    }

    pauseON() {
        this.timer.PAUSE = true;
    }

    pauseOFF() {
        this.timer.PAUSE = false;
    }

    unbufferedDisplay() {
        this.display.live("");
        this.display.description("", "");
    }

    checkERROR(button, error) {
        if (button === this.getPressedButton()) console.error(error);
    }
}
