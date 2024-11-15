// 畫布設定
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const unit = 20;
const row = canvas.height / unit;
const column = canvas.width / unit;

// 初始蛇位置
let snake = [];
function createSnake() {
	snake = [
		{ x: 80, y: 0 },
		{ x: 60, y: 0 },
		{ x: 40, y: 0 },
		{ x: 20, y: 0 },
	];
}

// 果實類別
class Fruit {
	constructor() {
		this.pickALocation();
	}

	drawFruit() {
		ctx.fillStyle = "yellow";
		ctx.fillRect(this.x, this.y, unit, unit);
	}

	pickALocation() {
		let overlapping;
		do {
			overlapping = false;
			this.x = Math.floor(Math.random() * column) * unit;
			this.y = Math.floor(Math.random() * row) * unit;
			for (let i = 0; i < snake.length; i++) {
				if (this.x === snake[i].x && this.y === snake[i].y) {
					overlapping = true;
					break;
				}
			}
		} while (overlapping);
	}
}

// 初始化
createSnake();
let myFruit = new Fruit();
let d = "Right";
let score = 0;
let highestScore = 0;
loadHighestScore();
document.getElementById("myScore").innerHTML = "遊戲分數: " + score;
document.getElementById("myScore2").innerHTML = "最高分數: " + highestScore;

// 方向控制
window.addEventListener("keydown", changeDirection);
function changeDirection(e) {
	if (e.key === "ArrowRight" && d !== "Left") d = "Right";
	else if (e.key === "ArrowDown" && d !== "Up") d = "Down";
	else if (e.key === "ArrowLeft" && d !== "Right") d = "Left";
	else if (e.key === "ArrowUp" && d !== "Down") d = "Up";
}

// 繪製遊戲內容
function draw() {
	// 清空畫布
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	// 繪製果實
	myFruit.drawFruit();

	// 繪製蛇
	for (let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i === 0 ? "red" : "lightblue";
		ctx.strokeStyle = "white";

		// 穿牆邏輯
		if (snake[i].x >= canvas.width) snake[i].x = 0;
		else if (snake[i].x < 0) snake[i].x = canvas.width - unit;
		if (snake[i].y >= canvas.height) snake[i].y = 0;
		else if (snake[i].y < 0) snake[i].y = canvas.height - unit;

		ctx.fillRect(snake[i].x, snake[i].y, unit, unit);
		ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
	}

	// 計算蛇頭的新位置
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;
	if (d === "Left") snakeX -= unit;
	else if (d === "Up") snakeY -= unit;
	else if (d === "Right") snakeX += unit;
	else if (d === "Down") snakeY += unit;

	// 判斷是否吃到果實
	if (snakeX === myFruit.x && snakeY === myFruit.y) {
		myFruit.pickALocation();
		score++;
		setHighestScore(score);
		document.getElementById("myScore").innerHTML = "遊戲分數: " + score;
		document.getElementById("myScore2").innerHTML =
			"最高分數: " + highestScore;
	} else {
		snake.pop(); // 如果沒吃到果實，移除尾巴
	}

	// 更新蛇頭位置
	let newHead = { x: snakeX, y: snakeY };
	snake.unshift(newHead);

	// 判斷蛇是否咬到自己
	for (let i = 1; i < snake.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			clearInterval(SnakeGame);
			alert("遊戲結束");
			return;
		}
	}
}

// 記錄最高分
function loadHighestScore() {
	highestScore = localStorage.getItem("highestScore")
		? Number(localStorage.getItem("highestScore"))
		: 0;
}

function setHighestScore(score) {
	if (score > highestScore) {
		localStorage.setItem("highestScore", score);
		highestScore = score;
	}
}

// 開始遊戲
let SnakeGame = setInterval(draw, 100);
