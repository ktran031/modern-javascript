// EVENT BUBBLING

// document.querySelector('.card-title').addEventListener('click', function(){
//   console.log('card title');
// });

// document.querySelector('.card-content').addEventListener('click', function(){
//   console.log('card content');
// });

// document.querySelector('.card').addEventListener('click', function(){
//   console.log('card');
// });

// document.querySelector('.col').addEventListener('click', function(){
//   console.log('col');
// });

// EVENT DELGATION

// The below codes won't work properly when you refresh the page
// const delItem = document.querySelector('.delete-item');
// delItem.addEventListener('click', deleteItem);

// Get the parent node of the delete buttons
const list = document.querySelector('.collection');
list.addEventListener('click', deleteItem);

function deleteItem(e){
  // not a good way to do it before we have to add a whole string of class names
  // if(e.target.parentElement.className === 'delete-item secondary-content'){
  //   console.log('delete item');
  // }

  // Make sure the target's parent element contains the class name delete-item
  if(e.target.parentElement.classList.contains('delete-item')){
    console.log('deleting item');

    // Remove the to do list
    e.target.parentElement.parentElement.remove();
  }
}