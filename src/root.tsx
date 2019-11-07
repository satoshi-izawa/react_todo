import React from 'react';
import { Provider } from 'react-redux';
import { Router, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { store } from './store';

const style = require('./root.scss');

const history = createBrowserHistory();

/**
 * SPA機能としてのルートオブジェクト
 * ページによらないコンポーネントや、各ページへのルーティングを書きます
 */
export const Root = () => (
  <>
    <Provider store={store}>
      <React.StrictMode>
        <div id="main" className={style.main}>
          <Router history={history}>
            <Switch />
          </Router>
        </div>
      </React.StrictMode>
    </Provider>
  </>
);
