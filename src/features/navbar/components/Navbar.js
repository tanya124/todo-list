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
     * Initializes a new {@code Navbar} instance.
     *
     * @inheritdoc
     */
    /* constructor(props: Props) {
        super(props);

        // this._onGoToListRoomsPage = this._onGoToListRoomsPage.bind(this);
        // this._onGoToWelcomePage = this._onGoToWelcomePage.bind(this);
    } */

    /**
     * Get the array of Primary actions of Global Navigation.
     *
     * @returns {ReactElement[]}
     */
    _getPrimaryActions() {
        return [
            <AkGlobalItem key = { 0 }>
                <Tooltip content = { 'Домашняя страничка' }>
                    <div onClick={() => this.props.dispatch(push('/'))}>
                        <HomeCircleIcon/>
                    </div>
                </Tooltip>
            </AkGlobalItem>,
            <AkGlobalItem key = { 1 }>
                <Tooltip content = { 'Завершённые задачи' }>
                    <div onClick={() => this.props.dispatch(push('/info'))}>
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

    // onGoToListRoomsPage: (*) => void;

    /**
     * Redirect to list of rooms page.
     *
     * @returns {void}
     */
    /* _onGoToListRoomsPage() {
        this.props.dispatch(push('/list_rooms'));
    }*/

    // _onGoToWelcomePage: (*) => void;

    /**
     * Redirect to welcome page.
     *
     * @returns {void}
     */
    /* _onGoToWelcomePage() {
         this.props.dispatch(push('/'));
     }*/

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
