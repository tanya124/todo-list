// @flow

export type ListTasksItem = {

    /**
     * Task title
     */
    title: string;

    /**
     * Task description.
     */
    description: ?string;

    /**
     * Planned complation date.
     */
    timeToDo: ?string;

    /**
     * Tags for task
     */
    tags: ?string[];

    /**
     * Date of task creation.
     */
    startTime: string;

    /**
     * Date of task copmlation.
     */
    endTime: ?string;

    /**
     * Tru if task is done.
     */
    isDone: boolean;
};
