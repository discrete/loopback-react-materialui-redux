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
    showPassword: ''
  }

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    // const { input, ...props} = this.props;
    return (
      <div>
        <NinesqInputField
          // name={input.name}
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

export default NinesqPasswordField
