let answerNumber = Math.floor(Math.random() * 100) + 1;
let minRange = 1;
let maxRange = 100;

console.log("正確答案:", answerNumber);

const inputNumber = document.querySelector(".form-control");
const checkBtn = document.querySelector(".btn");
const resetBtn = document.querySelector("#reset-btn");

function play() {
	minRange = 1;
	maxRange = 100;
	answerNumber = Math.floor(Math.random() * 100) + 1;
	console.log("新的正確答案是", answerNumber);
	alert("遊戲已重置，請重新開始猜數字~");
}

checkBtn.addEventListener("click", () => {
	if (!inputNumber.value.match(/^\d+$/)) {
		alert("請輸入數字！");
		inputNumber.value = "";
		return;
	}

	const userGuess = parseInt(inputNumber.value);

	if (isNaN(userGuess) || userGuess < minRange || userGuess > maxRange) {
		alert(`請輸入${minRange} ~ ${maxRange}之間的數字`);
		return;
	}
	if (userGuess === answerNumber) {
		alert(`你答對了～`);
		inputNumber.value = "";
		return;
	} else if (userGuess < answerNumber) {
		minRange = userGuess + 1;
		alert(`再大一點，目前範圍${minRange} ~ ${maxRange}`);
	} else {
		maxRange = userGuess - 1;
		alert(`再小一點，目前範圍${minRange} ~ ${maxRange}`);
	}

	inputNumber.value = "";
});

resetBtn.addEventListener("click", () => {
	play();
});
