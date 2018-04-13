import * as React from 'react';
import { MultiSelect } from './components/MultiSelect';
import { FieldInterface, SelectFieldInterface } from './interface';

const SelectField: React.SFC<SelectFieldInterface & FieldInterface> = ({
  name,
  placeholder,
  values,
  multi = false,
  Component = MultiSelect,
  modifyField,
  ...props
}) => (
  <Component
    {...props}
    key={name}
    multi={multi}
    name={placeholder || name}
    onChange={(e) => {
      modifyField({
        name,
        value: e
      });
    }}
    options={values}
    placeholder={placeholder || name}
  />
);
export default SelectField;
