#Installation
We use npm, if use yarn change commands accordingly

##Pre-installation

We assume that you already have installed webpack, otherwise do following:
```shell script
npm i webpack webpack-cli --save-dev
```

Now add the webpack command inside package.json:
```json
{
    "scripts": {
      "build": "webpack --mode production"
    }
}
```


##Set up React, webpack, and Babel

Pull in the dependencies:
```shell script
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

Put in `.babelrc` presets:
```
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

Install react:
```shell script
npm i react react-dom
```

Edit webpack.config.js:  
more info here: https://webpack.js.org/configuration/output/#outputlibrarytarget
```javascript
module.exports = {
  entry: './obsy_bootstrap.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'obsy_bootstrap.js',
    libraryTarget: 'var',
    library: 'demo'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
    ]
  }
};
```

Create directory `lib`:
```shell script
mkdir lib
```

Run build
```shell script
npm run build
```