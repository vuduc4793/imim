import { applyMiddleware, createStore, compose } from 'redux';
import reducers from '../reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk';

const middleWares = [thunkMiddleware];
const persistConfig = {
  timeout: 10000,
  key: 'root',
  storage,
  whitelist: [
    'settingUI'
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = createStore(persistedReducer, compose(applyMiddleware(...middleWares)));
export const persistor = persistStore(store);