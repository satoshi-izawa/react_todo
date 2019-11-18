module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "useJSXTextNode": true,
    "sourceType": "module"
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "settings": {
    "import/resolver": "webpack"
  },
  "rules": {
    "max-len": [
      "error",
      {
        "code": 150
      }
    ],
    "prefer-promise-reject-errors": [
      "off"
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "lines-between-class-members": [
      "error",
      "always",
      {
        // フィールドを定義するときにスカスカになってしまうので、空行のときは許可
        "exceptAfterSingleLine": true
      }
    ],
    // TSのメソッドはthisを使うことも限らないので許可
    "class-methods-use-this": "off",
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    // フィールドはアンダースコア始まりにしてほしいので、thisのあとは許可
    "no-underscore-dangle": [
      "error",
      {
        "allowAfterThis": true
      }
    ],
    // importの仕方を統一したく、defaultは使用してほしくないので許可
    "import/prefer-default-export": "off",
    // JSX内で三項演算子が使いにくかったので許可
    "no-confusing-arrow": "off",
    // 三項演算子でメソッドを呼び出すことを許可する
    "no-unused-expressions": [
      "error",
      {
        "allowTernary": true
      }
    ],
    "no-console": ["off"],
    // TSの型推論なら候補が全て列挙されているか判定でき優秀なので、これらを無効化
    "default-case": ["off"],
    "consistent-return": ["off"],
    "no-useless-constructor": ["off"],
    // ambientでないd.tsからのimportで軒並み警告が出るので無効化
    "import/no-unresolved": ["off"],
    // サポートに厳密に沿うのは難しいので、これらの指定を無効化
    "jsx-a11y/no-noninteractive-tabindex": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    // Optional Chainingが使えないので一旦オフ
    "no-unused-expressions": "off",
    // cssモジュール周りをimportするとき不便だったので無効化
    "@typescript-eslint/no-var-requires": "off",
    // 時々使うので無効化
    "@typescript-eslint/ban-ts-ignore": "off",
    // メソッド側に戻り値を書くより、自然な推論に任せてほしいで無効化
    "@typescript-eslint/explicit-function-return-type": "off",
    // 継承目的のインターフェースを用意することがあるので無効化
    "@typescript-eslint/no-empty-interface": "off",
    // 基底クラスのメソッドで未使用変数を使うことがあるので、アンダースコア始まりは許可
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
  }
}
