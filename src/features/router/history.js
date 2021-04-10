/* eslint-disable no-undef */
import { createBrowserHistory as createHistory } from 'history';

export default createHistory({
    basename: process.env.PUBLIC_URL
});
