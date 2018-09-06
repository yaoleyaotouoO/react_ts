var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: "./index.tsx"
    },
    output: {
        filename: "[name].js",
        path: __dirname + "/dist"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /(\.js)|(\.jsx)|(\.ts)|(\.tsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['react', 'es2015', 'stage-0', "mobx"],
                    plugins: ['transform-runtime']
                }
            },
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[name]__[local]-[hash:base64:5]']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader?modules&localIdentName=[local]__[hash:base64:5]', 'less-loader']
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                hash: true,
                inject: true,
                chunks: ['app'],
                template: 'index.html',
                filename: 'index.html'
            })
    ]
};