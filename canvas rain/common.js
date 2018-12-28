let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * (max- min + 1) + min);
}

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})


function Rain(x, y, w, h, rainSpeed){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.rainSpeed = rainSpeed;

    this.draw = function(){
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    this.update = function(){
        if(this.y - this.h > innerHeight){
            this.y = -5 ;
            this.x = randomIntFromRange(0, innerWidth);
        }
        this.y += rainSpeed;
        this.draw();
    }
}

let arryRain;

function init(){
    arryRain = [];
    
    for(let i = 0; i < 5000; i++){
        let x = randomIntFromRange(0, innerWidth);
        let y = randomIntFromRange(0, innerHeight);
        let w = 1;
        let h = randomIntFromRange(5,7);
        let rainSpeed = randomIntFromRange(10,15);

        arryRain.push(new Rain(x, y, w, h, rainSpeed))
    }
}


function animation(){
    requestAnimationFrame(animation);
    ctx.clearRect(0,0,innerWidth, innerHeight);
    for(let i = 0; i < arryRain.length; i++){
        arryRain[i].update();
    }
}
init();
animation();