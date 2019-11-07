import { createStore, combineReducers } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as todoList } from './toDoList/todo-reducer';
import { reducer as details } from './details/details-reducer';
import { reducer as item } from './items/items-reducer';

let reducer = combineReducers({
  todoList,
  details,
  item,
});

export default function() {
  return createStore(reducer);//, composeWithDevTools());
}