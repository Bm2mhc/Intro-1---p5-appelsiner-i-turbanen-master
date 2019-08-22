/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
var x = 0;
var y = 550;
var rad = 20;
var xspeed = 4;
var yspeed = -10;
var newspeed = yspeed;
var grav = 0.1;
var col = [200, 100, 0];
var missed = 0
var header;
var spill = true;
var buttion;


// Turbanen
var turban;

// Øvrige
var score = 0;
var missed = 0;
var appelsiner = [];

function setup() {
    header = createElement('h1', 'Appelsiner i turban')
    createCanvas(750, 600);
    newspeed = yspeed;
    x = rad;
    turban = new Kurv(670, 100, 70, 50, 10);
    appelsiner.push(new appelsin(670, 100, 70, 50, 10));
    //
    setInterval(function () {
        appelsiner.push(new appelsin(670, 100, 70, 50, 10))
    }, 3000);
}

function draw() {

  

    if (spill) {
        background(0);
        for (var i = 0; i < appelsiner.length; i++) {

            appelsiner[i].move();
            appelsiner[i].appelsin();


        }
        checkScore();
        display();
        turban.move();
    } else {

        document.getElementById('status').innerHTML = 'Game Over';
        button = createButton('Genstart');
        button.position(310, 375);
        button.mousePressed(restartGame);
    }

    if (missed < 1) {
        spil = false;
    }

}

function restartGame() {
    location.reload();
}

function display() {
    fill(255);
    text("Score: " + score, width - 80, 30);
    fill(255)
    text("Missed: " + missed, width - 80, 50);

    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises


    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (yspeed > 10) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            appelsiner.shift()
        }
    }
    for (var i = 0; i < appelsiner.length; i++) {

        if (turban.grebet(appelsiner[i].x, appelsiner[i].y, appelsiner[i].rad)) {
            score += 1;
            appelsiner.shift()
        }

        if (x > 750 || y > 600){
            missed += 1;
            appelsiner.shift();
        }

    }

}



function keyPressed() {

}

function mousePressed() {

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