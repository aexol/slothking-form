import * as React from 'react';
import * as classnames from 'classnames';
let styles = require('./Checkbox.css');
export interface CheckboxInterface {
  checked: boolean;
  name: string;
  onClick: Function;
  styles?: {
    Checkbox: string;
    border: string;
    tick: string;
    checked: string;
  };
}

export class Checkbox extends React.Component<CheckboxInterface> {
  render() {
    const { name, checked, onClick, styles: overrideStyles } = this.props;
    if (overrideStyles) {
      styles = overrideStyles;
    }
    return (
      <div
        className={styles.Checkbox}
        onClick={() => {
          onClick();
        }}
      >
        <label>{name}</label>
        <div className={styles.border}>
          <div
            className={classnames({
              [styles.tick]: true,
              [styles.checked]: checked
            })}
          />
        </div>
      </div>
    );
  }
}
