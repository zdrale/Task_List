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
  //Add task event
  form.addEventListener('submit', addTask);
  
  //Remove Task Event 
  taskList.addEventListener('click', removeTask);
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

  // Clear the input
  taskInput.value = '';
  e.preventDefault();
}

//Remove Task
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) 
      e.target.parentElement.parentElement.remove();
  }
}