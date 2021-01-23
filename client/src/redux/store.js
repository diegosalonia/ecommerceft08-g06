import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers.js";
import thunk from "redux-thunk";


const middlewares = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,  middlewares(applyMiddleware(thunk))
); 

export default store;