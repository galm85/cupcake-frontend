import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


// reducers
import {usersReducer} from './reducers/usersReducer';

export type MainState = {
    usersReducer:any
}

const middleware = [thunk];
const initialState={};


const rootReducer = combineReducers({
    usersReducer,
})



const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleware),
    composeWithDevTools(),
))



export default store;