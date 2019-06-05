class ToDoList {
	constructor(obj) {
		this.title = obj.title;
		this.list = obj.list;
		this.id = obj.id || Date.now();
	}

	saveToStorage() {
	  localStorage.setItem("list", JSON.stringify(newTaskList));
	}
}

// create a new class for tasks / cards
// unique ID for each ITEM
// appendTaskListToCard (new card list )