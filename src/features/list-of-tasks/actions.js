// @flow

import { TASK_REMOVED, TASK_CREATED, TASK_DONE, TASK_ACTIVATE } from './actionTypes';

/**
 * Notifies that task is removed from list of task.
 *
 * @param {Object} task - Task Details.
 * @returns {{
*     type: TASK_REMOVED,
*     task: Object
* }}
*/
export function taskRemoved(task: Object) {
    return {
        type: TASK_REMOVED,
        task
    };
}

/**
 * Notifies that task is created.
 *
 * @param {Object} task - Task Details.
 * @returns {{
*     type: TASK_CREATED,
*     task: Object
* }}
*/
export function taskCreated(task: Object) {
    return {
        type: TASK_CREATED,
        task
    };
}

/**
 * Notifies that task is done.
 *
 * @param {Object} task - Task Details.
 * @returns {{
*     type: TASK_DONE,
*     task: Object
* }}
*/
export function taskIsDone(task: Object) {
    return {
        type: TASK_DONE,
        task
    };
}

/**
 * Notifies that task removed fron done.
 *
 * @param {Object} task - Task Details.
 * @returns {{
*     type: TASK_ACTIVATE,
*     task: Object
* }}
*/
export function taskActivate(task: Object) {
    return {
        type: TASK_ACTIVATE,
        task
    };
}

