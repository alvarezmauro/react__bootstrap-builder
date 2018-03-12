/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from './common/AppLayout';

import { Switch, Route } from 'react-router-dom';
import HomePage from "./home/HomePage";
import NotFoundPage from "./notFound/NotFoundPage";
import AboutPage from "./about/AboutPage";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <div>
        <AppLayout title={"App title"}>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>

        </AppLayout>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
