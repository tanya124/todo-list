// @flow

import Button from '@atlaskit/button';
import BulletListIcon from '@atlaskit/icon/glyph/bullet-list';
import CheckCircleIcon from '@atlaskit/icon/glyph/check-circle';
import HomeCircleIcon from '@atlaskit/icon/glyph/home-circle';
import Navigation, { AkGlobalItem } from '@atlaskit/navigation';
import Tooltip from '@atlaskit/tooltip';
import { push } from 'connected-react-router';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import LogoPNG from '../../../images/logo.png';

/**
 * Navigation Bar component.
 */
class Navbar extends Component<Props, *> {

    /**
     * Get the array of Primary actions of Global Navigation.
     *
     * @returns {ReactElement[]}
     */
    _getPrimaryActions() {
        return [
            <AkGlobalItem key = { 0 }>
                <Tooltip content = { 'Домашняя страничка' }>
                    <div onClick={() => this.props.dispatch(push('/todo-list/'))}>
                        <HomeCircleIcon/>
                    </div>
                </Tooltip>
            </AkGlobalItem>,
            <AkGlobalItem key = { 1 }>
                <Tooltip content = { 'Завершённые задачи' }>
                    <div onClick={() => this.props.dispatch(push('/todo-list/info/'))}>
                        <BulletListIcon/>
                    </div>
                </Tooltip>
            </AkGlobalItem>
        ];
    }

    /**
     * Get the array of Secondary actions of Global Navigation.
     *
     * @returns {ReactElement[]}
     */
    _getSecondaryActions() {
        return [];
    }


    /**
     * Render function of component.
     *
     * @returns {ReactElement}
     */
    render() {
        return (
            <Navigation
                globalPrimaryActions = { this._getPrimaryActions() }
                globalPrimaryIcon = { <img
                    src = { LogoPNG }
                    style = {{ width: '40px' }} /> }
                globalSecondaryActions = { this._getSecondaryActions() }
                isOpen = { false }
                isResizeable = { false } />
        );
    }
}

export default connect()(Navbar);
