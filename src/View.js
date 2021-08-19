import React from "react";
import { defaultStyle } from "./Utility";

class View extends React.Component {
  render() {
    const {
      style,
      children = void 0,
      onMouseDown,
      onMouseUp,
      onPointerDown,
      onPointerUp,
      ...restProps
    } = this.props;
    return (
      <div style={{ ...defaultStyle, ...style }} {...restProps}>
        {children}
      </div>
    );
  }
}

export default View;
