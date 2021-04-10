// @flow
import moment from 'moment';

import { TASK_REMOVED, TASK_CREATED, TASK_DONE, TASK_ACTIVATE } from './actionTypes';
import type { ListTasksItem } from './types';

type State = {
    listTasks: Array<ListTasksItem>;
};

const DEFAULT_STATE = {
    listTasks: []
};

/**
 * Reduces redux actions for features/list-of-tasks.
 *
 * @param {State} state - Current reduced redux state.
 * @param {Object} action - Action which was dispatched.
 * @returns {State} - Updated reduced redux state.
 */
export default (state: State = DEFAULT_STATE, action: Object) => {
    switch (action.type) {
    case TASK_REMOVED:
        return {
            ...state,
            listTasks:
                _removeTask(state.listTasks, action.task)
        };

    case TASK_CREATED:
        return {
            ...state,
            listTasks: _insertTask(state.listTasks, action.task)
        };

    case TASK_DONE:
        return {
            ...state,
            listTasks: _doneTask(state.listTasks, action.task)
        };

    case TASK_ACTIVATE:
        return {
            ...state,
            listTasks: _activateTask(state.listTasks, action.task)
        };

    default:
        return state;
    }
};

/**
 * Insert task details in the list of tasks array.
 *
 * @param {Array<ListTasksItem>} listTasks - Previous list of tasks array.
 * @param {ListTasksItem} newTask - task that has to be added
 * to list.
 * @returns {Array<ListTasksItem>} - Updated list of task array.
 */
function _insertTask(
        listTasks: Array<ListTasksItem>,
        newTask: ListTasksItem
) {
    const newList: Array<ListTasksItem> = listTasks;

    // Add the task at the beginning.
    newList.unshift(newTask);

    return newList;
}

/**
 * Remove a task from the list of tasks array.
 *
 * @param {Array<ListTasksItem>} listTasks - Previous list array.
 * @param {ListTasksItem} toRemove - task to be removed.
 * @returns {Array<ListTasksItem>} - Updated recent list array.
 */
function _removeTask(
        listTasks: Array<ListTasksItem>,
        toRemove: ListTasksItem
): Array<ListTasksItem> {
    return listTasks.filter(
        (task: ListTasksItem) => task !== toRemove);
}

/**
 * Make task done.
 *
 * @param {Array<ListTasksItem>} listTasks - Previous recent list array.
 * @param {ListTasksItem} task - Conference for which endtime has to
 * be updated.
 * @returns {Array<ListTasksItem>} - Updated recent list array.
 */
function _doneTask(
        listTasks: Array<ListTasksItem>,
        task: ListTasksItem
) {
    for (const item of listTasks) {
        if (item === task) {
            item.isDone = true;
            item.endTime = moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD');
            break;
        }
    }

    return listTasks;
}

/**
 * Make task active.
 *
 * @param {Array<ListTasksItem>} listTasks - Previous recent list array.
 * @param {ListTasksItem} task - Conference for which endtime has to
 * be updated.
 * @returns {Array<ListTasksItem>} - Updated recent list array.
 */
function _activateTask(
        listTasks: Array<ListTasksItem>,
        task: ListTasksItem
) {
    for (const item of listTasks) {
        if (item === task) {
            item.isDone = false;
            item.endTime = null;
            break;
        }
    }

    return listTasks;
}
