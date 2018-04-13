import * as React from 'react';
export interface FileInterface {
  styles?: {
    InputFile: string;
    [x: string]: string;
  };
  onChange: (e: File) => void;
  [x: string]: any;
}
export const InputFile = ({ value, styles, onChange, ...props }) => (
  <div className="formgenFile" key={name}>
    <input
      type="file"
      onChange={(e) => {
        onChange(e.target.files[0]);
      }}
    />
    <a className="file_holder" href={value instanceof File ? '' : value}>
      {value instanceof File ? '' : value}
    </a>
  </div>
);
