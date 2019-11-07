import React from 'react';
import uuid from 'uuid/v4';
import { When } from '../if';
import Modal from '../modal';
import { connect } from 'react-redux';
import { addItem, deleteItem, toggleComplete } from '../../store/toDoList/todo-reducer';
import { toggleDetails } from '../../store/details/details-reducer';
import { modifyItem, resetItem } from '../../store/items/items-reducer';
import Form from 'react-jsonschema-form';
import schema from '../../schema.json'
import './todo.scss';

const formUiSchema = {
  _id: { 'ui:widget': 'hidden' },
  __v: { 'ui:widget': 'hidden' },
  complete: { 'ui:widget': 'hidden' },
}

function toDo(props) {

  const { todoList, details, item, addItem, deleteItem, toggleComplete, toggleDetails, modifyItem, resetItem } = props;

  let handleInputChange = e => {
    let { name, value } = e.target;

    modifyItem(name, value);
  };

  let addNewItem = (e) => {
    const defaults = { _id: uuid() };
    const newItem = Object.assign({}, e.formData, defaults);

    addItem(newItem);


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
          <Form 
            schema={schema}
            uiSchema={formUiSchema}
            onSubmit={addNewItem}
          />
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