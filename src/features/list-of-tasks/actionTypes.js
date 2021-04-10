/**
 * The type of (redux) action that is dispatched when a task is removed from the list of task.
 *
 * @type {
*     type: TASK_REMOVED,
*     task: Object
* }
*/
export const TASK_REMOVED = Symbol('TASK_REMOVED');

/**
 * The type of (redux) action that is dispatched when a task is created.
 *
 * @type {
*     type: TASK_CREATED,
*     task: Object
* }
*/
export const TASK_CREATED = Symbol('TASK_CREATED');

/**
 * The type of (redux) action that is dispatched when a task is done.
 *
 * @type {
*     type: TASK_DONE,
*     task: Object
* }
*/
export const TASK_DONE = Symbol('TASK_DONE');

/**
 * The type of (redux) action that is dispatched when a task removed from done.
 *
 * @type {
*     type: TASK_ACTIVATE,
*     task: Object
* }
*/
export const TASK_ACTIVATE = Symbol('TASK_ACTIVATE');
