import initialState from './initialState';

import {
    STATUS_LOAD
} from './../actions/actionType';

const statusReducer = (state = initialState.status, action) => {

        switch (action.type) {

            case STATUS_LOAD:
                return action.payload;
            default:
                return state;
        }
    };

export default statusReducer;