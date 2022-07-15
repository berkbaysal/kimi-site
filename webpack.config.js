const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "main.js",
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ],
            },
        ]
    },
    devServer: {
        static: path.join(__dirname,"public"),
        port: 9000,
    },
    plugins:[
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.join(__dirname,'src/img'),
                    to: path.join(__dirname,'dist/src/img'),
                    toType: 'dir',
                    noErrorOnMissing: true
                }
            ]
        })
    ]
};