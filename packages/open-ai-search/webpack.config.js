const path = require('path');
const { merge: webpackMerge } = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        OpenAiSearch: path.join(__dirname, 'src/OpenAiSearch.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
    },
    },
});
