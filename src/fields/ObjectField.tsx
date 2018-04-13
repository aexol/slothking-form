import * as React from 'react';
import * as classnames from 'classnames';
import { JsonEditor } from 'react-json-edit';
import { ObjectFieldInterface, FieldInterface } from './interface';
const TextareaField: React.SFC<ObjectFieldInterface & FieldInterface> = ({
  name,
  placeholder,
  modifyField,
  Component = JsonEditor,
  ...props
}) => (
  <div
    className={classnames({
      formgenInput: true
    })}
    key={name}
  >
    <Component
      propagateChanges={(e) => {
        modifyField({
          name,
          value: e
        });
      }}
    />
  </div>
);
export default TextareaField;
