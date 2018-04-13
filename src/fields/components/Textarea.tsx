import * as React from 'react';

let styles = require('./Textarea.css');

export type TextareaInterface = {
  styles: {
    Textarea: string;
    [x: string]: any;
  };
};
export const Textarea = ({ styles: overrideStyles, onChange, ...props }) => (
  <textarea
    className={overrideStyles ? overrideStyles.Textarea : styles.Textarea}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    {...props}
  />
);
