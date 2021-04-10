// @flow

import Button from '@atlaskit/button';
import { Checkbox } from '@atlaskit/checkbox';
import CrossIcon from '@atlaskit/icon/glyph/cross';
import Tooltip from '@atlaskit/tooltip';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';

import { taskRemoved, taskIsDone, taskActivate } from '../actions';
import { Container, TaskCard, TaskTitle, TruncatedText } from '../styled';
import type { ListTasksItem } from '../types';


type Props = {

    /**
     * Redux dispatch.
     */
    dispatch: Dispatch<*>;

    /**
     * Array of tasks.
     */
    _listTasks: Array<ListTasksItem>;

    /**
     * if true, then the tasks that have been completed are shown,
     * otherwise the tasks that must be performed
     */
    taskStatus: boolean
};

type State = {
    listOfTasks: Array<ListTasksItem>;

    /**
     * if true, then the tasks that have been completed are shown,
     * otherwise the tasks that must be performed
     */
    taskStatus: boolean;
}

/**
 * ListOfTasks component.
 */
class ListOfTasks extends Component<Props, State> {
    /**
     * Initializes a new {@code ListOfTasks} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            listOfTasks: this.props._listTasks,
            taskStatus: this.props.taskStatus
        };

        this._onCheckboxChange = this._onCheckboxChange.bind(this);
    }

    /**
     * Update listOfTasks after updating the store.
     *
     * @returns {void}
     */
    componentDidUpdate() {
        if (this.props._listTasks !== this.state.listOfTasks) {
            this.setState({
                listOfTasks: this.props._listTasks
            });
        }
    }

    /**
     * Creates a handler for removing a task from the list.
     *
     * @param {ListTasksItem} task - Task Details.
     * @returns {void}
     */
    _onRemoveTask(task: ListTasksItem) {
        return e => {
            this.props.dispatch(taskRemoved(task));
            e.stopPropagation();
        };
    }

    /**
     * Render function of component.
     *
     * @returns {ReactElement}
     */
    render() {
        const tasksFiltered = this.state.listOfTasks.filter(task => task.isDone === this.state.taskStatus);

        return (
            <Container>
                {
                    tasksFiltered && tasksFiltered.length > 0 && tasksFiltered.map(
                                    task => this._renderListEntry(task)
                    )
                }
                {
                    tasksFiltered && tasksFiltered.length === 0 && <div
                        style = {{ display: 'flex',
                            textAlign: 'center',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '1.5rem',
                            height: '100px' }}>Пока тут пусто</div>
                }
            </Container>
        );
    }

    /**
     * Renders the task card.
     *
     * @param {ListOfTasksItem} task - task Details.
     * @returns {ReactElement}
     */
    _renderListEntry(task) {
        return (
            <TaskCard
                key = { task.startTime }>
                <div style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Tooltip content="Сделано">
                            <Checkbox
                                size='large'
                                onChange={e => this._onCheckboxChange(e, task)}
                                defaultChecked={task.isDone}/>
                        </Tooltip>
                        <div style={{ display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between' }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column' }}>
                                <TaskTitle>
                                    { task.title }
                                </TaskTitle>
                                <TruncatedText>
                                    { task.description }
                                </TruncatedText>
                            </div>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifySelf: 'flex-end'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'flex-end'
                                }}>
                                    <Button
                                        appearance = 'subtle'
                                        iconBefore = { <CrossIcon primaryColor = 'white' /> }
                                        onClick = { this._onRemoveTask(task) }
                                        spacing = 'none' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}>
                        {task.timeToDo && <div>
                         Срок: { task.timeToDo }
                        </div>}
                    </div>
                </div>
            </TaskCard>
        );
    }

    /**
     * Updates task status in (redux) state when it is updated.
     *
     * @param {SyntheticInputEvent<HTMLInputElement>} event - Event by which
     * this function is called.
     * @returns {void}
     */
    _onCheckboxChange(event: SyntheticInputEvent<HTMLInputElement>, task: ListOfTasksItem) {
        const value = event.target.checked;

        if (value) {
            this.props.dispatch(taskIsDone(task));
        } else {
            this.props.dispatch(taskActivate(task));
        }
    }
}

/**
 * Maps (parts of) the redux state to the React props.
 *
 * @param {Object} state - The redux state.
 * @returns {Props}
 */
function _mapStateToProps(state: Object) {
    return {
        _listTasks: state.listTasks.listTasks
    };
}

export default connect(_mapStateToProps, null, null, { pure: false })(ListOfTasks);
