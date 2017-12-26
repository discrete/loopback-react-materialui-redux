import React from 'react'
import PropTypes from 'prop-types'
import Input from "material-ui/Input";

const NinesqTextField = props => <Input
{...props}
value={props.input.value}
onChange={props.input.onChange} />;

export default NinesqTextField;
