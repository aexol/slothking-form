import * as moment from 'moment';

export type BaseFieldDefinition = {
  name: string;
  placeholder?: string;
  value?: any;
  Component?: React.ComponentType<any>;
  styles?: any;
};

export type FieldInterface = {
  modifyField: Function;
};

export type TextFieldInterface = BaseFieldDefinition & {
  inputType?: string;
  required?: boolean;
  pattern?: RegExp;
  value?: string;
};
export type TextFieldDefinition = TextFieldInterface & {
  type: 'string';
};

export type NumberFieldInterface = BaseFieldDefinition & {
  value?: number;
  required?: boolean;
  min?: number;
  max?: number;
};
export type NumberFieldDefinition = NumberFieldInterface & {
  type: 'integer' | 'float';
};

export type TextareaFieldInterface = BaseFieldDefinition & {
  value?: string;
};
export type TextareaFieldDefinition = TextareaFieldInterface & {
  type: 'text';
};

export type TagFieldInterface = BaseFieldDefinition & {
  value?: Array<string>;
};
export type TagFieldDefinition = TagFieldInterface & {
  type: 'array';
};

export type SelectFieldInterface = BaseFieldDefinition & {
  display?: {
    label?: string;
    value?: string;
  };
  values: Array<{
    label: string;
    value: any;
  }>;
  multi?: boolean;
};
export type SelectFieldDefinition = SelectFieldInterface & {
  type: 'select';
};

export type FileFieldInterface = BaseFieldDefinition & {
  value?: File;
};
export type FileFieldDefinition = FileFieldInterface & {
  type: 'file';
};

export type BooleanFieldInterface = BaseFieldDefinition & {
  value?: boolean;
};
export type BooleanFieldDefinition = BooleanFieldInterface & {
  type: 'boolean';
};

export type AutosuggestFieldInterface = BaseFieldDefinition & {
  load: Function;
  list: Array<any>;
};
export type AutosuggestFieldDefinition = AutosuggestFieldInterface & {
  type: 'autosuggest';
};

export type ObjectFieldInterface = BaseFieldDefinition & {
  value?: object;
};
export type ObjectFieldDefinition = ObjectFieldInterface & {
  type: 'object';
};

export type DatetimeFieldInterface = BaseFieldDefinition & {
  value?: moment.Moment;
};
export type DatetimeFieldDefinition = DatetimeFieldInterface & {
  type: 'datetime';
};
export type FieldDefinition =
  | TextFieldDefinition
  | NumberFieldDefinition
  | TextareaFieldDefinition
  | TagFieldDefinition
  | SelectFieldDefinition
  | FileFieldDefinition
  | BooleanFieldDefinition
  | AutosuggestFieldDefinition
  | ObjectFieldDefinition
  | DatetimeFieldDefinition;
