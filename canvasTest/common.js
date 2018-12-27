let canvas = document.querySelector('canvas');

canvas.width =  window.innerWidth-5;
canvas.height = window.innerHeight-5;

let c = canvas.getContext('2d');

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
//let minRadius = 5;

let colorArray = [
    '#2B3A42',
    '#3F5866',
    '#BDD3DE',
    '#F0F0DF',
    '#FF8F00',
];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;

    console.log(mouse);
});

window.addEventListener('resize', function(){
    canvas.width = (window.innerWidth-5);
    canvas.height = (window.innerHeight-5);
});

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth-5 || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
    
        if(this.y + this.radius > innerHeight-5 || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
     
        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
            if(this.radius < maxRadius){
                this.radius += 1;
            }
        } else if(this.radius > this.minRadius){
            this.radius -= 1;
        }

        this.draw();
    }

}

let circleArray = [];


for(let i = 0; i < 2000; i++){
    let radius = (Math.random() * 4) + 1;
    let x =  Math.floor(Math.random() * (innerWidth-5 - radius * 2) + radius);
    let y =  Math.floor(Math.random() * (innerHeight-5 - radius * 2) + radius);
    let dx = (Math.random() - 0.5) * 3,
        dy = (Math.random() - 0.5) * 3;

    circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth-5, innerHeight-5);
    for(let i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
}

animate();