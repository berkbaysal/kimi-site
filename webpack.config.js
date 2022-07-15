const path = require("path");

module.exports = {
    mode: "development",
    entry: './src/index.js',
    output: {
        filename: "main.js",
        
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
        ]
    },
    devServer: {
        static: path.join(__dirname,"public"),
        port: 9000,
    }
};