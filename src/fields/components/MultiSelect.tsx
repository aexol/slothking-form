import * as React from 'react';
import * as classnames from 'classnames';

let styles = require('./MultiSelect.css');

export type SelectInterface = {
  name?: string;
  options: Array<any>;
  style?: Object;
  onChange: Function;
  placeholder?: string;
  value?: any;
  styles?: {
    MultiSelect: string;
    holderSelect: string;
    Change: string;
    holderValue: string;
    showValue: string;
    valueChoosen: string;
    Delete: string;
    placeholderValue: string;
    SelectArrow: string;
    holderValues: string;
    open: string;
    emptyValue: string;
    [x: string]: string;
  };
};
export type SingleSelectInterface = SelectInterface & {
  multi?: false;
  value?: any;
};
export type MultiSelectInterface = SelectInterface & {
  multi: true;
  value?: Array<any>;
};
export class MultiSelect extends React.Component<MultiSelectInterface | SingleSelectInterface> {
  state = {
    isOpen: false
  };
  componentWillMount() {
    document.addEventListener('click', this.documentClickHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler, true);
  }

  documentClickHandler = () => {
    this.setState({
      isOpen: false
    });
  };
  addValue = (value) => {
    let { value: fieldValue = [], onChange, multi = false } = this.props;
    let vals: any = value;
    if (multi && vals) {
      vals = Array.from(new Set([...fieldValue, vals]));
    }
    onChange(vals);
    this.setState({
      isOpen: true
    });
  };
  render() {
    let {
      placeholder,
      options,
      onChange,
      multi,
      styles: overrideStyles,
      value: fieldValue,
      style = {}
    } = this.props;
    if (options.length === 0) {
      fieldValue = null;
      console.warn('Options of Multiselect cannot be empty');
    }
    options = options.map((o) => ({ ...o, label: `${o.label}` }));
    options.sort((a, b) => a.label.localeCompare(b.label));
    options = [{ label: '-------------', value: null }, ...options];
    if (overrideStyles) {
      styles = overrideStyles;
    }
    if (!fieldValue) {
      fieldValue = null;
    }
    if (multi && Array.isArray(fieldValue) && fieldValue.length === 0) {
      fieldValue = null;
    }
    const selectObject = (
      <div className={styles.holderValue}>
        {console.log(fieldValue)}
        {fieldValue ? (
          multi ? (
            fieldValue.map((value, index) => (
              <div
                className={classnames({
                  [styles.showValue]: true,
                  [styles.emptyValue]: !value
                })}
                key={index}
              >
                <span className={styles.valueChoosen}>
                  {value && options.find((o) => o.value === value).label}
                </span>
                {multi && (
                  <span
                    className={styles.Delete}
                    onClick={(e) => {
                      e.stopPropagation();
                      const newValue = fieldValue.filter((i) => i !== value);
                      onChange(newValue);
                    }}
                  >
                    ×
                  </span>
                )}
              </div>
            ))
          ) : (
            <div
              className={classnames({
                [styles.showValue]: true,
                [styles.emptyValue]: true
              })}
            >
              <span className={styles.valueChoosen}>
                {options.find((o) => o.value === fieldValue).label}
              </span>
            </div>
          )
        ) : (
          <span className={styles.placeholderValue}>{placeholder}</span>
        )}
      </div>
    );
    return (
      <div className={styles.MultiSelect} style={style}>
        <div
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen
            });
          }}
          className={classnames({
            [styles.holderSelect]: true,
            [styles.Change]: this.state.isOpen
          })}
        >
          {selectObject}
          <span
            className={classnames({
              [styles.SelectArrow]: true,
              [styles.Change]: this.state.isOpen
            })}
          />
        </div>
        <ul
          className={classnames({
            [styles.holderValues]: true,
            [styles.open]: this.state.isOpen
          })}
        >
          {options.map(({ label, value }, index) => {
            return (
              <li
                onClick={() => {
                  this.addValue(value);
                }}
                key={index}
              >
                {label}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
