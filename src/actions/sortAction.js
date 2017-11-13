import {SORT_ITEM} from './actionType';

const sortAction = () => {
    return dispatch => dispatch({type: SORT_ITEM});
}

export {sortAction};