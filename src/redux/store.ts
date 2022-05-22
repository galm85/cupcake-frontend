import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


// reducers
import {settingReducer} from './reducers/settingReducer';
import {usersReducer} from './reducers/usersReducer';
import {categoriesReducer} from './reducers/categoriesReducer';

export type MainState = {
    usersReducer:any
}

const middleware = [thunk];
const initialState={};


const rootReducer = combineReducers({
    settingReducer,
    usersReducer,
    categoriesReducer,
})



const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleware),
    composeWithDevTools(),
))



export default store;