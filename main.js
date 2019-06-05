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
var taskListArea = document.querySelector('#inject-task__list');
var cardSection = document.querySelector('.card__section');
var newTaskList = JSON.parse(localStorage.getItem("list")) || [];
var newListItems = [];

addTaskBtn.addEventListener('click', addNewItem);
makeTaskListBtn.addEventListener('click', makeNewList);
clearListBtn.addEventListener('click', clearAll);
taskListArea.addEventListener('click', deleteTaskItem);

function addNewItem() {
    if (taskInput.value === '') {
        return ''
    } else {
      var listItem = {value: taskInput.value, id: Date.now(), checked: false}
    newListItems.push(listItem)
    addTask();
    makeTaskListBtn.disabled = false;
    }
}

function findTask(id) {
  return newListItems.find(function(list) {    
    return list.id === id
  })
};

function addTask() {
    var template = document.getElementById('js-item__list');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-nav-task').innerText = taskInput.value
    taskListArea.insertBefore(clone, taskListArea.firstChild);
}

function clearInput() {
    taskInput.value = null;
}

function deleteTaskItem(e) {
   if (e.target.className === 'nav__delete') {
     e.target.parentElement.remove();
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
  }
}

function addTaskList(list) {
    var template = document.getElementById('js-new-task__template');
    var clone = template.content.cloneNode(true);
    clone.getElementById('js-new-task__card').setAttribute('data-id', list.id)
    clone.getElementById('js-task__title').innerText = list.title
    list.list.forEach(function(item){  
    clone.getElementById('js-task__body').insertAdjacentHTML('afterbegin', 
      `<div data-id=${item.id}>
        <img 
          src='svg/checkbox.svg'
          alt='checkbox'
          class='card__checkbox'
          id='js-card__checkbox'
          data-id=${item.id}
        /> 
          <p 
            class='card-task'
                id='js-card-task'>
                  ${item.value}
                    </p></div>`
    );
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
    if (titleInput.value === ''){
        clearListBtn.disabled = true;
    } else {
    nav.reset();
    }
}