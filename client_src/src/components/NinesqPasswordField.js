import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { InputAdornment } from 'material-ui/Input';

import NinesqInputField from './NinesqInputField';

export class NinesqPasswordField extends Component {
  static propTypes = {

  }
  state = {
    showPassword: false
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { input: { type }, ...props} = this.props;
    const { showPassword } = this.state;
    return (
      <div>
        <NinesqInputField
          type={showPassword? 'text': 'password'}
          {...this.props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={this.handleClickShowPasssword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
    </div>
    )
  }
}

export default NinesqPasswordField;
