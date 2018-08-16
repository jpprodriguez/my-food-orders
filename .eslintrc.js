module.exports = {
    "parser": "babel-eslint",
    "rules": {
        "strict": 0
    },
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "extends": "prettier",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "prettier"
    ],
    "rules": {
        "comma-dangle": [
            "warn",
            "never"
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "error"
        ],
        "semi": [
            "error",
            "always"
        ],
        "prettier/prettier": "error",
        /* Advanced Rules*/
        "no-unused-expressions": "warn",
        "no-useless-concat": "warn",
        "block-scoped-var": "error",
        "consistent-return": "error"
    }
};