import * as React from 'react';
import TextField from './TextField';
import { NumberFieldInterface, FieldInterface } from './interface';
const NumberField: React.SFC<NumberFieldInterface & FieldInterface> = ({ ...props }) => (
  <TextField inputType="number" {...props} />
);
export default NumberField;
