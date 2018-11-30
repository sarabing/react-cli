// http://eslint.org/docs/user-guide/configuring http://eslint.cn/docs/user-guide/configuring
module.exports = {
    parser: 'babel-eslint', //该 npm 模块作为你的解析器 一个对Babel解析器的包装，使其能够与 ESLint 兼容

    extends: [ //添加扩展 
        //'eslint:recommended', //eslint官方推荐的规则
        'airbnb', //前端圈内很流行的airbnb 的规则
        'plugin:flowtype/recommended', // js 静态类型检查工具 eslint-plugin-flowtype
        'plugin:css-modules/recommended', //js中是否用了没有的css  eslint-plugin-css-modules
        'prettier', //美化代码
        'prettier/flowtype',
        'prettier/react',
    ],

    plugins: ['flowtype', 'css-modules', 'prettier'],

    globals: { //全局变量 true 可重写  false不可重写
        __DEV__: true,
    },

    env: { //指定启用的环境，并设置它们为 true
        browser: true,
        node:true
    },

    rules: {
        // Forbid the use of extraneous packages
        // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
        'import/no-extraneous-dependencies': ['error', { packageDir: '.' }],

        // Recommend not to leave any console.log in your code
        // Use console.error, console.warn and console.info instead
        // https://eslint.org/docs/rules/no-console
        'no-console': [
            'error',
            {
                allow: ['warn', 'error', 'info'],
            },
        ],

        // Prefer destructuring from arrays and objects
        // http://eslint.org/docs/rules/prefer-destructuring
        'prefer-destructuring': [
            'error',
            {
                VariableDeclarator: {
                    array: false,
                    object: true,
                },
                AssignmentExpression: {
                    array: false,
                    object: false,
                },
            },
            {
                enforceForRenamedProperties: false,
            },
        ],

        // Ensure <a> tags are valid
        // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
        'jsx-a11y/anchor-is-valid': [
            'error',
            {
                components: ['Link'],
                specialLink: ['to'],
                aspects: ['noHref', 'invalidHref', 'preferButton'],
            },
        ],

        // Allow .js files to use JSX syntax
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],

        // Functional and class components are equivalent from React’s point of view
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/prefer-stateless-function.md
        'react/prefer-stateless-function': 'off',

        // ESLint plugin for prettier formatting
        // https://github.com/prettier/eslint-plugin-prettier
        'prettier/prettier': 'error',
    },

    settings: {
        // Allow absolute paths in imports, e.g. import Button from 'components/Button'
        // https://github.com/benmosher/eslint-plugin-import/tree/master/resolvers
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src'],
            },
        },
    },
};
