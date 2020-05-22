const path = require('path');

module.exports = {
    entry: {
        main: './src/typescript/main.ts',
        extra: './src/typescript/extra.ts',
    },
    output: {
        path: path.resolve(__dirname, 'build/js/'),
        pathinfo: false
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    mode: 'development',
    optimization: {
        minimize: true    
    }
};