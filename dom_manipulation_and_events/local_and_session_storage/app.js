// set local storage item
// localStorage.setItem('name', 'John');
// localStorage.setItem('age', '30');

// set session storage item
// sessionStorage.setItem('name', 'Beth');

// remove from storage
// localStorage.removeItem('name');

// get from storage
// const name = localStorage.getItem('name');
// const age = localStorage.getItem('age');

// // clear local storage
// localStorage.clear();

// console.log(name, age);



document.querySelector('form').addEventListener('submit', function(e){
  // Get value of input
  const task = document.getElementById('task').value;

  let tasks;

  // Create an empty array if tasks in local storage is empty
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Parse the array into a JSON object and get all the tasks from local storage
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Push task to tasks array
  tasks.push(task); 

  // Turns the tasks JSON into a string and add tasks to local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  alert('Task saved');

  e.preventDefault();
});

// Get the tasks out of local storage
const tasks = JSON.parse(localStorage.getItem('tasks'));

// loop through all the task
tasks.forEach(function(task){
  console.log(task);
});