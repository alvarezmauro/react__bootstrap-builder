/* eslint-disable import/no-named-as-default */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// UI components
import Paper from 'material-ui/Paper';
import { MenuItem, MenuList } from 'material-ui/Menu';
import { Grid } from "material-ui";
import Divider from 'material-ui/Divider';

import { ItemGrid } from "../../components";

// Redux Actions
import * as sassFrameworkBuilderActions from "../../actions/sassFrameworkBuilderActions";

// Require Sass.js library
const Sass = require("../../../static/sassjs/sass");

// Bootstrap preview components
import BootstrapPreviewEdit from './boostrapPreviewEdit/BoostrapPreviewEdit';
import BootstrapPreviewSass from './bootstrapRelatedData/BootstrapPreviewSass';

class SassFrameworkBuilder extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.sass = this.getSassJsInstance();

    this.state = {
      sassFrameworkBuilderData: Object.assign({}, props.sassFrameworkBuilderData),

      sassFrameworkMainFileString: '',
      sassFrameworkVariablesString: '',
      sassFrameworkVariables: {},
      sassFrameworkCompiled: '',
      selectedSection: 'Buttons'
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
  getSassFrameworkVariablesFileString(sassFrameworkVariables = []) {
    let string =
      '' +
      '/*\n' +
      '* Mauro Alvarez http://www.mauroalvarez.com \n' +
      '*  \n' +
      '**/\n';

    if(sassFrameworkVariables.length > 0){

      for (let i = 0; i < sassFrameworkVariables.length; i++) {
        let componentVariables = sassFrameworkVariables[i];

        string += '\n\n// ' + componentVariables.name + '\n';

        for (let q = 0; q < componentVariables.data.length; q++) {
          let componentVariablesGroup = componentVariables.data[q];

          for (let j = 0; j < componentVariablesGroup.data.length; j++) {
            if (typeof(componentVariablesGroup.data[j].value) === 'object'){
              let tempValue = componentVariablesGroup.data[j].key + ' : (';

              for (let key in componentVariablesGroup.data[j].value) {
                if (componentVariablesGroup.data[j].value.hasOwnProperty(key)) {
                  tempValue += key + ':' + componentVariablesGroup.data[j].value[key] + ',';
                }
              }
              tempValue = tempValue.slice(0, -1);
              string += tempValue + ');\n'
            }else{
              string += componentVariablesGroup.data[j].key + ': ' + componentVariablesGroup.data[j].value + ';\n'
            }

          }
        }

      }

      string += `@include _assert-ascending($grid-breakpoints, "$grid-breakpoints");
@include _assert-starts-at-zero($grid-breakpoints);
@include _assert-ascending($container-max-widths, "$container-max-widths");`;
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
      sass.writeFile('variables.scss', sassFrameworkVariablesString);
      sass.writeFile('preview.scss', BootstrapPreviewSass);
      sass.compile(
        // ".test{ @import '_functions.scss'; @import 'variables';" + sassFrameworkMainFileString + '}',
        ".sassFrameworkPreviewContainer{; @import '_functions.scss'; @import 'variables';" + sassFrameworkMainFileString + " @import 'preview'; }",
        function(result) {
          // console.log(result);
          if (result.status === 0) {
            resolve(result.text)
          } else {
            reject(result.message)
          }
        }
      )
    });
  }

  /*
   *  Update Sass Variables
  */


  render() {
    const {sassFrameworkBuilderData, selectedSection, sassFrameworkCompiled} = this.state;

    return (
      <div>
          <Grid container>
            <ItemGrid xs={7} sm={8} md={10}>
              <BootstrapPreviewEdit selectedSection={selectedSection} sassFrameworkCompiled={sassFrameworkCompiled} sassFrameworkVariablesOriginal={sassFrameworkBuilderData.sassFrameworkVariablesOriginal}  />
            </ItemGrid>

            {/* Section Menu */}
            <ItemGrid xs={5} sm={4} md={2}>
              <Paper >
                <MenuList>
                  <MenuItem>Color System</MenuItem>
                  <MenuItem>Grid System</MenuItem>
                  <Divider />
                  <MenuItem>Components</MenuItem>
                </MenuList>
              </Paper>
            </ItemGrid>

          </Grid>
      </div>
    );
  }
}

SassFrameworkBuilder.propTypes = {
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
  selectedSection: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(SassFrameworkBuilder);
