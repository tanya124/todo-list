// @flow

import { combineReducers } from 'redux';

import { reducer as listOfTasksReducer } from '../list-of-tasks';
import { reducer as routerReducer } from '../router';

const createRootReducer = history => combineReducers({
    router: routerReducer(history),
    listTasks: listOfTasksReducer
});

export default createRootReducer;
