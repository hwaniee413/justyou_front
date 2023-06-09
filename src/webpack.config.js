// webpack.config.js

const webpack = require( 'webpack' );
const path = require( 'path' );
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
    entry: path.resolve( __dirname, 'app.js' ),

    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: [ 'raw-loader' ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [ '@babel/react' ]
                }
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag',
                            attributes: {
                                'data-cke': true
                            }
                        }
                    },
                    'css-loader',                    
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: styles.getPostCssConfig( {
                                themeImporter: {
                                    themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
                                },
                                minify: true
                            } )
                        }
                    }
                ]
            },           
        ]
    },
    resolve: {
        fallback: {
          "buffer": false,
          "crypto": false
        }
    },
    // 중복 로딩 방지
    /*
    externals: {
        '@ckeditor/ckeditor5-core': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-basic-styles': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-editor-classic': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-essentials': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-font': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-heading': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-image': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-link': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-paragraph': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-theme-lark': 'window.CKEDITOR',
        '@ckeditor/ckeditor5-upload': 'window.CKEDITOR'
      },
    
      */

    // Useful for debugging.
    devtool: 'source-map',

    // By default webpack logs warnings if the bundle is bigger than 200kb.
    performance: { hints: false }
};