import * as React from 'react';
import {
  AutosuggestField,
  DatetimeField,
  FileField,
  SelectField,
  TagField,
  TextareaField,
  ObjectField,
  TextField,
  NumberField,
  BooleanField
} from './fields';

import { FieldDefinition } from './fields/interface';

import FieldWrapper from './FieldWrapper';
import SubmitComponent from './SubmitComponent';

const fieldElements = {
  autosuggest: AutosuggestField,
  string: TextField,
  boolean: BooleanField,
  integer: NumberField,
  float: NumberField,
  text: TextareaField,
  select: SelectField,
  file: FileField,
  datetime: DatetimeField,
  object: ObjectField,
  reference: SelectField,
  array: TagField
};

export interface FormGeneratorInterface {
  fields: Array<FieldDefinition>;
  validate: Function;
  style?: Object;
  className?: string;
  values?: Array<any>;
  isFormData?: boolean;
  AlternativeWrapper?: React.ComponentType<any>;
  Submit?: React.ComponentType<any>;
  submitText?: string;
}

export class Form extends React.Component<FormGeneratorInterface> {
  state = {
    errors: {},
    fields: {},
    changed: {}
  };
  receiveFields = (values) => {
    const { fields } = this.props;
    let updateDict = {};
    let changesDict = { ...this.state.changed };
    for (var { name } of fields) {
      updateDict[name] = values[name];
      changesDict[name] = false;
    }
    this.setState({ fields: updateDict, changed: changesDict });
  };
  componentWillMount() {
    const { values } = this.props;
    if (values) {
      this.receiveFields(values);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { values } = this.props;
    if (nextProps.values && nextProps.values !== values) {
      this.receiveFields(nextProps.values);
    }
  }
  validate = (e) => {
    e.preventDefault();
    const { fields, isFormData = false } = this.props;
    var sfields = {
      ...this.state.fields
    };
    const filteredValidate = Object.keys(sfields).filter((k) => !!this.state.changed[k]);
    let returnData = filteredValidate.reduce((accumulator, currentValue, currentIndex, array) => {
      accumulator[currentValue] = sfields[currentValue];
      return accumulator;
    }, {});
    for (var f of fields) {
      if (returnData[f.name]) {
        returnData[f.name] = returnData[f.name];
      }
    }
    if (isFormData) {
      let fd = new FormData();
      for (var key of Object.keys(returnData)) {
        let value = returnData[key];
        fd.append(
          key,
          Array.isArray(value) || typeof value === 'object' ? JSON.stringify(value) : value
        );
      }
    }
    this.props.validate(returnData);
  };
  modifyField = ({ name, value }) => {
    this.setState({
      fields: {
        ...this.state.fields,
        [name]: value
      },
      changed: {
        ...this.state.changed,
        [name]: true
      }
    });
  };
  render() {
    const {
      fields,
      submitText,
      AlternativeWrapper = FieldWrapper,
      style = {},
      className = 'FormGen'
    } = this.props;
    const { Submit = SubmitComponent } = this.props;
    const fieldsRender = fields.map(({ type, ...Field }, i) => {
      const RenderField = fieldElements[type];
      return (
        <AlternativeWrapper {...Field} key={i}>
          <RenderField
            modifyField={this.modifyField}
            value={this.state.fields[Field.name]}
            {...Field}
          />
        </AlternativeWrapper>
      );
    });
    return (
      <form onSubmit={this.validate} className={className} style={style}>
        {fieldsRender}
        <Submit submitText={submitText} />
      </form>
    );
  }
}

