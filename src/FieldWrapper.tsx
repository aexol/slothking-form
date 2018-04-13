import * as React from "react";
const styles = require("./FieldWrapper.css");


class FieldWrapper extends React.Component<{
  errors: Array<any>;
}> {
  render() {
    const { children } = this.props;
    return <div className={styles.FieldWrapper}>{children}</div>;
  }
}
export default FieldWrapper;
