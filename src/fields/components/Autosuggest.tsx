import * as React from 'react';
import * as classnames from 'classnames';
let styles = require('./Autosuggest.css');

export interface AutosuggestInterface {
  name: string;
  onSelect: Function;
  load: Function;
  list: Array<string>;
  placeholder?: string;
  initialValue?: string;
  styles?: {
    Autosuggest: string;
    datalistSuggest: string;
    showDatalist: string;
    optionSuggest: string;
  };
}
export class Autosuggest extends React.Component<AutosuggestInterface> {
  state = {
    showDatalist: false,
    setValue: '',
    value: ''
  };
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { initialValue = '' } = this.props;
    this.setState({
      setValue: initialValue
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value && this.state.value === '') {
      this.setState({
        setValue: nextProps.value
      });
    }
  }
  onChange = (e) => {
    const { load, onSelect } = this.props;
    const newValue = e.target.value;
    this.setState({ setValue: newValue, showDatalist: true });
    if (newValue.length > 0) {
      load(newValue);
      onSelect(newValue);
    }
  };
  render() {
    let {
      onSelect,
      list = [],
      name = 'autosuggest',
      placeholder,
      initialValue,
      load,
      styles: overrideStyles,
      ...props
    } = this.props;
    if (overrideStyles) {
      styles = overrideStyles;
    }
    return (
      <div>
        <div className={styles.Autosuggest}>
          <input
            {...props}
            onChange={this.onChange}
            value={this.state.setValue}
            type="text"
            list={name}
            placeholder={placeholder || name}
          />
          {list &&
            this.state.setValue && (
              <div
                className={classnames({
                  [styles.datalistSuggest]: true,
                  [styles.showDatalist]: this.state.showDatalist
                })}
              >
                {list.map((i, index) => (
                  <div
                    className={classnames({
                      [styles.optionSuggest]: true
                    })}
                    key={index}
                    onClick={() => {
                      this.setState({
                        setValue: i,
                        showDatalist: false
                      });
                      onSelect(i);
                    }}
                  >
                    {i}
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    );
  }
}
