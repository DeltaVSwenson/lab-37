import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';
import { connect } from 'react-redux';
import { addItem, deleteItem, toggleComplete } from '../../store/toDoList/todo-reducer';
import { toggleDetails } from '../../store/details/details-reducer';
import { modifyItem, resetItem } from '../../store/items/items-reducer';

import './todo.scss';

function toDo(props) {

  const { todoList, details, item, addItem, deleteItem, toggleComplete, toggleDetails, modifyItem, resetItem } = props;

  let handleInputChange = e => {
    let { name, value } = e.target;

    modifyItem(name, value);
  };

  let addNewItem = (e) => {

    e.preventDefault();
    e.target.reset();

    const defaults = { _id: uuid(), complete:false };
    const newItem = Object.assign({}, item, defaults);

    addItem(newItem);
    //resetItem();
  };

  let showDetails = (id) => {
    let item = todoList.find(item => item._id === id);

    toggleDetails(item);
  }

  return (
    <>
      <header>
        <h2>
          There are
          {todoList.filter( item => !item.complete ).length}
          Items To Complete
        </h2>
      </header>

      <section className="todo">

        <div>
          <h3>Add Item</h3>
          <form onSubmit={addNewItem}>
            <label>
              <span>To Do Item</span>
              <input
                name="text"
                placeholder="Add To Do List Item"
                onChange={handleInputChange}
              />
            </label>
            <label>
              <span>Difficulty Rating</span>
              <input type="range" min="1" max="5" name="difficulty" defaultValue="3" onChange={handleInputChange} />
            </label>
            <label>
              <span>Assigned To</span>
              <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
            </label>
            <label>
              <span>Due</span>
              <input type="date" name="due" onChange={handleInputChange} />
            </label>
            <button>Add Item</button>
          </form>
        </div>

        <div>
          <ul>
            { todoList.map(item => (
              <li
                className={`complete-${item.complete.toString()}`}
                key={item._id}
              >
                <span onClick={() => toggleComplete(item._id)}>
                  {item.text}
                </span>
                <button onClick={() => showDetails(item._id)}>
                  Details
                </button>
                <button onClick={() => deleteItem(item._id)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <When condition={details.showDetails}>
        <Modal title="To Do Item" close={showDetails}>
          <div className="todo-details">
            <header>
              <span>Assigned To: {details.details.assignee}</span>
              <span>Due: {details.details.due}</span>
            </header>
            <div className="item">
              {details.details.text}
            </div>
          </div>
        </Modal>
      </When>
    </>
  );
}

function mapStateToProps(state) {
  console.log(state)
  return {
    todoList: state.todoList,
    details: state.details,
    item: state.item,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (id) => dispatch(deleteItem(id)),
    toggleComplete: (id) => dispatch(toggleComplete(id)),
    toggleDetails: (item) => dispatch(toggleDetails(item)),
    modifyItem: (name, value) => dispatch(modifyItem(name, value)),
    resetItem: () => dispatch(resetItem()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toDo);