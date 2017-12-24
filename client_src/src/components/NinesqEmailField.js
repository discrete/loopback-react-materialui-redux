import React from 'react';
import IconButton from 'material-ui/IconButton';
import MailOutline from 'material-ui-icons/MailOutline';
import { InputAdornment } from 'material-ui/Input';

import NinesqInputField from './NinesqInputField';

const NinesqEmailField = (props) => {
  return (
    <div>
      <NinesqInputField
          type="email"
          {...props}
          endAdornment={
            <InputAdornment position="end">
              <IconButton disabled disableRipple>
                <MailOutline />
              </IconButton>
            </InputAdornment>
          }
        />
    </div>
  )
}

export default NinesqEmailField;
