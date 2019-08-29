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
    }

    tegn() {

        if (keyIsDown(65)) { // A
            this.x = Math.max(this.x - this.speed, 0);
        }
        if (keyIsDown(68)) { // D
            this.x = Math.min(this.x + this.speed, width - this.bred);
        }
        fill(this.col);
        rect(this.x, this.y, this.bred, this.dyb);
    }

    grebet(x, y) {
        if ((y < this.y + this.dyb + rad && y > this.y + rad) && x > this.x + rad && x < this.x + this.bred - rad) {
            return true;
        }
        else {
            return false;
        }
    }
}

