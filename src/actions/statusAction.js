import axios from 'axios';
import {STATUS_LOAD} from './actionType';

const URL = 'http://avengers.view.indev-group.eu/test_api/posts/';

const setStatus = (status) => {
    return {
        type: STATUS_LOAD,
        payload: status
    }
};

const loadStatus = () => {
    return dispatch => {
        axios.get(URL)
            .then((response) => {
                dispatch(setStatus(response.data));
            })
            .catch((err) => {
                console.log('error:', err);
            });
    }
};

export {loadStatus};