import { createStore } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { history } from '../router/';

import middleware from './middleware';
import reducers from './reducers';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'listTasks'
    ]
};

const persistedReducer = persistReducer(persistConfig, reducers(history));

export default createStore(persistedReducer, middleware);

