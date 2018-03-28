/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "../../../components";

import BootstrapPreviewButtons from './BootstrapPreviewButtons';

const styles = () => ({
  root: {
    flexGrow: 1
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  }
});

/*
 * classes - Styles
 */
const BootstrapPreviewEdit = ({selectedSection, sassFrameworkVariablesOriginal, sassFrameworkCompiled, classes}) => {
  console.log(sassFrameworkVariablesOriginal);

  const PreviewSection = () => {
    switch (selectedSection) {
      case 'Buttons':
        return (<BootstrapPreviewButtons/>)
    }
  };

  return (
    <div className={classes.root}>
      <RegularCard
        cardTitle={selectedSection}
        content={
          <Grid container>
            <Grid item xs={4}>
              Left section
            </Grid>
            <Grid item xs={8}>
              <style>{sassFrameworkCompiled}</style>
              <div>
                <PreviewSection />
              </div>
            </Grid>
          </Grid>
        }
      />
    </div>
  );
};

BootstrapPreviewEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  sassFrameworkCompiled: PropTypes.string,
  sassFrameworkVariablesOriginal: PropTypes.array,
  selectedSection: PropTypes.string
};

export default withStyles(styles)(BootstrapPreviewEdit);
