/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

import * as HomePageVariables from './HomePageVariables';

const Sass = require("../../../static/sassjs/sass");

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false
    };
  }

  render() {

    Sass.setWorkerUrl('static/sassjs/sass.worker.js');

    // initialize a Sass instance
    let sass = new Sass();
    let test = null;

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

    let base = '/static/bootstrap/scss/';
    let directory = '';

    sass.preloadFiles(base, directory, HomePageVariables.bootstrapFiles, function() {
      // console.log('Reading bootstrap file');
      sass.readFile('bootstrap.scss', function callback(bootstrapContent) {
        console.log(bootstrapContent);
      })
    });


    return (
      <div>
        <h1>React Slingshot</h1>

        {test}

        <h2>Get Started</h2>
        <ol>
          <li>Review the <Link to="/fuel-savings">demo app</Link></li>
          <li>Remove the demo and start coding: npm run remove-demo</li>
        </ol>
      </div>
    );
  }
}

HomePage.propTypes = {
  children: PropTypes.element
};

export default HomePage;
