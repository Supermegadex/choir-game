const path = require('path');


module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      // This rule loads TypeScript files 
      // and transpiles them into JavaScript.


      // Check out https://github.com/babel/babel-loader
      // if you want to use JavaScript instead.
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      // This rule simply moves your index.html file
      // to the root of your dist folder.
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            },
          },
        ],
      },
      // For images.
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[hash].[ext]'
            },
          },
        ],
      },
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'source-map',
  mode: "development"
};
