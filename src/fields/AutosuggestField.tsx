import * as React from 'react';
import { Autosuggest } from './components/Autosuggest';
import { AutosuggestFieldInterface, FieldInterface } from './interface';

const AutosuggestField: React.SFC<AutosuggestFieldInterface & FieldInterface> = ({
  name,
  Component = Autosuggest,
  modifyField,
  value,
  ...props
}) => (
  <Component
    {...props}
    initialValue={value}
    name={name}
    onSelect={(e) => {
      modifyField({
        name,
        value: e
      });
    }}
  />
);
export default AutosuggestField;
