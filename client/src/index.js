import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store.js';
import TemplateProvider from './template/TemplateProvider';


ReactDOM.render(
    <Provider store={store}>
        <TemplateProvider>
            <App />
        </TemplateProvider>
    </Provider>,
    document.getElementById('root'),
);