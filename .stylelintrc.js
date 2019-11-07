module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-scss'
  ],
  rules: {
    "number-leading-zero": "never",
    "at-rule-empty-line-before": ["always", {
      except: [
        "blockless-after-same-name-blockless",
        "first-nested",
      ],
      ignore: ["after-comment"],
      ignoreAtRules: ["import", "extend", "include", "else"]
    }],
    "selector-pseudo-class-no-unknown": [true, {
      ignorePseudoClasses: ["export", "global"]
    }],
    "function-url-quotes": "always",
    "selector-class-pattern": '^[a-z][a-zA-Z0-9]+$',

    "scss/at-else-if-parentheses-space-before": "never",
    "scss/at-else-empty-line-before": "never",
    "scss/at-function-parentheses-space-before": "never",
    "scss/at-import-no-partial-leading-underscore": true,
    "scss/at-import-partial-extension-blacklist": ["scss"],
    "scss/at-mixin-argumentless-call-parentheses": "never",
    "scss/at-mixin-parentheses-space-before": "never",
    "scss/dollar-variable-colon-space-after": "always",
    "scss/dollar-variable-colon-space-before": "never",
    "scss/operator-no-unspaced": true,
    "scss/selector-no-redundant-nesting-selector": true,
    "scss/no-duplicate-dollar-variables": true,
  },
  ignoreFiles: [
    "node_modules/**/*",
    "**/*.html",
    "**/*.tsx",
  ]
}
