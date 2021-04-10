// @flow

import Button from '@atlaskit/button';
import Page from '@atlaskit/page';
import { AtlasKitThemeProvider } from '@atlaskit/theme';
import React, { Component } from 'react';
import { connect } from 'react-redux';


import LogoPNG from '../../../images/todo-logo-text.png';
import { CreateTaskFrom } from '../../create-task-form';
import { ListOfTasks } from '../../list-of-tasks';
import { Navbar } from '../../navbar';
import { Wrapper, Body, Header, Label } from '../styled';


type State = {
    createTaskFormIsOpen: boolean;
};

/**
 * Welcome Component.
 */
class Welcome extends Component<*, State> {

    /**
     * Initializes a new {@code Welcome} instance.
     *
     * @inheritdoc
     */
    constructor() {
        super();

        this.state = {
            createTaskFormIsOpen: false
        };

        this.onChangeFormState = this.onChangeFormState.bind(this);
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
                        {createTaskFormIsOpen && <CreateTaskFrom onCloseForm={ this.onChangeFormState }/>}
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
                <ListOfTasks taskStatus={false}/>
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
                <div
                    style = {{ textAlign: 'center',
                        paddingTop: '4em' }}>
                    <img
                        src = { LogoPNG }
                        style = {{ width: '400px' }} />
                </div>
                <Header>
                    <div style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Label>
                        Список задач:
                        </Label>
                        <Button
                            appearance = 'primary'
                            onClick = { this.onChangeFormState }
                            shouldFitContainer = { false }>
                            { 'Создать' }
                        </Button>
                    </div>
                </Header>
            </>
        );
    }

    /**
     * Change createTaskFormIsOpen state.
     *
     * @returns {void}
     */
    onChangeFormState() {
        const current = this.state.createTaskFormIsOpen;

        this.setState({
            createTaskFormIsOpen: !current
        });
    }
}

export default connect()(Welcome);
