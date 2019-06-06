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

function addNewItem() {
    if (taskInput.value === '') {
      return ''
    } else {
      var listItem = {value: taskInput.value, id: Date.now()}
      var listId = listItem.id
      newListItems.push(listItem)
      addTask();
      makeTaskListBtn.disabled = false;
    }
}

function addTask() {
    var template = document.getElementById('js-item__list');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-nav-task').innerText = taskInput.value
    taskListArea.insertBefore(clone, taskListArea.firstChild);
}

function deleteTaskItem(e) {
    if (e.target.className === 'nav__delete') {
      e.target.parentElement.remove();
      newListItems.pop()
  }
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
  img.addEventListener('click', function(){
  if (img.attributes[0].nodeValue == 'svg/checkbox.svg') {
    img.attributes[0].nodeValue = 'svg/checkbox-active.svg'
  } else {
    img.attributes[0].nodeValue = 'svg/checkbox.svg'
  }
  })
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

function removeCard(clone, list) {
  var indexFound = newTaskList.indexOf(clone);
  newTaskList.splice(indexFound, 1);
  list.saveToStorage(newTaskList);
}

function addTaskList(list) {
    var template = document.getElementById('js-new-task__template');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-new-task__card').setAttribute('data-id', list.id)
    clone.getElementById('js-task__title').innerText = list.title
    var urgentBtn = clone.getElementById('js-inactive-urgent__icon')
    urgentBtn.addEventListener('click', function(){
  if (urgentBtn.attributes[0].nodeValue == 'svg/urgent.svg') {
    urgentBtn.attributes[0].nodeValue = 'svg/urgent-active.svg'
  } else {
    urgentBtn.attributes[0].nodeValue = 'svg/urgent.svg'
  }
    })
    var deleteBtn = clone.getElementById('js-inactive-delete__button')
    deleteBtn.addEventListener('click', function(){
  if (deleteBtn.attributes[0].nodeValue == 'svg/delete.svg') {
    deleteBtn.attributes[0].nodeValue = 'svg/delete-active.svg'
  } else {
    deleteBtn.attributes[0].nodeValue = 'svg/delete.svg'
  }
  removeCard(clone, list)
    })
    list.list.forEach(function(item){ 
    var body = clone.getElementById('js-task__body')
    var task = createTaskElement(item)
    body.appendChild(task)
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