import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import compose from 'recompose/compose';
import { getTranslate, getActiveLanguage, addTranslation } from 'react-localize-redux';
import {
  Checkbox,
  RadioButtonGroup,
  SelectField,
  TextField,
  Toggle,
  DatePicker
} from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

const styles = theme => ({
  flash_on: {
    display: 'block',
  },
  flash_off: {
    display: 'none',
  },
  input: {
    display: 'none',
  },
});

const messages = {
  "LocalLoginForm": {
    "email_placeholder": [
      "이메일 주소",
      "Email Address",
      "JP-Email Address",
      "ZH-Email Address",
      "FR-Email Address",
      "ES-Email Address"
    ],
    "email_label": [
      "이메일",
      "Email",
      "JP-Email",
      "ZH-Email",
      "FR-Email",
      "ES-Email"
    ],
    "password_label": [
      "패스워드",
      "Password",
      "JP-Password",
      "ZH-Password",
      "FR-Password",
      "ES-Password"
    ],
    "password_placeholder": [
      "Password",
      "Password",
      "JP-Password",
      "ZH-Password",
      "FR-Password",
      "ES-Password"
    ],
    "submit_label": [
      "로그인",
      "Log in",
      "JP-Log in",
      "ZH-Log in",
      "FR-Log in",
      "ES-Log in"
    ]
  }
};

export class LocalLoginForm extends Component {
  static propTypes = {
    prop: PropTypes
  }
  state = {
    showPassword: true
  }

  componentDidMount = () => {
    this.props.dispatch(addTranslation(messages));
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, translate, auth, classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div><Field name="email" component={TextField} placeholder={translate('LocalLoginForm.email_placeholder')}/></div>
        <div><Field name="password" component={TextField} placeholder={translate('LocalLoginForm.password_placeholder')} /></div>
        <div>{`error: ${auth.error}`}</div>
        <div><button type="submit">{translate('LocalLoginForm.submit_label')}</button></div>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth.auth,
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
})

const mapDispatchToProps = {

}

export default compose(reduxForm({form: 'localLogin'}), connect(mapStateToProps, mapDispatchToProps))(LocalLoginForm);
