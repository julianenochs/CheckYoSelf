class ToDoList {
	constructor(title, list, id) {
		this.title = title;
		this.list = list;
		this.id = Date.now();
	}

	saveToStorage() {
	  console.log(newTaskList)
	  localStorage.setItem("list", JSON.stringify(newTaskList));
	}
}