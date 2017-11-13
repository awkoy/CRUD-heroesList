import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';
import itemReducer from './itemReducer';
import statusReducer from "./statusReducer";

const rootReducer = combineReducers ({
    routing: routerReducer,
    item: itemReducer,
    status: statusReducer
});

export default rootReducer;