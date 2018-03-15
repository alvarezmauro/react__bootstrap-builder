/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

// Bootstrap related data
import bootstrapSassFilesList from './bootstrapRelatedData/BootstrapSassFilesList';
// import BootstrapSassFunctionsList from './BootstrapSassFunctionsList';
import bootstrapSassVariables from './bootstrapRelatedData/BootstrapSassVariables';
// import GoogleFontsList from './GoogleFontsList';

// Bootstrap preview components
import BootstrapPreviewButtons from './bootstrapPreview/BootstrapPreviewButtons';

// Require Sass.js library
const Sass = require("../../../static/sassjs/sass");

// const BootstrapScss = require("../../../static/bootstrap/scss/bootstrap.scss");


const cssToAdd = `
      $custom-checkbox-indicator-icon-checked: str-replace(
        url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#{$custom-control-indicator-checked-color}' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E"),
        '#',
        '%23'
        )
        !default;
      $custom-checkbox-indicator-icon-indeterminate: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='#{$custom-checkbox-indicator-indeterminate-color}' d='M0 2h4'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $custom-radio-indicator-icon-checked: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='#{$custom-control-indicator-checked-color}'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      
      $custom-select-indicator: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='#{$custom-select-indicator-color}' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $navbar-dark-toggler-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-dark-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $navbar-light-toggler-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='#{$navbar-light-color}' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $carousel-control-prev-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
      $carousel-control-next-icon-bg: str-replace(
          url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#{$carousel-control-color}' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E"),
          '#',
          '%23'
        )
        !default;
    `;

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      bootstrapMainFile: '',
      stringBootstrapVariables: '',
      BootstrapVariables: null,
      BootstrapCompiled: ''
    };

    this.getSassJsInstance = this.getSassJsInstance.bind(this);
    this.getStringBootstrapSassVariables = this.getStringBootstrapSassVariables.bind(this);
    this.getBootstrapVariables = this.getBootstrapVariables.bind(this);

    this.initBootstrapSass = this.initBootstrapSass.bind(this);
    this.getBootstrapMainScssFile = this.getBootstrapMainScssFile.bind(this);
    this.compileSass = this.compileSass.bind(this);
  }

  componentDidMount() {
    this.initBootstrapSass();
  }

  /*
  initialize a sass.js instance
  */
  getSassJsInstance(){
    Sass.setWorkerUrl('static/sassjs/sass.worker.js');
    let sass = new Sass();

    sass.options({
      // Format output: nested, expanded, compact, compressed
      // style: window.Sass.style.compressed,
      // Decimal point precision for outputting fractional numbers
      // (-1 will use the libsass default, which currently is 5)
      precision: -1,
      indentedSyntax: false,
      // If you want inline source comments
      comments: false,
      // String to be used for indentation
      indent: '',
      // String to be used to for line feeds
      linefeed: ''
    });

    return sass;
  }

  /*
  Save in the state variable "stringBootstrapVariables" an String with all the variables values + the sass in the
  "cssToAdd" variable
  */
  getStringBootstrapSassVariables(bootstrapSassVariables) {
    let string =
      '' +
      '/*\n' +
      '* Mauro Alvarez http://www.mauroalvarez.com \n' +
      '*  \n' +
      '**/\n';

    for (let i = 0; i < bootstrapSassVariables.length; i++) {
      string += '\n\n// ' + bootstrapSassVariables[i].name + '\n';

      for (let j = 0; j < bootstrapSassVariables[i].data.length; j++) {
        string +=
          bootstrapSassVariables[i].data[j].key + ': ' + bootstrapSassVariables[i].data[j].value + ';\n'
      }
    }

    // string += cssToAdd;

    this.setState({stringBootstrapVariables: string});
  }

  /*
  Save in the state variable "BootstrapVariables" all the Bootstrap variables
  */
  getBootstrapVariables(bootstrapSassVariables){
    let variables = {};
    let fonts = [];
    for (let i = 0; i < bootstrapSassVariables.length; i++) {
      for (let j = 0; j < bootstrapSassVariables[i].data.length; j++) {
        if (bootstrapSassVariables[i].data[j].type === 'font') {
          fonts.push(bootstrapSassVariables[i].data[j].value)
        }
        variables[bootstrapSassVariables[i].data[j].key] = bootstrapSassVariables[i].data[j].value
      }
    }

    this.setState({BootstrapVariables: {variables: variables, fonts: fonts}});
  }

  initBootstrapSass(){
    let sass = this.getSassJsInstance();

    this.getStringBootstrapSassVariables(bootstrapSassVariables);
    this.getBootstrapVariables(bootstrapSassVariables);

    this.getBootstrapMainScssFile(sass).then( bootstrapMainFileContent => {
      this.setState({bootstrapMainFile: bootstrapMainFileContent});
      this.compileSass(sass, this.state.stringBootstrapVariables, this.state.bootstrapMainFile).
      then(function (data){
        let bootstrapCompiled = data;
        this.setState({bootstrapCompiled: bootstrapCompiled});
        }.bind(this)
      )
    });
  }

  getBootstrapMainScssFile(sass){
    let base = '../bootstrap/scss/';
    let directory = '';

    return new Promise((resolve, reject) => {
      sass.preloadFiles(base, directory, bootstrapSassFilesList, function() {
        // Reading bootstrap file
        sass.readFile('bootstrap.scss', function callback(bootstrapMainFileContent) {
          if(bootstrapMainFileContent != null && bootstrapMainFileContent !== undefined && bootstrapMainFileContent !== ''){
            resolve(bootstrapMainFileContent);
          }else{
            reject(new Error('fail'))
          }
        })
      });
    });
  }

  compileSass(sass, stringBootstrapVariables, bootstrapMainFile) {
    return new Promise((resolve, reject) => {
      sass.writeFile('toAddScss.scss', stringBootstrapVariables);
      sass.compile(
            ".test{ @import '_functions.scss'; @import 'toAddScss';" + bootstrapMainFile + '}',
            // bootstrapMainFile,
        function(result) {
              console.log(result);
              if (result.status === 0) {
                resolve(result.text)
              } else {
                reject(result.message)
              }
            }
          )
    });
  }


  render() {

    return (
      <div>
        <style>{this.state.bootstrapCompiled}</style>
        <BootstrapPreviewButtons/>

      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.element,
  bootstrapMainFile: PropTypes.string,
  stringBootstrapSassVariables: PropTypes.string,
  BootstrapVariables: PropTypes.object,
  bootstrapCompiled: PropTypes.string
};

export default HomePage;
