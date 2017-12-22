import React from "react";
import Input from "material-ui/Input";
import { Field } from 'redux-form';
import { FormControl, FormHelperText } from 'material-ui/Form';

const InputAdapter = props => <Input
  {...props}
  value={props.input.value}
  onChange={props.input.onChange}
/>;

const NinesqInputField = (props) => {
  const { input, meta, label, fullWidth } = props;

  console.log(props);

  return (
    <FormControl fullWidth={fullWidth}>
      <Field
        name={input.name}
        {...props}
        component={InputAdapter}
      />
    </FormControl>
  );
}

NinesqInputField.propTypes = {
  // classes: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  // label: PropTypes.string.isRequired,
}

export default NinesqInputField
