import * as React from 'react';
import { FieldInterface, FileFieldInterface } from './interface';
import { InputFile } from './components/InputFile';
const FileField: React.SFC<FileFieldInterface & FieldInterface> = ({
  name,
  placeholder,
  Component = InputFile,
  modifyField,
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
export default FileField;
