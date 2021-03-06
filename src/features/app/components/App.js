import { AtlasKitThemeProvider } from '@atlaskit/theme';
import { ConnectedRouter as Router } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';

import { CompletedTasksPage } from '../../completed-tasks';
import { history } from '../../router';
import { Welcome } from '../../welcome';

/**
 * Main component encapsulating the entire application.
 */
class App extends Component<*> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        return (
            <AtlasKitThemeProvider mode = 'dark'>
                <Router history = { history } >
                    <Switch>
                        <Route
                            component = { Welcome }
                            exact = { true }
                            path = '/todo-list/' />
                        <Route
                            component = { CompletedTasksPage }
                            path = '/todo-list/info/' />
                    </Switch>
                </Router>
            </AtlasKitThemeProvider>
        );
    }
}

export default connect()(App);
