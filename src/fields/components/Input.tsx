import * as React from 'react';

let styles = require('./Input.css');
export type InputInterface = {
  styles?: {
    Input: string;
    [x: string]: string;
  };
  onChange: (e: string) => void;
  value: string;
  inputType?: string;
  [x: string]: any;
};
export const Input = ({
  onChange,
  styles: overrideStyles,
  inputType = 'text',
  value,
  ...props
}: InputInterface) => (
  <input
    className={overrideStyles ? overrideStyles.Input : styles.Input}
    type={inputType}
    value={value || ''}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    {...props}
  />
);
