import initialState from './initialState';

import {
    LOAD_ITEM,
    SAVE_ITEM,
    SEARCH_ITEM,
    SORT_ITEM
} from './../actions/actionType';
import {DELETE_ITEM} from "../actions/actionType";

const itemReducer = (state = initialState.items, action) => {

        switch (action.type) {

            case LOAD_ITEM:
                return action.payload.sort((a, b) => {
                    return Date.parse(a.birth_date)/1000 - Date.parse(b.birth_date)/1000;
                });

            case SEARCH_ITEM:
                return action.payload.sort((a, b) => {
                    return Date.parse(a.birth_date)/1000 - Date.parse(b.birth_date)/1000;
                });

            case SORT_ITEM:
                const arr = [...state];
                return arr.reverse();

            case DELETE_ITEM:
                return [...state].filter( item => item.id !== action.payload );

            case SAVE_ITEM:
                 return [...state].map(item => ( item.id === action.payload.id) ? action.payload : item );

            default:
                return state;
        }
    }
;

export default itemReducer;