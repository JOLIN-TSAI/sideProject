//sep 1 綁定卡片&點擊事件
const cards = document.querySelectorAll(".memory-card");
cards.forEach((card) => card.addEventListener("click", flipCard));

//sep 2 宣告遊戲狀態變數
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//sep 3 卡片翻轉邏輯
function flipCard() {
	if (lockBoard || this === firstCard) return;
	this.classList.add("flip");
	//儲存狀態
	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;
		return;
	}

	secondCard = this;
	checkMatch();
}
//sep 4 檢查匹配
function checkMatch() {
	firstCard.dataset.framework === secondCard.dataset.framework
		? disableCards()
		: unflipCards();
}

//sep 5 匹配成功時禁用卡片
function disableCards() {
	firstCard.removeEventListener("click", flipCard);
	secondCard.removeEventListener("click", flipCard);
	resetBoard();
}

//sep 6 匹配失敗時翻回卡片
function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove("flip");
		secondCard.classList.remove("flip");
		resetBoard();
	}, 1500);
}

//sep 7 重置遊戲狀態
function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

//sep 8 隨機打亂卡片順序
(function shuffle() {
	cards.forEach((card) => {
		let randomPos = Math.floor(Math.random() * 12);
		card.style.order = randomPos;
	});
})();
