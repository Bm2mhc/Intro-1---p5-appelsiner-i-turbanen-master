var x = 0;
var y = 550;
var rad = 20;
var xspeed = 4;
var yspeed = -10;
var newspeed;
var grav = 0.1;
var col = [200, 100, 0];
var missed = 0

// Turbanen
var turban;

// Øvrige
var tid = 150;
var score = 0;



function appelsin() {

    
this.appelsin = function () {
    if (tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        ellipse(x, y, rad * 2, rad * 2);
    }
}
    this.move = function(){
        //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
        if (tid <= 0) {
            x += xspeed;
            y += yspeed;
            yspeed += grav;
        }
        if (x > width || y > height) {
            missed += 1
            this.shootNew();
        }
        if (y < 0) {
            yspeed *= -1;
        }
        if (x > 750){
            xspeed *=-1
        }
    }

    this.shootNew =  function() {
        //Her skal vi sørge for at en ny appelsin skydes afsted 
        x = rad;
        y = random("550");
        yspeed = newspeed;
        xspeed = 6 * Math.random();
        tid = (int)(Math.random() * 400);


    }

}