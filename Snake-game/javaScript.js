const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

let snake = [];
snake[0] = {
	x: 80,
	y: 0,
};
snake[1] = {
	x: 60,
	y: 0,
};
snake[2] = {
	x: 40,
	y: 0,
};
snake[3] = {
	x: 20,
	y: 0,
};

let d = "Right"; //初始方向

//透過方向鍵操控蛇的位置
window.addEventListener("keydown", changeDirection);
function changeDirection(e) {
	if (e.key == "ArrowRight" && d != "Left") {
		d = "Right";
	} else if (e.key == "ArrowDown" && d != "Up") {
		d = "Down";
	} else if (e.key == "ArrowLeft" && d != "Right") {
		d = "Left";
	} else if (e.key == "ArrowUp" && d != "Down") {
		d = "Up";
	}
}

function draw() {
	//畫布
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	//蛇
	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {
			ctx.fillStyle = "red";
		} else {
			ctx.fillStyle = "lightblue";
		}
		ctx.strokeStyle = "white";

		//穿牆
		if (snake[i].x >= canvas.width) {
			snake[i].x = 0;
		} else if (snake[i].x < 0) {
			snake[i].x = canvas.width - unit;
		} else if (snake[i].y >= canvas.height) {
			snake[i].y = 0;
		} else if (snake[i].y < 0) {
			snake[i].y = canvas.height - unit;
		}

		ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
		ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
	}

	//計算新的位置
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	if (d == "Left") {
		snakeX -= unit;
	} else if (d == "Up") {
		snakeY -= unit;
	} else if (d == "Right") {
		snakeX += unit;
	} else if (d == "Down") {
		snakeY += unit;
	}

	let newHead = {
		x: snakeX,
		y: snakeY,
	};
	snake.pop();
	snake.unshift(newHead);
}

let SnakeGame = setInterval(draw, 100);
