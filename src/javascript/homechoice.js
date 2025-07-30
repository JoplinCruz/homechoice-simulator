
class HomeChoice extends States {

    #error = {
        GO: { 1: "por favor espere...", },
        STOP: { 2: "não é possível parar." },
        ENTER: { 3: "aceddo não permitido" },
        UP: { 4: "acesso não permitido" },
        DOWN: { 5: "acesso não permitido" },
    };
    
    /**
     * 
     * @param {Display} display 
     * @param {{ homePanel, homePower, homeCassete, homeConnections, homeTutor }} panels 
     * @param {Timer} clock 
     */
    constructor(display, panels, clock) {
        super();
        this.display = display;
        this.panels = panels;
        this.clock = clock;
        this.process = this.proc.INIT;
        this.memory = {
            process: null,
            error: { origin: null, code: null },
        };
        this.menu = [
            { title: "drenagem inicial", value: () => { return 2000 + (Math.random() * 600) >> 0; } },
            { title: "ult. drenag. man.", value:() => { return 2000 + (Math.random() * 600) >> 0; } },
            { title: "uf total", value: () => { return 1000 + (Math.random() * 600) >> 0; } },
            { title: "perman. média", value: () => { return (7 * 60) + (Math.random() * 120) >> 0; } },
            { title: "t. perm. perdido", value: () => { return 1000 + (Math.random() * 600) >> 0; } },
            { title: "t. perm. ganho", value: () => { return 1000 + (Math.random() * 600) >> 0; } },
        ]
        this.index = 0;
    }

    init(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0) {
            this.clock.setCurrent(1);
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
            this.clock.on();
            this.clock.restart();
        }

        this.uncheckButtons();
    }

    start(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0) {
            this.display.live(""); 
            let text = `
                <p>Inicializando o sistema...</p>
                <br>
                <p>Aguarde até estar pronto.</p>
            `
            this.display.description("homechoice", text);    
        }

        if (this.clock.current() === 3)
            this.display.live("█", "left");

        if (this.clock.current() === 15)
            this.display.live("██████████████████████");

        if (this.clock.current() === 90)
            this.display.live("");

        if (this.clock.current() === 120)
            this.display.live("por favor espere...");

        if (this.clock.current() >= 210) {
            this.display.live("aperte go p/ iniciar");
            let text = `
                <p>Pressione o botão GO para continuar...</p>
            `
            this.display.description("homechoice", text);
        }

        if (this.clock.current() < 210) this.checkERROR("GO", 1);
        
        if (this.clock.current() >= 210) {
            if (this.buttons.GO) {
                this.goto(this.proc.CASSETE);
                this.clock.off();
                this.clock.reset("CURRENT");
                this.display.clear();
            }
            this.checkOptions();
        }

        this.uncheckButtons();
    }

    cassete(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0) {
            this.clock.setCurrent(1);
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

        if (this.clock.current() === 1) {
            this.display.live("inserir cassete");
            if (this.buttons.GO) this.clock.setCurrent(2);
            this.uncheckButtons();
        }

        if (this.clock.current() >= 2) {
            this.clock.on();
            this.display.live("auto teste");

            if (this.clock.current() === 2) {
                let message = `
                    <p>Iniciado o Auto Teste...</p>
                    <p>Pegue a extremidade da "Linha do Dreno" e leve até o ponto de despejo (ralo do banheiro)</p>
                    <p>Nesse momento é extremamente importante que <strong>lave as mãos</strong> usando a técnica hospitalar.</p>
                    <p>Lembre-se desse importante cuidado, uma vez que será necessário o manuseio com partes sensíveis no procedimento, tais como as <strong>Bolsas de Solução</strong> e o <strong>Equipo do paciente</strong>.</p>
                `;
                this.display.description("homechoice auto teste", message);
            }
            if (this.clock.current() === 210) {   // 1800
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
                    this.clock.save();
                    this.clock.restart();
                    this.display.clear();
                }
            }

        }

        if (this.clock.current() >= 9000) {
            this.goto(this.proc.BAGS);
            this.display.clear();
            this.clock.restart();
        }
        
        if (this.clock.current() !== 1) this.checkERROR("GO", 1);
        this.checkERROR("STOP", 2);
        this.uncheckButtons();
    }

    bags(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        let seconds = this.clock.seconds();

        if (this.clock.current() === 0) {
            this.clock.loop(1, 60);

            let message = `
                <p>Logo após o Auto Teste a mensagem "Conectar Bolsas" alternada com "Abrir Clamps" aparecerá no display. Isso significa que é preciso connectar as linhas do segmento do Equipo às bolsas de solução e depois retirar o clamp que foi previamente fixado.</p>
                <p>Vamos lá, o passo a passo desse procedimento é bem simples, clique <button id="access-bag-connection">aqui</button> para acompanhar.</p> 
            `;
            this.display.description("conectar bolsas", message);
            let buttonAccessBagConnection = document.querySelector("#access-bag-connection");
            buttonAccessBagConnection.onclick = () => {

                this.clock.save();
                this.clock.resetAll();
                this.clock.restart();
                this.clock.off();
                
                this.bagsFIRST();
            }
        }        
        
        if (this.clock.current() >= 0 && this.clock.current() < 60) {
            if (seconds % 2 === 0)
                this.display.live("conectar bolsas...");
            else
                this.display.live("abrir clamps...");
        }

        if (this.clock.current() > 60) {
            this.display.live("preenchendo linhas...");
            if (this.clock.current() === 61) {
                let message = `
                    <p>Agora é preciso aguardo até que todas as linhas sejam preenchidas com a Solução.</p>
                    <p>Quando todos os seguimentos estiverem preenchidos a frase no visor mudará para CONECTE-SE</p>
                `;
                this.display.description("preenchimento das linhas", message);
            }
            if (this.clock.current() === 210) {
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
                    this.clock.restart();

                    this.display.clear();
                }
            }
        }

        if (this.clock.current() > 12600) {
            this.goto(this.proc.CONNECT);
            this.clock.restart();
            this.display.clear();
        }
        
        if (this.buttons.GO && !this.clock.states().LOOP) this.checkERROR("GO", 1);

        if (this.buttons.GO && this.clock.states().LOOP) {
            this.clock.loop();
            this.clock.setCurrent(60);
        }

        this.checkERROR("STOP", 2);
        this.uncheckButtons();
    }

    connect(duration) {

        let seconds = this.clock.seconds();

        if (this.clock.current() >= 0) {
            if (seconds % 2 === 0) {
                this.display.live("conecte-se...");
            } else {
                this.display.live("verificar linha...")
            }
                
            if (this.clock.current() === 0) {
                let message = `
                    <p>A Homechoice já está pronta para começar a DPA (Diálise Peritonial Automatizada), agora é só conectar com o paciente...</p>
                    <p>Mas espere um momento, antes de fazer isso vamos conferir o passo a passo.</p>
                    <p>Uma boa prática é sempre verificar se a Linha do Paciente está preenchida.</p>
                    <p>Clique <button id="access-patient-first">aqui</button> para acompanhar o procedimento...</p>
                `;

                this.display.description("conectar o paciente ao sistema", message);
                
                let buttonAccessConnectToPatient = document.querySelector("#access-patient-first");
                buttonAccessConnectToPatient.onclick = () => {
                    this.clock.save();
                    this.clock.off();
                    this.clock.restart();
                    this.patientFIRST();
                }
            }
        }

        if (this.buttons.GO) {
            this.goto(this.proc.DRAIN);
            this.clock.resetAll();
            this.clock.restart();
            this.clock.on();
            this.display.clear();
        }

        this.checkERROR("STOP", 2);
        this.uncheckButtons();
    }

    drain(duration) {
        this.clock.setDuration(duration * this.clock.framerate);

        if (this.clock.current() >= 0) {
            this.display.live("drenagem inicial");
            if (this.clock.current() === 0) {
                let message = `
                    <p>A terapia DPA (Diálise Peritonial Automatizada) iniciou e terminará em aproximadamente 8 horas.</p>
                    <p>Nesse intervalo é aconselhado que o paciente durma.</p>
                    <p>Se houver alguma intercortrência, como queda de energia, o sistema alertará e mostrará no visor o código do error ocorrido, caso não consiga continuar a terapia é necessário anotar, além do código de erro os demais registros da terapia.</p>
                `;
                this.display.description("início da terapia", message);
            }

            if (this.clock.current() === 210) {
                let message = `
                    <p>A terapia DPA (Diálise Peritonial Automatizada) iniciou e terminará em aproximadamente 8 horas.</p>
                    <p>Nesse intervalo é aconselhado que o paciente durma.</p>
                    <p>Se houver alguma intercortrência, como queda de energia, o sistema alertará e mostrará no visor o código do error ocorrido, caso não consiga continuar a terapia é necessário anotar, além do código de erro os demais registros da terapia.</p>
                    <br>
                    <p>A título educativo o simulador permite que você possa seguir para o término da terapia clicando <button id="access-procedural-finish">aqui</button>.</p>
                `;
                this.display.description("início da terapia", message);
                let buttonAccessProceduralFinish = document.querySelector("#access-procedural-finish");
                buttonAccessProceduralFinish.onclick = () => {
                    this.goto(this.proc.DISCONNECT);
                    this.clock.resetAll();
                    this.clock.on();
                    this.clock.restart();
                };
            }
        }
        
        this.checkERROR("GO", 1);
        this.checkERROR("STOP", 2);
        this.uncheckButtons();
    }
    
    infund(duration) { }

    disconnect(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0) {
            this.clock.pause();
            this.display.live("termine a terapia");
            let message = `
                <p>Chegamos ao final da terapia, mas antes de continuar é importante verificar e anotar todas as informações dos registro da Homechoice:</p>
                <br>
                <ul>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   DRENAGEM INICIAL;</pre><br></li>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   ULT. DRENAG. MAN.;</pre><br></li>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   UF TOTAL;</pre><br></li>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   PERMAN. MÉDIA;</pre><br></li>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   T. PERM. GANHO;</pre><br></li>
                    <li>- Aperte a Seta Azul para baixo e anote:<br><pre>   T. PERM. PERDIDO.</pre><br></li>
                </ul>
                <br>
                <p>Após você ter revisto suas anotações aperte o botão GO (Verde).</p>
            `;
            this.display.description("termine a terapia", message);
        }

        if (this.clock.current() >= 1 && this.clock.current() < 60) {
            if (this.clock.seconds() % 2 === 0) {
                this.display.live("fechar clamps...");
            } else {
                this.display.live("desconecte-se");
            }
        }

        
        if (this.buttons.GO && this.clock.states().LOOP) {
            this.goto(this.proc.SHUTDOWN);
            
            this.display.clear();
            this.clock.resetAll();
            this.clock.on();
            this.clock.restart();
        }

        if (this.buttons.GO && this.clock.states().PAUSE) {
            let message = `
                <p>Agora você deve fechar todos os clamps das Linhas de Solução (equipo cassete homechoice) e o Twist Clamp do equipo de transferência (paciente)</p>
                <p>Clique <button id="access-disconnect-first">aqui</button> para acompanhar o processo de desligamento</p>
                <br>
                <p>Se você já conhecer o procedimento e quiser continuar basta apertar o botão GO.</p>
            `;
            this.display.description("fechar os clamps e desconectar-se", message);
            let buttonAccessDisconnectFirst = document.querySelector("#access-disconnect-first");
            buttonAccessDisconnectFirst.onclick = () => {
                this.disconnectFIRST();
            };
            
            this.clock.play();
            this.clock.loop(1, 60);
            this.clock.on();
        }

        this.checkERROR("STOP", 2);
        this.checkOptions();
        this.uncheckButtons();
    }

    shutdown(duration) {
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0) {
            this.display.live("desligue-me");
            let message = `
                <p>Muito bem, queremos parabenizar você que chegou até aqui e concluiu com êxito mais uma sessão de terapia com a Homechoice, sabemos das dificuldades para memorizar cada passo do procedimento e por isso desenvolvemos esse sistema, para que você possa por em prática o seu conhecimento e se aperfeiçoar no seu próprio tratamento ou de seu ente querido.</p>
                <br>
                <p>Para finalizar clique <button id="access-power-off">aqui</button> e acesse o botão de LIGAR / DESLIGAR.</p>
            `;
            this.display.description("desligar o sistema", message);
            let buttonAccessPowerOFF = document.querySelector("#access-power-off");
            buttonAccessPowerOFF.onclick = () => {
                homeButtonOnIMG.style.display = "";
                homeButtonOffIMG.style.display = "none";
                this.powerOFF();
            };
        }
    }

    interruption(duration) { }

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

    powerOFF() {
        this.modules.DISPLAY = false;
        this.modules.POWER = true;

        let message = `
            <p>Agora que chegamos ao final da terapia DPA (Diálise Peritonial Automática) podemos desligar o sistema.</p>
            <br>
            <p>Para encerrar o sistema Homechoice aperte o botão <strong>LIGAR / DESLIGAR</strong> (I/O).</p>
        `;

        this.display.description("homechoice power suply", message);

        buttonPOWER.onclick = () => {
            homeButtonOffIMG.style.display = "";
            homeButtonOnIMG.style.display = "none";
            setTimeout(() => {
                this.goto(this.proc.INIT)
                this.modules.POWER = false;
                this.modules.DISPLAY = true;
                this.power.ON = false;

                this.clock.resetAll();
                this.display.clear();
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
            <p>Mova a alavanca até o topo da porta para abrir o compartimento do Equipo Cassete.</p>
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
                    touchY = pageY - touchMoveEvent.touches[0].clientY;
                
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
            <p>Depois de instalar devidamente o Equipo Casseste, feche a porta do compartimento, lembrando de baixar a alavanca até a base, depois fixe o organizador em sua extensão superior, como mostrado na figura acima.</p>
            <p>Abra a embalagem que contém a extensão do Dreno e proceda da seguinte forma:</p>
            <ul>
                <li>- Pegue a "Linha do Dreno", ela é a linha branca do orgtanizador que contém o tampo chato e fica do lado direito;</li>
                <li>- Retire o tampo da "Linha do Dreno";</li>
            </ul>
            <p>Clique <button id="access-drain-extension">aqui</button> para continuar...</p>
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
            this.bagsSECOND();
        }

    }

    bagsSECOND() {
        this.clock.setCurrent(3);
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
            this.clock.load();

            this.modules.TUTOR = false;
            this.modules.DISPLAY = true;

            this.display.description("conectar bolsas", "<p>Aperte o botão GO para continuar...");
        }
    }

    patientFIRST() {
        this.modules.DISPLAY = false;
        this.modules.TUTOR = true;

        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/patient--get-out.png")';

        let message = `
            <ul>
                <li>- Deixe o Equipo de transferência fora da veste do paciente;</li>
                <li>- Certifique-se de que o "Twist Clamp" esteja fechado.</li>
            </ul>
            <p>Clique <button id="access-patient-second">aqui</button> para continuar.</p>
        `;
        this.display.description("preparar o equipo de transferência", message);
        let buttonAccessPatientSecond = document.querySelector("#access-patient-second", message);
        buttonAccessPatientSecond.onclick = () => {
            this.patientSECOND();
        }
    }

    patientSECOND() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/patient--wash-hands.png")';

        let message = `
            <ul>
                <li>- Mantenha a máscar (essa medida deve ser adotada durante todo o processo);</li>
                <li>- Lave as mãos novamente com água e sabão seguindo a técnica hospitalar (e sempre que tocar em superfície não estéril).</li>
            </ul>
            <p>Clique <button id="access-patient-third">aqui</button> para continuar.</p>
        `;
        this.display.description("manter a máscara e lavar as mãos", message);
        let buttonAccessPatientThird = document.querySelector("#access-patient-third");
        buttonAccessPatientThird.onclick = () => {
            this.patientTHIRD();
        }
    }

    patientTHIRD() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/patient--connect-line.png")';

        let message = `
            <ul>
                <li>- Conecte a Linha do Paciente ao Equipo de Transferência.</li>
            </ul>
            <p>Após a conexão você deve abrir a pinça do Equipo de Transferência (Equipo do Homecholice) e certificar-se que o "Twist Clamp" (Equipo do paciente) esteja aberto.</p>
            <br>
            <p>Clique <button id="access-return-connect">aqui</button> para continuar.</p>
        `;
        this.display.description("connectar a linha do paciente ao equipo de transferência", message);
        let buttonAccessReturnConnect = document.querySelector("#access-return-connect");
        buttonAccessReturnConnect.onclick = () => {
            this.clock.load();
            this.modules.TUTOR = false;
            this.modules.DISPLAY = true;
            this.display.description("conectar o paciente ao sistema", "<p>Muito bem agora aperte o botão GO para dar início ao DPA.</p>");
        }
    }

    disconnectFIRST() {
        this.modules.DISPLAY = false;
        this.modules.TUTOR = true;

        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/patient--wash-hands.png")';

        let message = `
            <p>Para a desconexão do paciente é importante lembrar de colocar a máscara e lavar as mãos com técnica hospitalar.</p>
            <br>
            <p>Clique <button id="access-disconnect-second">aqui</button> e continue.</p>
        `;
        this.display.description("desconectando o paciente", message);
        let buttonAccessDisconnectSecond = document.querySelector("#access-disconnect-second");
        buttonAccessDisconnectSecond.onclick = () => {
            this.disconnectSECOND();
        };
    }

    disconnectSECOND() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/disconnect-cap.png")';

        let message = `
            <p>Abra a embalagem do novo Protetor de desconexão (MiniCap) e verifique a integridade.</p>
            <br>
            <p>Clique <button id="access-disconnect-third">aqui</button> e continue.</p>
        `;
        this.display.description("desconectando o paciente", message);
        let buttonAccessDisconnectSecond = document.querySelector("#access-disconnect-third");
        buttonAccessDisconnectSecond.onclick = () => {
            this.disconnectTHIRD();
        };
    }

    disconnectTHIRD() {
        this.panels.homeTutor.style.backgroundImage = 'url("./src/images/disconnect-equipo.png")';

        let message = `
            <p>agora seguiremos os seguintes passos:</p>
            <br>
            <ul>
                <li>- Cheque se todas as pinças estão fechadas, incluindo o "Twist Clamp" do "Equipo do Transferência" (paciente);</li>
                <li>- Desconecte o "Equipo de Transferência" (paciente) da linha do paciente do "Equipo Cassete" (Homechoice);</li>
                <li>- Instale imediatamente o protetor de desconexão (MiniCap) no Equipo de Transferência (paciente);</li>
                <li>- Abra a porta do compartimento do Equipo Cassete empurrando a alavanca para cima;</li>
                <li>- Retire o Equipo Cassete do sistema e despreze;</li>
                <li>- Descarte todas as bolsa de solução conforme as normas de segurança sanitária;</li>
            </ul>
            <br>
            <p>Clique <button id="access-disconnect-return">aqui</button> retornar ao procedimento.</p>
        `;
        this.display.description("desconectando o paciente", message);
        let buttonAccessDisconnectReturn = document.querySelector("#access-disconnect-return");
        buttonAccessDisconnectReturn.onclick = () => {
            this.modules.TUTOR = false;
            this.modules.DISPLAY = true;
            
            let message = `
                <p>Agora que você desconectou o paciente e retirou os descartes pode prosseguir para a etapa de desligamento apertando o botão GO.</p>
            `;
            this.display.description("fechar os clamps e desconectar-se", message);
        };
    }

    options(duration) {
        let title = this.results[this.index].title + ":";
        let value = this.results[this.index].value.toString();
        let spaces = 22 - (title.length + value.length);

        let text = title + " ".repeat(spaces) + value;
        
        if (this.clock.current() === 0) {
            this.clock.setCurrent(1);
            this.display.live(text);
        }
        
        if (this.buttons.UP) {
            if (this.index === 0) this.buttons.STOP = true;
            this.clock.setCurrent(0);
            this.index -= 1;
        }

        if (this.buttons.DOWN) {
            this.clock.setCurrent(0);
            this.index += 1;
        }
    
        this.index = this.index < 0 ? 0 : this.index > this.menu.length - 1 ? this.menu.length - 1 : this.index;

        this.uncheckOptions();
        this.uncheckButtons();
    }

    getPressedButton() {
        return Object.entries(this.buttons).filter((button) => button[1]).map((button) => button[0])[0];
    }
    
    uncheckButtons() {
        for (let button in this.buttons)
            this.buttons[button] = false;
    }

    checkOptions() {
        if (this.buttons.ENTER || this.buttons.DOWN) {
            this.memory.process = this.process;
            this.process = this.proc.OPTIONS;

            this.results = [];
            for (let item of this.menu) {
                this.results.push(
                    { title: item.title, value: item.value() }
                );
            }

            this.display.save();
            this.clock.save();
            this.clock.resetAll();
            this.clock.off();
        }
    }

    uncheckOptions() {
        if (this.buttons.STOP) {
            this.process = this.memory.process;
            this.display.load("command");
            this.clock.load();
        }
    }

    getProcess() {
        return this.process;
    }

    goto(process) {
        this.process = process;
    }

    unbufferedDisplay() {
        this.display.live("");
        this.display.description("", "");
    }

    error(duration) {
        duration = duration ?? 2;
        this.clock.setDuration(duration * this.clock.framerate());

        if (this.clock.current() === 0)
            this.display.live(this.#error[this.memory.error.origin][this.memory.error.code]);

        if (this.clock.current() === this.clock.getDuration()) {
            this.goto(this.memory.process);
            this.clock.load();
            this.display.load("command");
        }
    }

    checkERROR(button, code) {
        if (this.buttons[button]) {
            this.uncheckButtons();

            this.display.save();

            this.clock.save();
            this.clock.resetAll();
            this.clock.restart();
            this.clock.on();
            
            this.memory.process = this.getProcess();
            this.memory.error.origin = button;
            this.memory.error.code = code;

            this.goto(this.proc.ERROR);
        }
    }
}
