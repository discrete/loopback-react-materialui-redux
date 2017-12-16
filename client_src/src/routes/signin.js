import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

export class SignIn extends Component {
  static propTypes = {

  }

  handleFacebookClick = (event) => {
    const { history } = this.props;
    window.authenticateCallback = function(token) {
      console.log(token);
      let accessToken = token;
      history.replace('/');
      // $('#accessToken').val(accessToken);
    };
    window.open('/auth/facebook');
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button raised className={classes.button} onClick={this.handleFacebookClick}>facebook login
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SignIn);
