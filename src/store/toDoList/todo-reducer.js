export const intialState = [];
const API = 'https://api-js401.herokuapp.com/api/v1/todo';
export const actions = {};

export function reducer(state = intialState, action = {}){
  switch(action.type) {
    case 'GET':
      return action.payload
    case 'DELETE':
      return state.filter(item => item._id !== action.payload);
    case 'toggleComplete':
      return (item => item._id === action.payload ? { ...item, complete: !item.complete, } : item);
    case 'PUT':
      return state.map(item =>item._id === action.payload.id ? action.payload.record : item);
    case 'POST':
      return state.concat(action.payload);
    default:
      return state;
  }
}

actions.postItem = (item) => {
  return dispatch => {
    fetch(API, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .then(body => {
      dispatch(actions.addItem(body));
    })
  }
};

actions.loadToDoList = () => {
  return dispatch => {
    fetch(API)
      .then(results => results.json())
      .then(body => {
        dispatch(actions.get(body.results));
      });
  }

};

actions.deleteItem = (id) => {
  return dispatch => {
    fetch(`${API}/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        dispatch(actions.delete(id));
      })
  }
}

actions.updateItem = (item) => {
  let id = item._id;
  return dispatch => {
    fetch(`${API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': 'application/json'}),
    })
      .then(res => res.json())
      .then(body => {
        dispatch(actions.put(id, body));
      })
  }
}


actions.addItem = (item, record) => ({
  type:'POST',
  payload: {
    item, 
    record,
  }
});

actions.get = (items) => ({
  type: 'GET',
  payload: items,
});

actions.put = (id, record) => ({
  type: 'PUT',
  payload: {
    id,
    record,
  },
});


actions.toggleComplete = (id) => {
  return{
    type:'toggleComplete',
    payload: id,
  };
};