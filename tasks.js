class ToDoList {
	constructor(obj) {
		this.title = obj.title;
		this.list = obj.list;
		this.id = obj.id || Date.now();
	}

	saveToStorage() {
	  localStorage.setItem("list", JSON.stringify(newTaskList));
	}

	deleteFromStorage() {
		var indexFound = newTaskList.indexOf(this);
    newTaskList.splice(indexFound, 1);
    this.saveToStorage(newTaskList);
	}
}