class ToDoList {
	constructor(obj) {
		this.title = obj.title;
		this.list = obj.list;
		this.id = Date.now();
	}

	saveToStorage() {
	  localStorage.setItem("list", JSON.stringify(newTaskList));
	}
}