import React from "react";
import Input,  { InputLabel } from "material-ui/Input";
import { FormControl } from 'material-ui/Form';

const NinesqInputField = props => <FormControl fullWidth={props.fullWidth}>
  <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
    <Input
      {...props}
      value={props.input.value}
      onChange={props.input.onChange}
    />
</FormControl>

NinesqInputField.propTypes = {
  // classes: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  // label: PropTypes.string.isRequired,
}

export default NinesqInputField
