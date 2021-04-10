/* eslint-disable newline-per-chained-call */
// @flow

import Button from '@atlaskit/button';
import Page from '@atlaskit/page';
import { AtlasKitThemeProvider } from '@atlaskit/theme';
import * as d3 from 'd3';
import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';


import LogoPNG from '../../../images/todo-logo-text.png';
import { CreateTaskFrom } from '../../create-task-form';
import { ListOfTasks } from '../../list-of-tasks';
import type { ListTasksItem } from '../../list-of-tasks/types';
import { Navbar } from '../../navbar';
import { Wrapper, Body, Header, Label, ChartWrapper, Title } from '../styled';

import BarChart from './BarChart';

type Props = {

    /**
     * Array of tasks.
     */
    _listTasks: Array<ListTasksItem>;
}

type State = {

    /**
     * Data for visualization.
     */
    data: Array
};

// show last 7 days
const activetedDate = current => current > moment().add(-7, 'days');

/**
 * CompletedTasksPage Component.
 */
class CompletedTasksPage extends Component<*, State> {

    /**
     * Initializes a new {@code CompletedTasksPage} instance.
     *
     * @inheritdoc
     */
    constructor(props: Props) {
        super(props);

        this.state = {
            data: [],
            listTasks: this.props._listTasks
        };
    }

    /**
     * Prepare data for visualization;
     *
     * @returns {void}
     */
    componentDidMount() {
        this.initData();
    }

    /**
     * Update data for visualization;
     *
     * @returns {void}
     */
    componentDidUpdate() {
        console.log('update');
        if (this.props._listTasks !== this.state.listTasks) {
            this.initData();
            this.setState({
                listTasks: this.props._listTasks
            });
        }
    }

    /**
     * Data array initialization function
     *
     * @return {string[]}
     */
    initData() {
        const doneTasks = this.props._listTasks.filter(item => item.isDone);

        // init map
        const dataToCountTasks = new Map();
        const activetedDates = this.getActivetedDates();

        activetedDates.forEach(date => {
            dataToCountTasks.set(date, 0);
        });

        // fill map
        doneTasks.forEach(task => {
            const endData = task.endTime;

            if (endData) {
                if (dataToCountTasks.has(endData)) {
                    const count = dataToCountTasks.get(endData);

                    dataToCountTasks.set(endData, count + 1);
                }
            }
        });
        dataToCountTasks.forEach((count, date) => {
            this.state.data.push({
                date,
                value: count
            });
        });

        this.state.data.reverse();
    }

    /**
     * Get activated dates function
     *
     * @return {string[]}
     */
    getActivetedDates() {
        const result = [];
        let i = 0;
        let strDate = moment().add(i, 'days').format('YYYY-MM-DD');
        let currentDate = new Date(strDate);

        result.push(strDate);
        while (activetedDate(currentDate)) {
            result.push(strDate);
            i--;
            strDate = moment().add(i, 'days').format('YYYY-MM-DD');
            currentDate = new Date(strDate);
        }

        return result;
    }

    /**
     * Render function of component.
     *
     * @returns {ReactElement}
     */
    render() {
        const { createTaskFormIsOpen } = this.state;

        return (
            <Page navigation = { <Navbar /> }>
                <AtlasKitThemeProvider mode = 'light'>
                    <Wrapper>
                        { this._renderHeader() }
                        { this._renderBody() }
                    </Wrapper>
                </AtlasKitThemeProvider>
            </Page>
        );
    }

    /**
     * Renders the body for the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderBody() {
        return (
            <Body>
                <ListOfTasks taskStatus={true}/>
            </Body>
        );
    }

    /**
     * Renders the header for the welcome page.
     *
     * @returns {ReactElement}
     */
    _renderHeader() {
        return (
            <>
                <ChartWrapper>
                    <Title>Статистика за неделю</Title>
                    <BarChart data={this.state.data} />
                </ChartWrapper>
                <Header>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Label>
                        Список сделанных задач:
                        </Label>
                    </div>
                </Header>
            </>
        );
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

export default connect(_mapStateToProps, null, null, { pure: false })(CompletedTasksPage);
