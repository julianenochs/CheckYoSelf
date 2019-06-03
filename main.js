var searchBtn = document.querySelector('#js-search__icon');
var searchInput = document.querySelector('#js-search__input');
var titleInput = document.querySelector('#js-title__input');
var taskInput = document.querySelector('#js-item__input');
var addTaskBtn = document.querySelector('#js-add__button');
var makeTaskListBtn = document.querySelector('#js-make-list__button');
var clearListBtn = document.querySelector('#js-clear-list__button');
var filterBtn = document.querySelector('#js-filter__button');
var taskTitle = document.querySelector('#js-task__title');
var taskBody = document.querySelector('#js-task__body');
var checkbox = document.querySelector('#js-task__checklist');
var taskText = document.querySelector('#js-task__text');
var urgentBtn = document.querySelector('#js-inactive-urgent__icon');
var deleteBtn = document.querySelector('#js-inactive-delete__button');
var taskListArea = document.querySelector('#inject-task__list');
var cardSection = document.querySelector('.card__section');
var newTaskList = JSON.parse(localStorage.getItem("list")) || [];

addTaskBtn.addEventListener('click', addNewItem);
makeTaskListBtn.addEventListener('click', makeNewList);
clearListBtn.addEventListener('click', clearAll)

function addNewItem() {
	var list = new ToDoList(titleInput.value, newTaskList, Date.now());
	newTaskList.push(taskInput.value)
	console.log(newTaskList)
	addTask();
	list.saveToStorage(newTaskList)
}

function addTask() {
	var template = document.getElementById('js-item__list');
	var clone = template.content.cloneNode(true);
	clone.getElementById('js-nav-task').innerText = taskInput.value
	taskListArea.insertBefore(clone, taskListArea.firstChild);
}

function makeNewList(e) {
	e.preventDefault();
	var list = new ToDoList(titleInput.value, newTaskList, Date.now());
	newTaskList.push(list)
	console.log(list);
	addTaskList(list);
	list.saveToStorage(newTaskList);
}

function addTaskList(list) {
	var template = document.getElementById('js-new-task__template');
	var clone = template.content.cloneNode(true);
	clone.getElementById('js-new-task__card').setAttribute('data-id', list.id)
	clone.getElementById('js-task__title').innerText = list.title
	clone.getElementById('js-task__body').innerText = list.
	console.log(list.list)
	cardSection.insertBefore(clone, cardSection.firstChild);
	list.saveToStorage();	
}

function clearAll(){
	titleInput.value = '';
	taskInput.value = '';
}