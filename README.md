# HTML Theme Builder
HTML Theme Builder is an environment to build HTML templates more efficiently.

## How to setup
1. Download this as a zip. Then extract it and rename to your project
2. Install nodejs and follow the instructions on how to do that on http://nodejs.org/
3. After installing nodejs on your computer open up your Command Line Tool and execute: $ npm install --global gulp
4. Navigate to the root of your project and execute: $ npm install
5. Now all setup done, run it by executing: $ gulp

## Structure
The root of your project has the following basic structure:

```javascript
project
|
|-- app
|    |
|    |-- _sections
|    |    |
|    |    |-- header.htm
|    |    |-- footer.htm
|    |    |-- home-slider.htm
|    |    |-- home-about.htm
|    |    |-- element-top-area.htm
|    |    |-- element-footer.htm
|    |
|    |-- img
|    |    |
|    |    |-- elements
|    |    |
|    |    |-- products
|    |    |
|    |    |-- other
|    |    |
|    |    |-- patterns
|    |    |
|    |    |-- shop
|    |    |
|    |    |-- slider
|    |    |
|    |    |-- logo.png
|    |    |-- logo-sm-light.png
|    |    |-- favicon.png
|    |
|    |-- js
|    |    |
|    |    |-- custom.js
|    |
|    |-- plugins
|    |    |
|    |    |-- bootstrap
|    |    |
|    |    |-- font-awesome
|    |    |
|    |    |-- owl-carousel
|    |    |
|    |    |-- smoothscroll
|    |
|    |-- scss
|    |    |
|    |    |-- partials
|    |    |    |
|    |    |    |-- _media-query.scss
|    |    |    |-- _mixins.scss
|    |    |    |-- _variables.scss
|    |    |
|    |    |-- elements
|    |    |    |
|    |    |    |-- _basic-alert.scss
|    |    |    |-- _basic-card.scss
|    |    |    |-- _basic-form.scss
|    |    |    |-- _elements.scss
|    |    |
|    |    |-- _header.scss
|    |    |-- _footer.scss
|    |    |-- _about.scss
|    |    |-- _sliders.scss
|    |    |-- _testimonials.scss
|    |    |-- style.scss
|    |
|    |-- index.html
|
|-- builds
|
|-- Documentation
|
|-- gulpfile.js
|-- package.json
`-- README.md
```

### 1.0 project/app
The root of app folder contains main html files which only combine HTM files from project/app/_sections folder.

### 1.1 project/app/_sections
This folder contains all the includable HTML sections. Name the global sections like header/footer with no prefix and specific page sections with that page prefix.

### 1.2 project/app/img
This folder contains all the images. Keep global images like logo in root, reusable images like patterns, elements in specific folder and specific type images like sliders in separate folder.

### 1.3 project/app/js
This folder contains custom js files.

### 1.4 project/app/plugins
This folder contains all the plugins. Make sure all the plugins are up-to-dated. Do not edit any of these plugin files. Customize js code/files only from project/app/js folder and css code/files from the project/app/scss folder.

### 1.5 project/app/scss
This folder contains the main scss file in which imports all the partials, elements scss and all other page scss files.

### 1.6 project/app/scss/partials
This folder contains variables, mixins and media-query files and all these files have been imported in app/scss/style.scss file

### 1.6 project/app/scss/elements
This folder contains every separate elements own scss file.

### 2.0 project/builds
This folder contains all the generated files form project/app folder. When gulp will run, files will be generated automatically.

### 3.0 project/Documentation
This folder contains theme documentation template.

### 4.0 project/gulpfile.js
This is the gulp configuration file.

### 5.0 project/package.json
This is NPM package control file. All Node packages are listed as devDependencies in this file.
