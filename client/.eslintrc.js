module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "requireConfigFile": false,
    },
    "plugins": [
        "react"
    ],
    "rules": {
    },
    "parser": "@babel/eslint-parser",
    "presets": [
        "@babel/preset-react"
    ]
}
