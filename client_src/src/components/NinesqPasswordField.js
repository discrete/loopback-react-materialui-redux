import React, { Component } from 'react'
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { InputAdornment } from 'material-ui/Input';

import NinesqInputField from './NinesqInputField';

let EventListenerMode = {capture: true};

export class NinesqPasswordField extends Component {
  static propTypes = {

  }
  state = {
    showPassword: false
  }

  preventGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'none';
  }

  restoreGlobalMouseEvents = () => {
    document.body.style['pointer-events'] = 'auto';
  }

  mousemoveListener = (e) => {
    console.log('mousemove');
    e.stopPropagation ();
    // do whatever is needed while the user is moving the cursor around
  }

  mouseupListener = (e) => {
    console.log('mouseup');
    this.restoreGlobalMouseEvents ();
    document.removeEventListener ('mouseup',   this.mouseupListener,   EventListenerMode);
    document.removeEventListener ('mousemove', this.mousemoveListener, EventListenerMode);
    e.stopPropagation ();
    this.setState({ showPassword: !this.state.showPassword });
  }

  captureMouseEvents = (e) => {
    console.log('capture mouse');
    this.preventGlobalMouseEvents ();
    document.addEventListener ('mouseup',   this.mouseupListener,   EventListenerMode);
    document.addEventListener ('mousemove', this.mousemoveListener, EventListenerMode);
    e.preventDefault ();
    e.stopPropagation ();
  }

  handleMouseDownPassword = event => {
    this.captureMouseEvents(event);
    event.preventDefault();
  };

  handleShowPasssword = (event) => {
    this.setState({ showPassword: !this.state.showPassword });
    this.captureMouseEvents(event);
  };

  handleHidePasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  render() {
    const { input: { value }, ...props} = this.props;
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
                onMouseDown={this.handleShowPasssword}
                disableRipple
                disabled={ value ? false: true}
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
