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
import { withStyles } from 'material-ui/styles'
import { FormControl, FormHelperText } from 'material-ui/Form';
import MailOutline from 'material-ui-icons/MailOutline';

import NinesqTextField from './NinesqTextField';
import NinesqEmailField from './NinesqEmailField';
import NinesqPasswordField from './NinesqPasswordField';

const styles = theme => ({
  flash_on: {
    display: 'block',
  },
  flash_off: {
    display: 'none',
  },
  fieldOutline: {
    fontWeight: 300,
    borderRadius: 2,
    border: '1px solid red',
    boxSizing: 'border-box',
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
      "패스워드",
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
    classes: PropTypes.object.isRequired,
  }
  state = {
    showPassword: true
  }

  constructor(props) {
    super(props);

    this.props.dispatch(addTranslation(messages));
  }

  // componentWillMount = () => {
  //   this.props.dispatch(addTranslation(messages));
  // }

  render() {
    const { handleSubmit, pristine, reset, submitting, translate, auth, classes } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div className={classes.fieldOutline}>
          <Field
            name="email"
            type="email"
            label={translate('LocalLoginForm.email_placeholder')}
            fullWidth
            component={TextField}
            placeholder={translate('LocalLoginForm.email_placeholder')}
          />
        </div>
        <div className={classes.fieldOutline}>
          <Field
            name="password"
            type="password"
            fullWidth
            component={TextField}
            placeholder={translate('LocalLoginForm.password_placeholder')}
            label={translate('LocalLoginForm.password_placeholder')}
          />
        </div>
        <div>
          <Field name="myField"
            component={NinesqEmailField}
            label={translate('LocalLoginForm.email_placeholder')}
          />
        </div>
        <div>
          <Field name="myField"
            component={NinesqPasswordField}
            label={translate('LocalLoginForm.password_placeholder')}
          />
        </div>
        <div className={auth.error ? classes.flash_on: classes.flash_off}>{`error: ${auth.error}`}</div>

        <div><button type="submit">{translate('LocalLoginForm.submit_label')}</button></div>
      </form>
    )
  }
}

const mapStateToProps = (state, props) => ({
  auth: state.auth.auth,
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
});

const mapDispatchToProps = {

}

export default compose(reduxForm({form: 'localLogin'}), connect(mapStateToProps, mapDispatchToProps), withStyles(styles))(LocalLoginForm);
