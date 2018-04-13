import { Date, DateInterface } from './Date';
import { Time, TimeInterface } from './Time';
import * as moment from 'moment';
import * as React from 'react';
let styles = require('./Datetime.css');
export type DatetimeInterface = {
  value: moment.Moment;
  onChange: (e: moment.Moment) => void;
  styles?: {
    Datetime: string;
  };
};
export class Datetime extends React.Component<DateInterface & TimeInterface & DatetimeInterface> {
  render() {
    const {
      styles: overrideStyles,
      value = moment().second(0),
      onChange,
      name,
      minYear,
      maxYear
    } = this.props;
    styles = overrideStyles || styles;
    return (
      <div className={styles.Datetime}>
        <Date
          name={name}
          styles={styles}
          value={value}
          minYear={minYear}
          maxYear={maxYear}
          onChange={(e) => {
            onChange(e);
          }}
        />
        <Time
          name={name}
          styles={styles}
          value={value.format('k:m')}
          onChange={(e) => {
            const [hour, minutes] = e.split(':');
            onChange(value.hour(parseInt(hour)).minute(parseInt(minutes)));
          }}
        />
      </div>
    );
  }
}
