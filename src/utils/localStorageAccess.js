/**
 * Receives the item and stores it in Local Storage
 */
export function sendItemToLocalStorage(item) {
  const { todoItem } = item;

  const todoItemsArray = JSON.parse(localStorage.getItem("items"));

  //if local storage isn't empty
  if (todoItemsArray) {
    let newItemsArray = [];

    if (item.hasOwnProperty('note')) {
      newItemsArray = todoItemsArray.concat({
        note: item.note,
        isChecked: item.isChecked
      });
    }
    else {
      newItemsArray = todoItemsArray.concat({
        note: todoItem,
        isChecked: false
      });
    }

    localStorage.setItem("items", JSON.stringify(newItemsArray));
  }
  else { //if local storage is empty
    let firstItemArray = [];

    if (item.hasOwnProperty('note')){
      firstItemArray = [{
        ...item
      }]
    }
    else {
      firstItemArray = [{
        note: todoItem,
        isChecked: false
      }];
    }

    localStorage.setItem("items", JSON.stringify(firstItemArray));
  }
}

/**
 * Returns an array of items in Local Storage
 * 
 * Returns null if local storage is empty 
 */
export function getItemsFromLocalStorage() {
  return (JSON.parse(localStorage.getItem("items")));
}

export function removeItemFromLocalStorage() {
  localStorage.removeItem("items");
}