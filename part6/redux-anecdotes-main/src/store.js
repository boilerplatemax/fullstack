import { createStore, combineReducers } from "redux";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";
import filterReducer from "./reducers/filterReducer";


const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notificationReducer:notificationReducer
  })
  
  const store = createStore(reducer)

export default store;