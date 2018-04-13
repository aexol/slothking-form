import * as React from 'react';
import { FieldInterface, DatetimeFieldInterface } from './interface';
import { Datetime } from './components/Datetime';
class DatetimeField extends React.Component<FieldInterface & DatetimeFieldInterface> {
  render() {
    const { name, Component = Datetime, modifyField, ...props } = this.props;
    return (
      <Component
        {...props}
        name={name}
        key={name}
        onChange={(e) => {
          modifyField({
            name,
            value: e
          });
        }}
      />
    );
  }
}

export default DatetimeField;
