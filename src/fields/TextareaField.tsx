import * as React from 'react';
import { TextareaFieldInterface, FieldInterface } from './interface';
import { Textarea } from './components/Textarea';

const TextareaField: React.SFC<TextareaFieldInterface & FieldInterface> = ({
  name,
  placeholder,
  modifyField,
  Component = Textarea,
  ...props
}) => (
  <Component
    {...props}
    onChange={(e) => {
      modifyField({
        name,
        value: e
      });
    }}
    placeholder={placeholder || name}
  />
);
export default TextareaField;
