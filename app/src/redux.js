import { createStore, combineReducers } from "redux";
import shortid from "shortid";

export const CREATE_PHONEBOOK = "CREATE_PHONEBOOK";
export const UPDATE_PHONEBOOK = "UPDATE_PHONEBOOK";
export const DELETE_PHONEBOOK = "DELETE_PHONEBOOK";

export const createPhonebook = details => ({
  type: CREATE_PHONEBOOK,
  payload: { details }
});

export const removePhonebook = id => ({
  type: DELETE_PHONEBOOK,
  payload: { id }
});

const phoneBookReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PHONEBOOK: {
      const { details } = action.payload;

      return {
        ...state,
        [details["id"]]: details
      };
    }

    case UPDATE_PHONEBOOK: {
      const { id, details } = action.payload;
      return {
        ...state,
        [id]: details
      };
    }

    case DELETE_PHONEBOOK: {
      const { id } = action.payload;
      return {
        ...state,
        [id]: undefined
      };
    }

    default:
      return state;
  }
};

export const store = createStore(
  combineReducers({
    phonebook: phoneBookReducer
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
