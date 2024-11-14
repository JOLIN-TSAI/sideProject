// 新增待辦項目
function addTask(note, tag) {
	// 新增時不同tag的顏色
	let bgClass;
	switch (tag) {
		case "private":
			bgClass = "bg-warning";
			break;
		case "work":
			bgClass = "bg-primary";
			break;
		case "family":
			bgClass = "bg-success";
			break;
		case "learning":
			bgClass = "bg-danger";
			break;
		default:
			bgClass = "bg-secondary";
			break;
	}
	const template = `
        <div class="row task-item d-flex align-items-center">
            <div class="col-1">
                <input type="checkbox" class="task-checkbox">
            </div>
            <div class="col-2 text-start">
                <span class="badge ${bgClass}">${tag}</span>
            </div>
            <div class="col-5">
                ${note}
            </div>
            <div class="col-2 text-center">
                <i class="fa-solid fa-pen edit-icon"></i>
            </div>
            <div class="col-2 text-center">
                <i class="fa-solid fa-trash delete-icon"></i>
            </div>
        </div>`;
	$(".tasks").append(template);
}

//點擊標籤自動帶入值到select
$(".tag").on("click", (e) => {
	const tagText = $(e.currentTarget).text().trim();
	$(".tag-select").val(tagText);
});

// 監聽 Enter 鍵與按鈕點擊事件
$(".input-task .input").on("keyup", (e) => {
	if (e.key === "Enter" && $(e.currentTarget).val().trim() !== "") {
		const note = $(e.currentTarget).val().trim();
		const tag = $(".tag-select").val();
		if (tag) {
			addTask(note, tag);
			$(e.currentTarget).val("");
			$(".tag-select").val("請選擇標籤");
		} else {
			alert("請選擇一個標籤！");
		}
	}
});

$(".add-task").on("click", () => {
	const note = $(".input-task .input").val().trim();
	const tag = $(".tag-select").val();
	if (note && tag) {
		addTask(note, tag);
		$(".input-task .input").val("");
		$(".tag-select").val("請選擇標籤");
	} else {
		alert("請輸入項目並選擇標籤！");
	}
});

// 監聽勾選待辦事項事件
$(".container").on("change", ".task-checkbox", (e) => {
	const taskRow = $(e.target).closest(".task-item");
	if ($(e.target).prop("checked")) {
		taskRow.appendTo(".area2"); // 移動到完成事項區
		taskRow.addClass("completed"); // 添加劃線樣式
	} else {
		taskRow.appendTo(".tasks"); // 移回待辦清單
		taskRow.removeClass("completed");
	}
});

// 監聽刪除圖示事件
$(".container").on("click", ".delete-icon", (e) => {
	$(e.target).closest(".task-item").remove();
});

// 監聽編輯圖示事件
$(".container").on("click", ".edit-icon", (e) => {
	const taskRow = $(e.target).closest(".task-item");
	const content = taskRow.find(".col-5").text().trim();
	const newContent = prompt("請輸入新的內容：", content);
	if (newContent) {
		taskRow.find(".col-5").text(newContent);
	}
});
