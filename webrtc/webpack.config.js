var webpack = require('webpack');
path = require('path');

module.exports = {
    mode: 'none',
    entry: {
        './dist/EMedia_x1v1': ['./src/entry']
    },
    output: {
        path: __dirname,
        publicPath: __dirname,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        noParse: [/.*adapter.js$/],
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader!css-loader!sass-loader' },
                ]
            }
        ]
    },
    plugins: [
    ]
}
;

