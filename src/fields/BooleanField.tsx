import * as React from 'react';
import { BooleanFieldInterface, FieldInterface } from './interface';
import { Checkbox } from './components/Checkbox';

class BooleanField extends React.Component<BooleanFieldInterface & FieldInterface> {
  render() {
    const { name, modifyField, value: checked, Component = Checkbox } = this.props;
    return (
      <Component
        onClick={() => {
          modifyField({
            name,
            value: !checked
          });
        }}
        name={name}
        checked={checked}
      />
    );
  }
}
export default BooleanField;
