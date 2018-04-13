import * as React from 'react';
import { TextFieldInterface, FieldInterface } from './interface';
import { Input } from './components/Input';

class TextField extends React.Component<TextFieldInterface & FieldInterface> {
  render() {
    const { name, placeholder, modifyField, pattern, Component = Input, ...props } = this.props;
    return (
      <Component
        {...props}
        pattern={pattern ? pattern.toString().replace(/\//g, '') : undefined}
        onChange={(e) => {
          modifyField({
            name,
            value: e
          });
        }}
        placeholder={placeholder || name}
        name={name}
      />
    );
  }
}
export default TextField;
