module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "react-app",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {

        'indent': [2, 4], // 强制使用一致的缩进
        'eqeqeq': [2, 'always'], // 要求使用 === 和 !==
        'semi': [2, 'never'], // 要求或禁止使用分号代替 ASI 
        'quotes': [2, 'single'],  // 强制使用一致的反勾号、双引号或单引号

        "array-bracket-spacing": [
            "error",
            "always"
        ],
        "object-curly-spacing": [
            "error",
            "always"
        ],
        "semi": [
            "error",
            "never"
        ],
        "template-curly-spacing": ["error", "never"],
        "jsx-a11y/label-has-associated-control": "off",
        "jsx-a11y/label-has-for": "off",
        "jsx-a11y/anchor-is-valid": [0],
        "jsx-a11y/no-static-element-interactions": [0],
        "jsx-a11y/click-events-have-key-events": [0],
        "jsx-a11y/alt-text": "off",
        "jsx-a11y/href-no-hash": "off"
    }
};
