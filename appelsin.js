var missed = 0;

function appelsin() {
    this.x = 0;
    this.y = 550;
    this.rad = 20;
    this.xspeed = 4;
    this.yspeed = -10;
    this.newspeed = yspeed;
    this.grav = 0.1;
    this.col = [200, 100, 0];

    // Turbanen
    this.turban;

    // Øvrige
    this.tid = 20;
    this.score = 0;




    this.appelsin = function () {


        if (this.tid > 0) {
            this.tid -= 1;
        }
        if (this.tid < 100) {
            fill(this.col);
            ellipse(this.x, this.y, this.rad * 2, this.rad * 2);
        }

    }
    this.move = function () {
        //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    
        if (this.tid <= 0) {
           
            this.x += this.xspeed;
            this.y += this.yspeed;
            this.yspeed += this.grav;
        }
        if (this.x > width || this.y > height) {

            appelsiner.shift()
          missed += 1

        }
        if (this.y < 0) {
            this.yspeed *= -1;
        }
    }


}