# React Started Kit

This is a `react starter kit` without a server, router or a redux store with bare minimum `webpack` configurations - only what's needed nothing else. An excellent starter to build your application on and incrementally add more features to your `webpack` configuration(s).

***

##### Steps On How to Use This Kit
* Clone this repository
* Do an `$ npm intall`
* Then depending on the build you want to run use the following to command in your terminal

> npm run start:dev

> npm run start:prod

***

##### Things Added To This Starter Kit
- [x] Webpack 4 added
- [x] Bootstrap 4 with jQuery, Popper.js
- [x] webpack development, production environment setup, ability to add as many environments as you want by simply chaning the ```--env.NODE_ENV``` in the `script` in `package.json`
- [x] scss support
- [x] @babel/env, @babel/preset-react, @babel/preset-stage-2 (version 7.0.0-beta.56)
- [x] Webpack merge added to manage configurations in a very smart way.

##### Important Notes / Dependency Bugs
- node-sass vulnerabilities does not effect production and will be fixed in v5
- webpack 4 console warning: `entrypoint undefined =` https://github.com/jantimon/html-webpack-plugin/issues/895
