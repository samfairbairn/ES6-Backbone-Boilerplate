# ES6-Backbone-Boilerplate

Backbone boilerplate with ES6 supported by Babel, Webpack, Gulp and Marionette

## Building and running the server

Install the dependencies  
`npm install`

Install Gulp globally if you dont have it  
`npm install -g gulp`

Build and run dev server (with live reloading)  
`gulp`

Create a minified build ready for production (no live reloading)  
`gulp -p`

Go to [localhost:3000](http://localhost:3000)

### Additional tasks

Serve dev / prod files without updating anything  
`gulp serve` / `gulp serve -p`

Update the dev / prod static assets and serve  
`gulp static-serve` / `gulp static-serve -p`

Remove dev / prod files  
`gulp clean` / `gulp clean -p`

Create dev / prod index file  
`gulp index` / `gulp index -p`

## Build settings

The build settings are located in [settings.js](tasks/settings.js)

The development build will output to a `build` directory and will serve the js `main.js` and css from the webpack development server.

The production build will output to a `dist` directory and will include minified js `main.min.js` and css `style.min.css` files.

You can output to the same directory if you prefer, but note the js/css sources will change in the index.html in development and production builds.

## Tools

* Development tools
	* Gulp
	* Webpack
	* Babel
	* SASS Compiler
	* Autoprefixer
	* Webpacks live reload server
* App tools
	* Backbone
	* Backbone.marionette
	* Lodash
	* Jquery

## Styles

We are utilising [Suit CSS's](http://suitcss.github.io/) ([docs](https://github.com/suitcss/suit/blob/master/doc/README.md)) component based ui development and encouraging modular and decoupled css classes. The css required for each component should be imported in the components js like

`import "compontent_styles";`

and if you need to include some common styles

`import "../styles/common/utils"`

Common classes such as utils with overwriting styles should use `!important` to be sure the styles are applied, see [suitcss' utilities doc](https://github.com/suitcss/suit/blob/master/doc/utilities.md)

## Structure

	- src/
		- index.html
		- scripts/
			- main.js [entry point]
			- app/
				- app.js [app initialiser]
				- controllers/
				- models/
				- views/
					- exampleComponent/
						- exampleComponentView.js
						- exampleComponent.ejs [view template]
						- exampleComponent.scss [view styles]
				- routers/
				- services/
				- common/
		- styles/ [for common styles]
			- compontents/ [styles for common components like buttons etc]
			- main.scss [styles applied throughout app]
			- utils.scss
			- vars.scss
			- fonts.scss
		- static/
			- fonts/
			- images/

## Notes

ES6 doesn't support adding properties directly to the class instance so the current workaround ([see here](http://benmccormick.org/2015/04/07/es6-classes-and-backbone-js/)) is to define it's properties as methods like this:  

    el() { return '#app' }
	
    events() { return {
      'click': 'onClick'
    }}

## TODO

* Image compression
* webp support
* live asset compression/reloading
* Backbone.radio ?