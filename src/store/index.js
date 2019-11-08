import { createStore, combineReducers, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';

import { reducer as todoList } from './toDoList/todo-reducer';
import { reducer as details } from './details/details-reducer';
import { reducer as item } from './items/items-reducer';
import logger from './middleware/logger';
import thunk from './middleware/thunk';

let reducer = combineReducers({
  todoList,
  details,
  item,
});

export default function() {
  return createStore(reducer, applyMiddleware(logger, thunk));//, composeWithDevTools());
}