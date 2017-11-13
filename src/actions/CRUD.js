import axios from 'axios';
import {LOAD_ITEM, DELETE_ITEM, SAVE_ITEM} from './actionType';

const URL = 'http://avengers.view.indev-group.eu/test_api/staff/?query=';

const setItems = (items) => {
    return {
        type: LOAD_ITEM,
        payload: items
    }
};

const loadItems = () => {
    return dispatch => {
        axios.get(URL)
            .then((response) => {
                dispatch(setItems(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

const saveItem = (item) => {
    return dispatch => {
        dispatch({type: SAVE_ITEM, payload: item})
    }
};

const deleteItem = (id) => {
    return dispatch => {
        dispatch({type: DELETE_ITEM, payload: id})
    }
};

export {loadItems, saveItem, deleteItem};