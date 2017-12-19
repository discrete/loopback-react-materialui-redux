import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage, addTranslation } from 'react-localize-redux';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';

import LocalLoginForm from '../components/LocalLoginForm';
import { requestLocalAuth } from '../redux/modules/auth';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

const messages = {
  "SignIn": {
    "facebook-signin": [
      "Facebook으로 Log In",
      "Log in with Facebook",
      "JP-Log in with Facebook",
      "ZH-Log in with Facebook",
      "FR-Log in with Facebook",
      "ES-Log in with Facebook"
    ],
    "singup": [
      "가입하기",
      "Sign Up",
      "JP-Sign Up",
      "ZH-Sign Up",
      "FR-Sign Up",
      "ES-Sign Up"
    ]
  }
};

export class SignIn extends Component {
  static propTypes = {

  }

  componentDidMount = () => {
    this.props.dispatch(addTranslation(messages));
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

  submit = values => {
    console.log(values);
    this.props.dispatch(requestLocalAuth(values));
  }

  render() {
    const { classes, translate, currentLanguage } = this.props;
    return (
      <div>
        <Button raised className={classes.button} onClick={this.handleFacebookClick}>{ translate('SignIn.facebook-signin')}
        </Button>
        <Button raised className={classes.button} onClick={() => this.props.history.push('/signup')}>{ translate('SignIn.singup')}
        </Button>
        <LocalLoginForm onSubmit={this.submit} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
});



export default compose(withStyles(styles), connect(mapStateToProps, null))(SignIn);
