import { createStore } from 'redux';

const initialState = {
  projects: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_PROJECTS':
          return { ...state, projects: action.payload };
      default:
          return state;
    }
};

const store = createStore(reducer);

export default store;