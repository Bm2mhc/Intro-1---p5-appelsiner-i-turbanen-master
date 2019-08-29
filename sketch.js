/*
Først laver vi variabler til turbanen, Title, Tid, score, missede, om spillet er i gang og til multiplayer
*/

// Turban variable
var turban;

// Header/Title variable
var header;

// Øvrige
var tid = 10;
var score = 0;
var missed = 0;
var spil = true;
var knap;

//laver Appelsin arrayed
var appelsiner = [];

//laver variablen til socket
var socket;

function setup() {


    if (spil) {
        var status = document.getElementById('status');
        status.innerHTML = 'Lorte spillet er i gang';
        createCanvas(windowWidth, windowHeight);
        header = createElement('h1', 'Appelsiner i turban')
        x = rad;
        turban = new Kurv(windowWidth / 2, windowHeight - 100, 150, 50, 10);

        if (confirm('Vil du joine et igangværende spil?')) {
            var pin = prompt('Pin:');
            socket = ElineSocket.connect(pin);
        } else {
            socket = ElineSocket.create();
        }
        socket.onMessage(handleMessage);
    } else {
        document.getElementById('status').innerHTML = 'Du tabte';
        status.createButton('Restart?')
        status.position(windowWidth/2, windowHeight/2);
        status.mousePressed(Genstartspillet);
        

    }
    if (missed > 3 ){
        spil = false;
    }
}

function Genstartspillet() {
    location.reload();
}

function handleMessage(msg) {
    switch (msg.type) {
        case 'shootNew':
            shootNew(msg.x);
            break;
        default:
            console.log('Unknown message', msg);
    }
}

function shootNew(x) {
    //Her skal vi sørge for at en ny appelsin skydes afsted
    const dx = 6 * Math.random();
    const dy = -15 * Math.random();
    appelsiner.push(new Appelsin(x, dx, dy));
}

function move() {
    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];

        if (appelsin.isOutOfBounds()) {
            appelsiner.splice(i, 1);
            i--;
        } else {
            appelsin.move();
        }
        if (appelsin.y > windowHeight){
            missed += 1;
            appelsiner.splice(i, 1);
        }
    }
}

function checkScore() {
    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];
        if (appelsin.dy > 0) {
            if (turban.grebet(appelsin.x, appelsin.y)) {
                score += 1;
                appelsiner.splice(i, 1);
                i--;
            }
        }
    }
}

function display() {
    background(0);

    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];
        appelsin.display();
    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();

    fill(255)
    text("Score: " + score, width - 80, 30);
    text("Pin: " + socket.id, width - 80, 60);
    text("Missed: " + missed, width - 80, 90);
}

function draw() {

    if (spil) {
 
    background(0);
    move();
    checkScore();
    display();

    }else{
     
        document.getElementById('status').innerHTML = 'Game Over';
        knap = createButton('Genstart spil');
        knap.position(300, 325);
        knap.mousePressed(restartGame);
    }
    if (missed > 2){
        spil = false;
    }


}

function mouseClicked() {
    socket.sendMessage({
        type: 'shootNew',
        x: mouseX,
    });
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om.

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe
            på venstre kan appelsinerne starter. Overvej om man kan
            sikre, at appelsinen ikke ryger ud af skærmens top men
            stadig har en "pæn" bane

 Opgave 3 - lav programmet om så man også kan bevæge turbanen mod
            højre og venstre med A- og D-tasterne. Prøv jer frem med
            forskellige løsninger for hvor hurtigt turbanen skal rykke

 Opgave 4 - ret programmet til, så det også angives hvor mange
            appelsiner man IKKE greb med turbanen

 Opgave 5 - Undersøg hvad scriptet  kurv.js  er og gør, samt hvad de
            funktioner, scriptet indeholder, skal bruges til. Skriv
            det som kommentarer oven over hver funktion. Forklar tillige,
            hvad sammenhængen mellem dette script og turbanen i hoved-
            programmet er, og forklar det med kommentarer i toppen af
            kurv.js

 Opgave 6 - find et billede af en turban og sæt det ind i stedet
            for firkanten. Find eventuelt også en lyd, der kan afspilles,
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan,
            hvis ikke I kan huske det:   https://p5js.org/reference/
            Lav programmet om, så man kan flytte turbanen med musen

 Opgave 7 - lav en Appelsin-klasse, lige som der er en Kurv-klasse.
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, oghvilke variabler og funktioner,
            der skal lægges over i det nye script, herunder hvordan det
            kommer til at berøre turbanen. Skriv jeres overvejelser i
            kommentarerne

 Opgave 8 - ret programmet til, så der kan være flere appelsiner i
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan
            og hvor hurtigt de skal skydes af, og forklar jeres tanker
            i kommentarerne

 Opgave 9 - ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for
            at der vises en "Game Over"-skærm, som fortæller om man
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil.

*/