/*
Først laver vi variabler til turbanen, Title, Tid, score, missede, om spillet er i gang og til multiplayer
*/

// Turbanen
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
=======
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (yspeed > 10) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            appelsin.shootNew();
           score += 1;
            appelsiner.shootNew();

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

