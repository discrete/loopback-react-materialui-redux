import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { Field } from 'redux-form';
import { FormControl, FormHelperText } from 'material-ui/Form';
import MailOutline from 'material-ui-icons/MailOutline';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';



class emailInputAdapter extends PureComponent {
  state = {
    value: ''
  }

  handleInputChange = (event) => {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }

  render() {
    const { input: { onChange, onFocus, onBlur }, label, ...props} = this.props;

    console.log(this.props);
    console.log(props);

    return (
      <div>
        <InputLabel htmlFor="inputfield">{label}</InputLabel>
        <Input
          id="inputfield"
          type="email"
          onChange={event => {onChange(event.target.value)}}
          onClick={event => {onFocus(event.target.value)}}
          onBlur={event => {onBlur(event.target.value)}}
          {...props}
        />
      </div>
    )
  }
}

// const emailInputAdapter = ({
//   input,
//   label,
//   meta: { touched, error, warning }
// }) => {
//   return (
//   <div>
//     <InputLabel htmlFor="inputfield">{label}</InputLabel>
//     <Input
//       id="inputfield"
//       type="email"
//       name={input.name}
//       endAdornment={
//         <InputAdornment position="end">
//           <MailOutline />
//         </InputAdornment>
//       }
//     />
//   </div>
//   );
// }

const NinesqEmailField = (props) => {
  const { input, meta, label, fullWidth } = props;

  console.log(props);

  return (
    <FormControl fullWidth={fullWidth}>
      <Field
        name={input.name}
        {...props}
        component={emailInputAdapter}
        endAdornment={
          <InputAdornment position="end">
            <MailOutline />
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

NinesqEmailField.propTypes = {
  // classes: PropTypes.object.isRequired,
  // name: PropTypes.string.isRequired,
  // label: PropTypes.string.isRequired,
}

export default NinesqEmailField
