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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.less']
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
                use: ['style-loader', 'typings-for-css-modules-loader?modules&namedExport&localIdentName=[local]__[hash:base64:5]', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'typings-for-css-modules-loader?modules&namedExport&localIdentName=[local]__[hash:base64:5]', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/styleResource/[name].[ext]'
                }
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