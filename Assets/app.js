// Define UI Variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  //Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //Add task event
  form.addEventListener('submit', addTask);
  
  //Remove Task Event 
  taskList.addEventListener('click', removeTask);

  //Clear task event 
  clearBtn.addEventListener('click', clearTasks)

  //Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}
//Get tasks from LS
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e) {
  if (taskInput.value === '')
    alert('Add a Task');

  // Create li element 
  const li = document.createElement('li');

  // Add a class
  li.className = 'collection-item';

  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link =document.createElement('a');
  
  // Add a Class to element 
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append the link to li 
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  //Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear the input
  taskInput.value = '';
  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) 
      e.target.parentElement.parentElement.remove();
  }
}

//Clear Tasks
function clearTasks(e) {
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
}

//Filter Tasks
function filterTasks (e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function (task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!= -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}