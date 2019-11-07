import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from './root';

require('./index.scss');

/**
 * アプリのランディングポイント
 * 初期化処理などを記述します
 */
(() => {
  const appElem = document.getElementById('app');
  ReactDOM.render(<Root />, appElem);
})();
