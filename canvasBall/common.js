let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let gravity = 1;
let friction = 0.70;
let colorArray = [
    '#4A545F',
    '#F25652',
    '#330136',
    '#B27535',
    '#613FD1',
];

addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
})

addEventListener('click', () => {
    init();
})

function randomIntFromRange(min, max){
    return Math.floor(Math.random() * ( max - min + 1) + min);
}

function randomColor(colorArray){
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function Ball(x, y, dx, dy,radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = randomColor(colorArray);

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
    }

    this.update = function(){
        if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius + this.dy > canvas.height){
            this.dy = -this.dy * friction;  
        } else{
            this.dy += gravity;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

let ballArray ;

function init(){
    ballArray = [];

    for(let i = 0; i < 100; i++){
        let radius = randomIntFromRange(10, 30);
        let dx = randomIntFromRange(-2, 2);
        let dy = randomIntFromRange(-2, 2);
        let x = randomIntFromRange(radius, canvas.width - radius);
        let y = randomIntFromRange(radius, canvas.height - radius);
        
        ballArray.push(new Ball(x, y, dx, dy, radius));
    }
}



function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);
    for(let i = 0; i < ballArray.length; i++){
        ballArray[i].update();
    }
}

// let ball = new Ball(200,200,4,50,'blue');

init();
animate();