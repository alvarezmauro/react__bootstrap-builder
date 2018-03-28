import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import PropTypes from "prop-types";
import Divider from 'material-ui/Divider';



const styles = () => ({
  root: {
    flexGrow: 1
  },
  previewDivider:{
    marginTop: 20,
    marginBottom: 20
  }
});

const BootstrapPreviewButton = ({classes}) => {
  return (
    <div className={classes.root}>

      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant='subheading' gutterBottom>
            Default buttons
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="sassFrameworkPreviewContainer">
            <button type="button" className="btn btn-primary mr-1">Primary</button>
            <button type="button" className="btn btn-secondary mr-1">Secondary</button>
            <button type="button" className="btn btn-success mr-1">Success</button>
            <button type="button" className="btn btn-danger mr-1">Danger</button>
            <button type="button" className="btn btn-warning mr-1">Warning</button>
            <button type="button" className="btn btn-info mr-1">Info</button>
            <button type="button" className="btn btn-light mr-1">Light</button>
            <button type="button" className="btn btn-dark mr-1">Dark</button>
            <button type="button" className="btn btn-link">Link</button>
          </div>
        </Grid>
      </Grid>

      <div className={classes.previewDivider} ></div>

      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant='subheading' gutterBottom>
            Outline buttons
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="sassFrameworkPreviewContainer">
            <button type="button" className="btn btn-outline-primary mr-1">Primary</button>
            <button type="button" className="btn btn-outline-secondary mr-1">Secondary</button>
            <button type="button" className="btn btn-outline-info mr-1">Info</button>
            <button type="button" className="btn btn-outline-success mr-1">Success</button>
            <button type="button" className="btn btn-outline-warning mr-1">Warning</button>
            <button type="button" className="btn btn-outline-danger mr-1">Danger</button>
            <button type="button" className="btn btn-outline-light mr-1">Light</button>
            <button type="button" className="btn btn-outline-dark">Dark</button>
          </div>
        </Grid>
      </Grid>

      <div className={classes.previewDivider} ></div>

      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant='subheading' gutterBottom>
            Buttons sizes
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="sassFrameworkPreviewContainer">
            <div className="mb-1">
              <button type="button" className="btn btn-primary btn-sm mr-1">Small button</button>
              <button type="button" className="btn btn-secondary btn-sm">Small button</button>
            </div>
            <div className="mb-1">
              <button type="button" className="btn btn-primary mr-1">Default button</button>
              <button type="button" className="btn btn-secondary ">Default button</button>
            </div>
            <div className="mb-1">
              <button type="button" className="btn btn-primary btn-lg mr-1">Large button</button>
              <button type="button" className="btn btn-secondary btn-lg">Large button</button>
            </div>
            <div className="mb-1">
              <button type="button" className="btn btn-primary btn-lg btn-block">Block level button</button>
            </div>
            <div>
              <button type="button" className="btn btn-secondary btn-lg btn-block">Block level button</button>
            </div>
          </div>
        </Grid>
      </Grid>

      <div className={classes.previewDivider} ></div>

      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant='subheading' gutterBottom>
            Active state
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="sassFrameworkPreviewContainer">
            <a href="#" className="btn btn-primary btn-lg active mr-1" role="button" aria-pressed="true">Primary link</a>
            <a href="#" className="btn btn-secondary btn-lg active" role="button" aria-pressed="true">Link</a>
          </div>
        </Grid>
      </Grid>


      <div className={classes.previewDivider} ></div>

      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant='subheading' gutterBottom>
            Disabled state
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="sassFrameworkPreviewContainer">
            <button type="button" className="btn btn-lg btn-primary mr-1" disabled>Primary button</button>
            <button type="button" className="btn btn-secondary btn-lg" disabled>Button</button>
          </div>
        </Grid>
      </Grid>

      <div className={classes.previewDivider} ></div>

    </div>
  );
};

BootstrapPreviewButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BootstrapPreviewButton);
