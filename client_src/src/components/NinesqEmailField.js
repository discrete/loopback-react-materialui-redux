import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form';
import IconButton from 'material-ui/IconButton';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MailOutline from 'material-ui-icons/MailOutline';
import { InputAdornment } from 'material-ui/Input';

import NinesqInputField from './NinesqInputField';

export class NinesqEmailField extends Component {
  static propTypes = {

  }
  state = {
  }

  render() {
    const { input: { type }, ...props} = this.props;
    const { showPassword } = this.state;
    return (
      <div>
        <NinesqInputField
          type="email"
          {...this.props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <MailOutline />
              </IconButton>
            </InputAdornment>
          }
        />
    </div>
    )
  }
}

export default NinesqEmailField;
