import {combineReducers,createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


// reducers
import {settingReducer} from './reducers/settingReducer';
import {usersReducer} from './reducers/usersReducer';
import {categoriesReducer} from './reducers/categoriesReducer';
import {productsReducer} from './reducers/productsReducers';
import {ordersReducer} from './reducers/ordersReducers';
import {restaurantsReducer} from './reducers/restaurantsReducers';
import {jobsReducer} from './reducers/jobsReducers';

export type MainState = {
    usersReducer:any
    settingReducer:any
    categoriesReducer:any
    productsReducer:any
}

const middleware = [thunk];
const initialState={};


const rootReducer = combineReducers({
    settingReducer,
    usersReducer,
    categoriesReducer,
    productsReducer,
    ordersReducer,
    restaurantsReducer,
    jobsReducer
})



const store = createStore(rootReducer,initialState,compose(
    applyMiddleware(...middleware),
    composeWithDevTools(),
))



export default store;