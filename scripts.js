const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const canvasHeight = document.body.clientHeight - 5;
const canvasWidth = document.body.clientWidth - 5;
ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;

const balls = [];

let numberOfBalls = 6;

for (let i = 0; i < numberOfBalls; i++) {
  let ball = new Ball(canvasWidth, canvasHeight, i);
  balls.push(ball);
}

const draw = () => {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < balls.length; i++) {
    ctx.beginPath();
    ctx.arc(balls[i].pos.x, balls[i].pos.y, balls[i].size, 0, 2 * Math.PI);
    ctx.fillStyle = balls[i].color;
    ctx.fill();

    // draw + or -
    if (balls[i].status === 1) {
      ctx.beginPath();
      ctx.lineWidth = balls[i].size / 10;
      ctx.strokeStyle = balls[i].statusColor;
      ctx.moveTo(
        balls[i].pos.x,
        balls[i].pos.y - balls[i].size + balls[i].size / 2
      );
      ctx.lineTo(
        balls[i].pos.x,
        balls[i].pos.y + balls[i].size - balls[i].size / 2
      );
      ctx.moveTo(
        balls[i].pos.x - balls[i].size + balls[i].size / 2,
        balls[i].pos.y
      );
      ctx.lineTo(
        balls[i].pos.x + balls[i].size - balls[i].size / 2,
        balls[i].pos.y
      );
      ctx.stroke();
      ctx.closePath();
    }
    if (balls[i].status === 0) {
      ctx.beginPath();
      ctx.lineWidth = balls[i].size / 10;
      ctx.strokeStyle = "black";
      ctx.moveTo(
        balls[i].pos.x - balls[i].size + balls[i].size / 2,
        balls[i].pos.y
      );
      ctx.lineTo(
        balls[i].pos.x + balls[i].size - balls[i].size / 2,
        balls[i].pos.y
      );
      ctx.stroke();
      ctx.closePath();
    }
    balls[i].move();

    balls.forEach((b) => {
      balls[i].checkCollision(b);
    });

    // //add velocity to move.
    // balls[i].pos.x += balls[i].velocity.x;
    // balls[i].pos.y += balls[i].velocity.y;

    // // if ball is created or goes outside of canvas walls it gets put back to canvas wall
    // // and it's velocity is reversed to create change of direction after hitting wall.
    // if (balls[i].pos.x >= canvasWidth - balls[i].size) {
    //   balls[i].pos.x = canvasWidth - balls[i].size - 5;
    //   balls[i].velocity.x *= -1;
    //   // ball.acceleration.x *= -0.1;
    // }
    // if (balls[i].pos.x <= 0 + balls[i].size) {
    //   balls[i].pos.x = 0 + balls[i].size + 5;
    //   balls[i].velocity.x *= -1;
    // }

    // if (balls[i].pos.y >= canvasHeight - balls[i].size) {
    //   balls[i].velocity.y *= -1;
    //   balls[i].pos.y = canvasHeight - balls[i].size - 5;
    //   // ball.acceleration.y *= -0.1;
    // }
    // if (balls[i].pos.y <= 0 + balls[i].size) {
    //   balls[i].velocity.y *= -1;
    //   balls[i].pos.y = 0 + balls[i].size + 5;
    // }

    // let collision = false;
    // // check distance between balls
    // for (let j = 0; j < balls.length; j++) {
    //   if (j != i) {
    //     const distance = Math.sqrt(
    //       Math.pow(balls[i].pos.x - balls[j].pos.x, 2) +
    //         Math.pow(balls[i].pos.y - balls[j].pos.y, 2)
    //     );
    //     if (distance < balls[i].size || distance < balls[j].size) {
    //       collision = true;
    //     }
    //   }
    // }
  }

  requestAnimationFrame(draw);
};
draw();
requestAnimationFrame(draw);
