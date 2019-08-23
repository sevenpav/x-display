const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { getDirectoriesBasenames } = require('./build/utils.js')
const dirs = require('./build/dirs.js')

const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const pages = getDirectoriesBasenames(dirs.pages)

const instances = pages.map(page => {
	return new HtmlWebpackPlugin({
		template: `${dirs.pages}/${page}/${page}.pug`,
		filename: `${page}.html`,
		chunks: ['bundle', page],
		minify: !isDev
	})
})

const entries = pages.reduce((acc, page) => {
	acc[page] = `${dirs.pages}/${page}/${page}.js`

	return acc
}, {})

const config = {
	context: dirs.src,
	entry: entries,
	devtool: isDev && 'inline-source-map',
	output: {
		filename: 'js/[name].js',
		path: dirs.dist
	},
	resolve: {
		extensions: ['.js', '.scss', '.pug'],
		alias: {
			'@': dirs.src
		}
	},
	optimization: {
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					output: {
						comments: false
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: require('cssnano'),
				cssProcessorPluginOptions: {
					preset: ['default', { discardComments: { removeAll: true } }]
				}
			})
		],
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendor: {
					test: /(node_modules|assets)/,
					name: 'bundle'
				},
				styles: {
					name: 'bundle',
					test: /\.s?css$/,
					enforce: true
				}
			}
		}
	},
	devServer: {
		open: true
	},
	mode: isDev ? 'development' : 'production',
	watch: isDev,
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [require('autoprefixer')()]
						}
					},
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [`${dirs.src}/assets/scss/mixins.scss`]
						}
					}
				]
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './fonts/',
							name: '[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: './img/',
							name: '[name][hash].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							disable: isDev,
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							pngquant: {
								quality: '65-90',
								strip: true
							},
							svgo: {
								cleanupIDs: true
							}
						}
					}
				]
			},
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
                options: {
                    pretty: true
                }
			}
		]
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
		...instances,
		new MiniCssExtractPlugin({
			filename: 'css/[name].css'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	].filter(Boolean)
}

module.exports = config
