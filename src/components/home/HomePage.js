/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// Redux Actions
import * as sassFrameworkBuilderActions from "../../actions/sassFrameworkBuilderActions";

// Require Sass.js library
const Sass = require("../../../static/sassjs/sass");

// Bootstrap preview components
import BootstrapPreviewSass from './bootstrapRelatedData/BootstrapPreviewSass'
import BootstrapPreviewButtons from './bootstrapPreview/BootstrapPreviewButtons';

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.sass = this.getSassJsInstance();

    this.state = {
      sassFrameworkBuilderData: Object.assign({}, props.sassFrameworkBuilderData),

      sassFrameworkMainFileString: '',
      sassFrameworkVariablesString: '',
      sassFrameworkVariables: {},
      sassFrameworkCompiled: ''
    };

    this.getSassJsInstance = this.getSassJsInstance.bind(this);
    this.getSassFrameworkVariablesFileString= this.getSassFrameworkVariablesFileString.bind(this);
    this.getSassFrameworkVariables = this.getSassFrameworkVariables.bind(this);

    this.initBootstrapSass = this.initBootstrapSass.bind(this);
    this.preloadSassFilesAndReturnMainFileContent = this.preloadSassFilesAndReturnMainFileContent.bind(this);
    this.compileSassFramework = this.compileSassFramework.bind(this);
    this.compileSassFrameworkBootstrap = this.compileSassFrameworkBootstrap.bind(this)
  }

  componentDidMount() {
    this.props.actions.loadSassFrameworkData().then(() => {
      this.setState({sassFrameworkBuilderData: this.props.sassFrameworkBuilderData});
      this.initBootstrapSass();
    });
  }

  initBootstrapSass(){
    let {sassFrameworkBuilderData} =  this.state;

    this.setState({
      sassFrameworkVariablesString: this.getSassFrameworkVariablesFileString(sassFrameworkBuilderData.sassFrameworkVariablesOriginal)
    });

    this.setState({
      sassFrameworkVariables: this.getSassFrameworkVariables(sassFrameworkBuilderData.sassFrameworkVariablesOriginal)
    });


    this.preloadSassFilesAndReturnMainFileContent(
      this.sass,
      sassFrameworkBuilderData.sassFrameworkFilesPathBase,
      sassFrameworkBuilderData.sassFrameworkFilesPathDirectory,
      sassFrameworkBuilderData.sassFrameworkFilesList,
      sassFrameworkBuilderData.sassFrameworkMainFile).then( sassFrameworkMainFileContent => {
        this.setState({sassFrameworkMainFileString: sassFrameworkMainFileContent});
        this.compileSassFramework(
          this.sass,
          this.state.sassFrameworkVariablesString,
          this.state.sassFrameworkMainFileString,
          sassFrameworkBuilderData.sassFrameworkType).then(function (data){
            this.setState({sassFrameworkCompiled: data});
          }.bind(this)
        )
      });
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
  Return an String with all the bootstrap variables
  */
  getSassFrameworkVariablesFileString(bootstrapSassVariables = []) {
    let string =
      '' +
      '/*\n' +
      '* Mauro Alvarez http://www.mauroalvarez.com \n' +
      '*  \n' +
      '**/\n';

    if(bootstrapSassVariables.length > 0){
      for (let i = 0; i < bootstrapSassVariables.length; i++) {
        string += '\n\n// ' + bootstrapSassVariables[i].name + '\n';

        for (let j = 0; j < bootstrapSassVariables[i].data.length; j++) {
          string +=
            bootstrapSassVariables[i].data[j].key + ': ' + bootstrapSassVariables[i].data[j].value + ';\n'
        }
      }

      // string += cssToAdd;
    }

    return string;
  }

  /*
  return all the Bootstrap variables
  */
  getSassFrameworkVariables(sassFrameworkVariables = []){
    let variables = {};
    let fonts = [];
    for (let i = 0; i < sassFrameworkVariables.length; i++) {
      for (let j = 0; j < sassFrameworkVariables[i].data.length; j++) {
        if (sassFrameworkVariables[i].data[j].type === 'font') {
          fonts.push(sassFrameworkVariables[i].data[j].value)
        }
        variables[sassFrameworkVariables[i].data[j].key] = sassFrameworkVariables[i].data[j].value
      }
    }

    return {variables: variables, fonts: fonts};
  }

  /*
   * Preload all the SASS files related to the SASS framework and return a promise with the content of the main file.
   *
   * {sass} - Sass.js instance
   * (sassFrameworkFilesPathBase) - Base path of the SASS frameworks (relative to the sass.worker.js)
   * (sassFrameworkFilesPathDirectory) - Directory where the SASS framework is (relative to sassFrameworkFilesPathBase)
   * [sassFrameworkFilesList] - Array with the list of all the files to preload
   * (sassMainFile) - Main file of the SASS framework
   *
  */
  preloadSassFilesAndReturnMainFileContent(sass, sassFrameworkFilesPathBase, sassFrameworkFilesPathDirectory, sassFrameworkFilesList, sassMainFile){

    return new Promise((resolve, reject) => {
      sass.preloadFiles(sassFrameworkFilesPathBase, sassFrameworkFilesPathDirectory, sassFrameworkFilesList, function() {
        // Reading main sass file
        sass.readFile(sassMainFile, function callback(bootstrapMainFileContent) {
          if(bootstrapMainFileContent != null && bootstrapMainFileContent !== undefined && bootstrapMainFileContent !== ''){
            resolve(bootstrapMainFileContent);
          }else{
            reject(new Error('fail'))
          }
        })
      });
    });
  }

  /*
   * Create variables.sass file on the fly using the values saved in sassFrameworkVariablesString.
   * Compile SASS framework using the variables.sass file created and sassFrameworkMainFileString and return
   * a promise with the outcome of that compilation.
   *
   * {sass} - Sass.js instance
   * (sassFrameworkVariablesString) - String with tha variables for the sass framework
   * (sassFrameworkMainFileString) - String with the content of the main sass file of the framework
   *
  */
  compileSassFramework(sass, sassFrameworkVariablesString, sassFrameworkMainFileString, sassFrameworkType) {
    switch (sassFrameworkType) {
      case 'bootstrap':
        return this.compileSassFrameworkBootstrap(sass, sassFrameworkVariablesString, sassFrameworkMainFileString);
    }
  }

  compileSassFrameworkBootstrap(sass, sassFrameworkVariablesString, sassFrameworkMainFileString) {

    return new Promise((resolve, reject) => {
      // sass.writeFile('variables.scss', sassFrameworkVariablesString);
      sass.writeFile('preview.scss', BootstrapPreviewSass);
      sass.compile(
        // ".test{ @import '_functions.scss'; @import 'variables';" + sassFrameworkMainFileString + '}',
        ".sassFrameworkPreviewContainer{ @import '_functions.scss'; " + sassFrameworkMainFileString + " @import 'preview'; }",
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
        <style>{this.state.sassFrameworkCompiled}</style>
        <div className=""></div>
        <div className="sassFrameworkPreviewContainer">
          <BootstrapPreviewButtons/>
        </div>
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.element,
  // Data coming from API
  sassFrameworkBuilderData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    sassFrameworkFilesList: PropTypes.array.isRequired,
    sassFrameworkFilesPathBase: PropTypes.string.isRequired,
    sassFrameworkFilesPathDirectory: PropTypes.string.isRequired,
    sassFrameworkMainFile: PropTypes.string.isRequired,
    sassFrameworkVariablesOriginal: PropTypes.array.isRequired,
    sassFrameworkType: PropTypes.string.isRequired
  }).isRequired,


  // Local Data
  sassFrameworkMainFileString: PropTypes.string,
  sassFrameworkVariablesString: PropTypes.string,
  sassFrameworkVariables: PropTypes.object,
  sassFrameworkCompiled: PropTypes.string,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    sassFrameworkBuilderData: state.sassFrameworkBuilder
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sassFrameworkBuilderActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
