/*
 * Dette script definerer klassen Kurv
*/
class Kurv {
    constructor(x, y, bredde, dybde, speed) {
        /* Den første del af funktionen er en "konstruktør".
         * Den tager parametrene og konstruerer et nyt objekt
         * ud fra dem. Værdierne huskes som hørende til netop
         * dette objekt ved hjælp af nøgleordet this
         */
        this.x = x;
        this.y = y;
        this.bred = bredde;
        this.dyb = dybde;
        this.speed = speed;
        this.col = [250, 230, 150];
        this.img = loadImage('turban.png');
    }

    tegn() {

        // sætter knapper til at gøre noget specielt
        if (keyIsDown(65)) { // A
            this.x = Math.max(this.x - this.speed, 0);
        }
        if (keyIsDown(68)) { // D
            this.x = Math.min(this.x + this.speed, width - this.bred);
        }

        // laver kurven
        fill(this.col);
        image(this.img, this.x, this.y, this.bred, this.dyb);
        //rect(this.x, this.y, this.bred, this.dyb);
    }

    //Tjekker om appelsinerne rammer kurven
    grebet(x, y) {
        if ((y < this.y + this.dyb + rad && y > this.y + rad) && x > this.x + rad && x < this.x + this.bred - rad) {
            return true;
        }
        else {
            return false;
        }
    }
}

