import * as React from 'react';
import {Tag} from './components/Tag';
import { TagFieldInterface, FieldInterface } from './interface';

const TagField: React.SFC<TagFieldInterface & FieldInterface> = ({
  name,
  placeholder,
  modifyField,
  Component = Tag,
  ...props
}) => (
  <Component
    {...props}
    key={name}
    multi={true}
    name={placeholder || name}
    onChange={(e) => {
      modifyField({
        name,
        value: e
      });
    }}
    placeholder={placeholder || name}
  />
);
export default TagField;
