// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// *** Get Tasks from LS
function getTasks() {
  // initialize tasks
  let tasks;

  // Check if there are any tasks in local storage. If none, create an empty array.
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // local storage can only store STRINGS, so we will have to parse it as JSON when it comes out
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // *** Loop through all the tasks that are in local storage
  tasks.forEach(task => {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';

    // *** Create text node and append to li
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

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';

  // *** Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

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

  // ***Store in LS
  // pass the value of taskInput into local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// *** Store Task
function storeTaskInLocalStorage(task) {
  // initialize tasks
  let tasks;

  // Check if there are any tasks in local storage. If none, create an empty array.
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // local storage can only store STRINGS, so we will have to parse it as JSON when it comes out
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Add the task to the tasks array 
  tasks.push(task);

  // Set tasks back to local storage
  // *** This has to be stored as a string so we'll use JSON.stringify
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      var taskItem = e.target.parentElement.parentElement;

      // remove list item from dom
      taskItem.remove();

      // Remove task from LS
      removeTaskFromLocalStorage(taskItem);
    }
  }
}

// *** Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Loop through all tasks in LS
  tasks.forEach(function (task, index) {
    // Remove task from LS
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  // Set our Local Storage again
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';

  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  // https://jsperf.com/innerhtml-vs-removechild

  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // use forEach because querySelectorAll returns a node list
  document.querySelectorAll('.collection-item').forEach(function (task) {
    // First child of .collection-item is a text node, and we're looking for it's text content
    const item = task.firstChild.textContent;

    // If there's no match, it will return a -1, so we have to set the matched text NOT equal to -1
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}