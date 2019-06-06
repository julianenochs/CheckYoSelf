var searchBtn = document.querySelector('#js-search__icon');
var searchInput = document.querySelector('#js-search__input');
var titleInput = document.querySelector('#js-title__input');
var taskInput = document.querySelector('#js-item__input');
var itemList = document.querySelector('#js-item__list');
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
var cardArea = document.querySelector('#js-card__checkbox');
var taskListArea = document.querySelector('#inject-task__list');
var navList = document.querySelector('#js-item-list__box');
var navForm = document.querySelector('#js-nav__form');
var navStuff = document.querySelector('#js-top-nav');
var cardSection = document.querySelector('.card__section');
var newTaskList = JSON.parse(localStorage.getItem("list")) || [];
var newListItems = [];

addTaskBtn.addEventListener('click', addNewItem);
makeTaskListBtn.addEventListener('click', makeNewList);
clearListBtn.addEventListener('click', clearAll);
taskListArea.addEventListener('click', deleteTaskItem);
cardSection.addEventListener('click', fireCardButtons);

function addNewItem() {
    if (taskInput.value === '') {
      return ''
    } else {
      var listItem = {value: taskInput.value, id: Date.now()}
      var listId = listItem.id
      newListItems.push(listItem)
      addTask();
      makeTaskListBtn.disabled = false;
      findId(listId);
    }
}

function addTask() {
    var template = document.getElementById('js-item__list');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-nav-task').innerText = taskInput.value
    taskListArea.insertBefore(clone, taskListArea.firstChild);
}

function findId(listId) {
    var taskId = parseInt(listId)
    return taskId
}

// function clearInput() {
//     taskInput.value = null;
// }

function deleteTaskItem(e) {
    if (e.target.className === 'nav__delete') {
      e.target.parentElement.remove();
      newListItems.pop()
  }
}

function fireCardButtons(e){
    checkTaskItem(e);
    toggleUrgent();
    deleteCardItem(e);
}

function deleteCardItem(e) {
   if (e.target.classList.contains('inactive-delete__button')) {
     e.target.parentElement.parentElement.parentElement.remove();
  }
}

function checkTaskItem(e) { 
  // every time image is created, grab the element and attach an EL 
  var checkbox = document.getElementById('js-card__checkbox');
  if (e.target.classList.contains('js-card__checkbox')) {
      checkbox.classList.toggle('checkbox');
  }
}

function toggleUrgent() {
  var urgent = document.getElementById('js-inactive-urgent__icon');
  urgent.classList.toggle('active-urgent__icon')
}

function makeNewList(e) {
    e.preventDefault();
    if (titleInput.value == '') {
      makeTaskListBtn.disabled = true;
    } else {
      var list = new ToDoList({title: titleInput.value, list: newListItems, id: Date.now()})
      newTaskList.push(list)
      addTaskList(list);
      clearAll();
      handleButtons(titleInput, makeTaskListBtn);
      handleButtons(titleInput, clearListBtn);
  }
}

function handleButtons(input, button){
    if (input.value == '') {
      button.disabled = true;
  }
}

function createTaskElement(item) {
  var div = document.createElement('div')
  var img = document.createElement('img')
  addImgAttributes(img)
  img.addEventListener('click', checkTaskItem)
  var p = document.createElement('p')
  p.innerText = item.value
  div.appendChild(img)
  div.appendChild(p)
  return div
}

function addImgAttributes(img) {
  img.setAttribute('src', 'svg/checkbox.svg')
  img.setAttribute('alt', 'checkbox')
  img.setAttribute('class', 'card__checkbox')
}

function addTaskList(list) {
    var template = document.getElementById('js-new-task__template');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-new-task__card').setAttribute('data-id', list.id)
    clone.getElementById('js-task__title').innerText = list.title
    list.list.forEach(function(item){ 
    var body = clone.getElementById('js-task__body')
    console.log(body)
    var task = createTaskElement(item)
    console.log(task)
    body.appendChild(task)
    // body.appendChild(item);
  })
    cardSection.insertBefore(clone, cardSection.firstChild);
    list.saveToStorage(newTaskList);
}

function loadCards() {
    newTaskList.forEach(function(task){
    var list = new ToDoList({title: task.title, list: task.list, id: task.id});
    addTaskList(list)
  })
};

loadCards();

function clearAll() {
      navForm.reset();
    }