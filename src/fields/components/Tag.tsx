import * as React from 'react';
import * as classnames from 'classnames';
let styles = require('./Tag.css');

export class Tag extends React.Component<any, any> {
  state = {
    inputValue: '',
    isOpen: false
  };
  constructor(props) {
    super(props);
  }

  documentClickHandler = () => {
    this.setState({
      isOpen: false
    });
  };

  preventEnter = (e, fieldValue?) => {
    if (e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
      this.setState({
        isOpen: true,
        inputValue: ''
      });
    }
  };

  componentWillMount() {
    document.addEventListener('click', this.documentClickHandler, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.documentClickHandler, true);
  }

  addValue = () => {
    let { value, onChange, unique = true } = this.props;
    const { inputValue } = this.state;
    let fieldValue = value || [];
    if (inputValue.length && (!fieldValue.find((f) => f.value === inputValue) || !unique)) {
      fieldValue = [...fieldValue, { label: inputValue, value: inputValue }];
      this.setState({
        inputValue: ''
      });
      onChange(fieldValue);
    }
  };

  render() {
    let { placeholder, value: fieldValue, onChange } = this.props;
    fieldValue = fieldValue || [];
    return (
      <div className={styles.Tag}>
        <div
          onClick={(e) => {
            this.setState({
              isOpen: !this.state.isOpen
            });
          }}
          className={classnames({
            [styles.holderSelect]: true
          })}
        >
          <div className={styles.holderValue}>
            {fieldValue.map(({ value, label }, index) => (
              <div
                className={styles.showValue}
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  const newValue = fieldValue.filter((i) => i.value !== value);
                  onChange(newValue);
                }}
              >
                <span className={styles.valueChosen}>{label}</span>
                <span className={styles.delete}>×</span>
              </div>
            ))}
            <input
              ref={(input) => input}
              type="text"
              onClick={this.addValue}
              onKeyPress={(e) => {
                this.preventEnter(e);
              }}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.stopPropagation();
                  e.preventDefault();
                  this.addValue();
                }
              }}
              onKeyUp={(e) => {
                this.preventEnter(e);
              }}
              placeholder={placeholder}
              value={this.state.inputValue}
              onChange={(e) => {
                this.setState({
                  inputValue: e.target.value
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

