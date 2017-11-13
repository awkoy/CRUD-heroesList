import axios from 'axios';
import { SEARCH_ITEM } from './actionType';

const URL = 'http://avengers.view.indev-group.eu/test_api/staff/?query=';

const setItems = (items) => {
    return {
        type: SEARCH_ITEM,
        payload: items
    }
};

const searchItem = (value) => {
    console.log(value.replace(/\s/ig, '_'));
    return dispatch => {
        axios.get(`${URL}${value.replace(/\\s/ig, '_')}`)
            .then((response) => {
                dispatch(setItems(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

export {searchItem};