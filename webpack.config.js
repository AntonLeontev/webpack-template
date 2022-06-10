const os = require('os');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


let mode = 'development';
if (process.env.NODE_ENV === 'production') {
	mode = 'production';
}
console.log((mode + ' mode' + os.EOL).toUpperCase());


module.exports = {
	mode: mode,
	entry: {
		app: './src/index.js'
	},
	output: {
		clean: true,
		filename: '[name].[contenthash].js',
		assetModuleFilename: 'assets/[file]',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/'
	},
	devtool: 'source-map',
	optimization: {
		splitChunks: {
			chunks: 'all',
		}
	},
	devServer: {
		client: {
			overlay: true
		},
		static: {
			directory: path.resolve(__dirname, 'src'),
			publicPath: './src'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css'
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	module: {
		rules:
			[
				{
					test: /\.(sa|sc|c)ss$/,
					use:
						[
							mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
							"css-loader",
							{
								loader: "postcss-loader",
								options: {
									postcssOptions: {
										plugins: [
											[
												"postcss-preset-env",
												{
													// Options
												},
											],
										],
									},
								},
							},
							"sass-loader"
						]
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ['@babel/preset-env']
						}
					}
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.(woff|woff2|ttf|eot|otf)$/i,
					type: 'asset/resource',
				},
				{
					test: /\.html$/i,
					loader: "html-loader",
				},
			]
	}
}
