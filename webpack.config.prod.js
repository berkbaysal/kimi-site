const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: path.resolve(__dirname,"src/index.js"),
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
        }),
        new HtmlWebpackPlugin({
            filename: "./public/index.html",
            template: "./public/index.html",
        }
        )
    ]
};