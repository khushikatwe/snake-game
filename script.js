const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

let box = 20;
let snake = [{ x: 9 * box, y: 9 * box }];
let food = {
  x: Math.floor(Math.random() * 19) * box,
  y: Math.floor(Math.random() * 19) * box
};
let direction = null;

document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "down") direction = "up";
  if (event.key === "ArrowDown" && direction !== "up") direction = "down";
  if (event.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (event.key === "ArrowRight" && direction !== "left") direction = "right";
});

function draw() {
  ctx.clearRect(0, 0, 400, 400);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  ctx.fillStyle = "lime";
  for (let s of snake) {
    ctx.fillRect(s.x, s.y, box, box);
  }

  // Move the snake
  let head = { ...snake[0] };
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;
  if (direction === "left") head.x -= box;
  if (direction === "right") head.x += box;

  // Eat food
  if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * 19) * box,
      y: Math.floor(Math.random() * 19) * box
    };
  } else {
    snake.pop();
  }

  snake.unshift(head);

  // Game over
  if (
    head.x < 0 ||
    head.x >= 400 ||
    head.y < 0 ||
    head.y >= 400 ||
    snake.slice(1).some(s => s.x === head.x && s.y === head.y)
  ) {
    alert("Game Over!");
    document.location.reload();
  }
}

setInterval(draw, 150);
