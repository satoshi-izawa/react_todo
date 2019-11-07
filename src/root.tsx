import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { store } from './store';
import { TodoListContainer } from './form/containers/todo_list_container';

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
            <TodoListContainer />
          </Router>
        </div>
      </React.StrictMode>
    </Provider>
  </>
);
