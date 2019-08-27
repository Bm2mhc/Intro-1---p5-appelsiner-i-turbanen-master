/*
 * Dette script definerer klassen Kurv
*/

function Kurv(x, y, bredde, dybde, speed) {
    /* Den første del af funktionen er en "konstruktør".
     * Den tager parametrene og konstruerer et nyt objekt 
     * ud fra dem. Værdierne huskes som hørende til netop 
     * dette objekt ved hjælp af nøgleordet this
     */
    
     //Skaber variablerne
    this.x = x;
    this.y = y;
    this.bred = bredde;
    this.dyb = dybde;
    this.speed = speed;
    this.col = [250,230,150];

    //tegner kurven
    img = loadImage('turban.png');
    this.tegn = function() {
        fill(this.col);
      //rect(this.x, this.y, this.bred, this.dyb);
        image(img, this.x, this.y, this.bred, this.dyb, 90);
    }

    //kurven bevæger sig med tasterne
    this.move = function(tast) {
        this.x = mouseX;
        this.y = mouseY;
    }

    //hvis den er grebet starter den forfra
    this.grebet = function(xa, ya, ra) {
        if ((ya < this.y+80 && ya > this.y-20) && xa > this.x+ra && xa < this.x+this.bred-ra) {
            return true;
        }
        else {
            return false;
        }
    }

} 